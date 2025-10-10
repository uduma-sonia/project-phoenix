<script lang="ts">
	import { Trash, LockKeyhole, AlarmClock, Utensils, LockKeyholeOpen, Eye } from '@lucide/svelte';
	import BackComponent from '../Common/BackComponent.svelte';
	import {
		openDeleteModal,
		openImageCarouselModal,
		updateSelectedImage
	} from '$lib/state/modal.svelte';
	import { handleSelectRecipe } from '$lib/state/recipe.svelte';
	import Helpers from '$lib/utils/helpers';
	import {
		PAGE_REDIRECTED_FROM_KEY,
		PINTEREST_BASE_URL,
		RECIPE_COUNT_TRACKER
	} from '$lib/constants/global';
	import Stats from '../Common/Stats.svelte';
	import Stat from './Utilities/Stat.svelte';
	import { type RecipeResponse } from '../../../types/recipe';
	import type { User } from '../../../types/user';
	import DetailActions from './Utilities/DetailActions.svelte';
	import SectionCard from './Utilities/SectionCard.svelte';
	import LockedRecipe from './Utilities/LockedRecipe.svelte';
	import AuthorItem from './Utilities/AuthorItem.svelte';
	import { addToast } from '$lib/store/toast';

	import { recipeRequest } from '$lib/requests';
	import { useQueryClient } from '@tanstack/svelte-query';
	import { queryKeys } from '$lib/utils/queryKeys';
	import { goto } from '$app/navigation';
	import Tooltip from '../Common/Tooltip.svelte';

	const queryClient = useQueryClient();

	let {
		user,
		isLoggedIn,
		recipe,
		detailsQuery,
		savesList,
		saveTotal
	}: {
		user: User;
		isLoggedIn: boolean;
		recipe: RecipeResponse;
		detailsQuery: any;
		savesList: string[];
		saveTotal: number;
	} = $props();

	let isOwner = $derived(user?._id ? (user?._id === recipe?.ownerId ? true : false) : false);
	let trackerLogged = $derived(
		typeof window !== 'undefined' ? sessionStorage.getItem(RECIPE_COUNT_TRACKER) : ''
	);
	let isSaving = $state(false);

	function hasSavedRecipe() {
		if (savesList?.length && user?._id) {
			if (savesList.includes(user?._id)) {
				return true;
			} else {
				return false;
			}
		}
	}

	function copyLink() {
		Helpers.copyToClipboard(window?.location?.href, 'Link copied');
	}

	async function saveRecipe() {
		if (!isLoggedIn) {
			const _link = `${window.location.pathname}${window.location.search}`;
			sessionStorage.setItem(PAGE_REDIRECTED_FROM_KEY, _link);
			goto(`/signup`);
			return false;
		}
		try {
			isSaving = true;

			if (hasSavedRecipe()) {
				await recipeRequest.unsaveRecipe(recipe._id);
				addToast('Recipe unsaved', 'success');
			} else {
				await recipeRequest.saveRecipe(recipe._id);
				addToast('Recipe saved', 'success');
			}
			queryClient.invalidateQueries({ queryKey: queryKeys.getRecipeSaveList(recipe._id) });
		} catch (error: any) {
			addToast(error?.message || 'An error occured', 'error');
		} finally {
			isSaving = false;
		}
	}

	function viewImages() {
		if (recipe.images?.length) {
			updateSelectedImage(recipe.images);
			openImageCarouselModal();
		} else {
			addToast('No image to display', 'error');
		}
	}

	function shareToPinterest() {
		const baseUrl = PINTEREST_BASE_URL;
		const url = encodeURIComponent(window?.location?.href);
		const media = recipe?.images?.length ? encodeURIComponent(recipe?.images[0]) : '';
		const description = encodeURIComponent(recipe?.name || '');
		const pinterestUrl = `${baseUrl}?${Helpers.formatQueryParams({ url, media, description })}`;
		window.open(pinterestUrl, '_blank', 'noopener,noreferrer');
	}
</script>

{#snippet detailItem(label: string, value?: string, Icon?: any)}
	{#if value}
		<div class="flex min-w-max items-center gap-1">
			<p class="font-lexend-deca flex items-center gap-1 text-sm">
				<Icon size="18px" />
				{label}:
			</p>
			<p class="font-lexend-deca text-sm font-light">{value}</p>
		</div>
	{/if}
{/snippet}

{#if !$detailsQuery?.isLoading && recipe}
	{#if recipe?.isPrivate && !isOwner}
		<LockedRecipe {recipe} />
	{:else}
		{#if !isOwner && !trackerLogged}
			<Stats ref={recipe?._id} section="Recipe" />
		{/if}

		<div class="mx-auto mt-4 max-w-[600px] px-3 pb-24">
			{#if isLoggedIn}
				<div class="flex items-center gap-3">
					<BackComponent backLink="/recipe" title={recipe?.name} />

					<div class="mb-1.5">
						{#if isOwner}
							{#if recipe.isPrivate}
								<Tooltip text="Private recipe" position="top">
									<LockKeyhole size="16px" />
								</Tooltip>
							{:else}
								<Tooltip text="Private recipe" position="top">
									<LockKeyholeOpen size="16px" />
								</Tooltip>
							{/if}
						{/if}
					</div>
				</div>
			{/if}

			<div class="mt-6">
				<div class="image_wrapper h-[230px]">
					<button
						class="relative z-10 h-full w-full cursor-pointer gap-3 overflow-hidden rounded-lg border-2 border-black bg-white"
						onclick={viewImages}
					>
						{#if recipe?.images}
							<img
								src={recipe?.images[0]}
								alt=""
								class="max-h-full w-full max-w-full object-cover"
							/>
						{/if}

						<div class="absolute top-3 right-3 z-20">
							<Eye color="white" />
						</div>
					</button>
				</div>

				<DetailActions
					{hasSavedRecipe}
					{isSaving}
					{shareToPinterest}
					{copyLink}
					{isOwner}
					{saveRecipe}
				/>

				<p class="mt-4 text-xl font-medium">
					{recipe.name}
				</p>

				<div class="flex gap-3">
					{#if recipe?.groups?.length}
						{#each recipe?.groups as group, index (index)}
							<p class="font-lexend text-13 font-extralight">
								#{group.name}
							</p>
						{/each}
					{/if}
				</div>

				<AuthorItem {recipe} />

				<div class="mt-4 flex flex-wrap gap-4">
					{@render detailItem('Prep time', recipe?.prepTime, AlarmClock)}
					{@render detailItem('Cook time', recipe?.cookTime, AlarmClock)}
					{@render detailItem('Total time', recipe?.totalTime, AlarmClock)}
					{@render detailItem('Servings', recipe?.servings, Utensils)}
					{@render detailItem('Difficulty', recipe?.difficulty)}
					{@render detailItem('Calories', recipe?.calories)}
				</div>

				<SectionCard {recipe} />
			</div>

			<div class="mt-16 flex items-center justify-between">
				<Stat ref={recipe?._id} {saveTotal} />

				{#if isOwner}
					<div>
						<button
							class="shadow_button shadow_button_sm shadow_button_thin text-red-600"
							onclick={() => {
								handleSelectRecipe(recipe);
								openDeleteModal();
							}}
						>
							<Trash size="20px" />
						</button>
					</div>
				{/if}
			</div>
		</div>
	{/if}
{/if}

<style>
	.image_wrapper {
		position: relative;
		border-radius: 8px;
		transition: all 0.4s linear;
	}

	.image_wrapper::before {
		content: '';
		position: absolute;
		top: 2px;
		left: 2px;
		right: 0;
		bottom: 0;
		background-color: black;
		border: 2px solid black;
		z-index: 1;
		border-radius: 8px;
		width: 100%;
		height: 100%;
	}
</style>
