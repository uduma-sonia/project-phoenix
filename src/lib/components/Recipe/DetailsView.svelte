<script lang="ts">
	import { Trash, LockKeyhole, LockKeyholeOpen, Eye, ShoppingCart } from '@lucide/svelte';
	import BackComponent from '../Common/BackComponent.svelte';
	import {
		openAddToListModal,
		openDeleteModal,
		openImageCarouselModal,
		updateSelectedImage
	} from '$lib/state/modal.svelte';
	import { handleSelectRecipe, selectedRecipeList } from '$lib/state/recipe.svelte';
	import { PAGE_REDIRECTED_FROM_KEY, RECIPE_COUNT_TRACKER } from '$lib/constants/global';
	import Stats from '../Common/Stats.svelte';
	import Stat from './Utilities/Stat.svelte';
	import { type RecipeResponse } from '../../../types/recipe';
	import type { User } from '../../../types/user';
	import DetailActions from './Utilities/DetailActions.svelte';
	import SectionCard from './Utilities/SectionCard.svelte';
	import LockedRecipe from './Utilities/LockedRecipe.svelte';
	import AuthorItem from './Utilities/AuthorItem.svelte';
	import { addToast } from '$lib/store/toast';
	import { RecipeRequest } from '$lib/requests';
	import { useQueryClient } from '@tanstack/svelte-query';
	import { queryKeys } from '$lib/utils/queryKeys';
	import { goto } from '$app/navigation';
	import Tooltip from '../Common/Tooltip.svelte';
	import RecipeName from './Utilities/RecipeName.svelte';
	import Nutrition from './Utilities/Nutrition.svelte';
	import Overview from './Utilities/Overview.svelte';
	import Ingredients from './Utilities/Ingredients.svelte';
	import Directions from './Utilities/Directions.svelte';
	import PrepNote from './Utilities/PrepNote.svelte';

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
	let viewedMultiplier = $state(1);

	function hasSavedRecipe() {
		if (savesList?.length && user?._id) {
			if (savesList.includes(user?._id)) {
				return true;
			} else {
				return false;
			}
		}
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
				await RecipeRequest.unsaveRecipe(recipe._id);
				addToast('Recipe unsaved', 'success');
			} else {
				console.log(recipe?._id);
				await RecipeRequest.saveRecipe(recipe?._id);
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

	function changeMultiplier(params: number) {
		viewedMultiplier = params;
	}
</script>

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

					<div>
						{#if isOwner}
							{#if recipe.isPrivate}
								<Tooltip text="Private recipe" position="bottom">
									<LockKeyhole size="16px" />
								</Tooltip>
							{:else}
								<Tooltip text="Private recipe" position="bottom">
									<LockKeyholeOpen size="16px" />
								</Tooltip>
							{/if}
						{/if}
					</div>
				</div>
			{/if}

			<div class="mt-4">
				<AuthorItem {recipe} />

				<div class="image_wrapper mt-4 h-[230px]">
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

				<DetailActions {hasSavedRecipe} {isSaving} {isOwner} {saveRecipe} {recipe} />
				<RecipeName {recipe} />
				<Overview {recipe} />
				<PrepNote {recipe} />
				{#if recipe.nutrition}
					<Nutrition nutrition={recipe.nutrition} />
				{/if}

				{#if recipe.withConverter}
					<div class="mt-6 flex justify-end gap-1">
						{#each [...new Array(4)] as _, index}
							<button
								class="font-lexend hover:bg-brand-rose inline-block rounded-md border bg-transparent px-3 py-1 text-[11px] font-light text-black"
								class:viewedMultiplier={viewedMultiplier === index + 1}
								onclick={() => changeMultiplier(index + 1)}
							>
								{index + 1}x
							</button>
						{/each}
					</div>
				{/if}
				<Ingredients {recipe} {viewedMultiplier} />
				<Directions {recipe} />
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

{#if selectedRecipeList?.data && selectedRecipeList?.data?.length > 0}
	<div class="slide_in_up fixed bottom-20 left-1/2 -translate-x-1/2 md:bottom-5">
		<Tooltip position="top" text="Add to shopping list">
			<button class="create_button_sm shadow_button" onclick={openAddToListModal}>
				<ShoppingCart />
			</button>
		</Tooltip>
	</div>
{/if}

<style>
	.viewedMultiplier {
		background-color: #dcbec5;
	}
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
