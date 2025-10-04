<script lang="ts">
	import { Trash, LockKeyhole, AlarmClock, Utensils, LockKeyholeOpen } from '@lucide/svelte';
	import BackComponent from '../Common/BackComponent.svelte';
	import { openDeleteModal } from '$lib/state/modal.svelte';
	import { handleSelectRecipe } from '$lib/state/recipe.svelte';
	import Helpers from '$lib/utils/helpers';
	import { PINTEREST_BASE_URL, RECIPE_COUNT_TRACKER } from '$lib/constants/global';
	import Stats from '../Common/Stats.svelte';
	import ViewCount from './ViewCount.svelte';
	import { type RecipeResponse } from '../../../types/recipe';
	import type { User } from '../../../types/user';
	import DetailActions from './Utilities/DetailActions.svelte';
	import SectionCard from './Utilities/SectionCard.svelte';
	import LockedRecipe from './Utilities/LockedRecipe.svelte';
	import AuthorItem from './Utilities/AuthorItem.svelte';

	let {
		user,
		isLoggedIn,
		recipe,
		detailsQuery
	}: { user: User; isLoggedIn: boolean; recipe: RecipeResponse; detailsQuery: any } = $props();

	let isOwner = $derived(user?._id ? (user?._id === recipe?.ownerId ? true : false) : false);
	let trackerLogged = $derived(
		typeof window !== 'undefined' ? sessionStorage.getItem(RECIPE_COUNT_TRACKER) : ''
	);

	function copyLink() {
		Helpers.copyToClipboard(window?.location?.href, 'Link copied');
	}

	function saveRecipe() {}

	function shareToPinterest() {
		const baseUrl = PINTEREST_BASE_URL;
		const url = encodeURIComponent(window?.location?.href);
		const media = recipe?.images?.length ? encodeURIComponent(recipe?.images[0]) : '';
		const description = encodeURIComponent(recipe?.name || '');
		const pinterestUrl = `${baseUrl}?${Helpers.formatQueryParams({ url, media, description })}`;
		window.open(pinterestUrl, '_blank', 'noopener,noreferrer');
	}

	let backLink = $derived(
		isLoggedIn
			? isOwner
				? `/recipe`
				: `/recipe/user/${recipe?.ownerId}`
			: `/recipe/user/${recipe?.ownerId}`
	);
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

		<div class="mx-auto mt-4 max-w-[500px] px-3 pb-24">
			<div class="flex items-center gap-3">
				<BackComponent {backLink} title={recipe?.name} />

				<div class="mb-1.5">
					{#if recipe.isPrivate}
						<LockKeyhole size="16px" />
					{:else}
						<LockKeyholeOpen size="16px" />
					{/if}
				</div>
			</div>

			<div class="mt-6">
				<div class="image_wrapper h-[200px]">
					<div
						class="relative z-10 h-full w-full cursor-pointer gap-3 overflow-hidden rounded-lg border-2 border-black bg-white"
					>
						<!-- {#if recipe?.imageUrl}
							<img
								src={recipe?.imageUrl}
								alt=""
								class="max-h-full w-full max-w-full object-cover"
							/>
						{/if} -->
					</div>
				</div>

				<DetailActions {shareToPinterest} {copyLink} {isOwner} {saveRecipe} />
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

			{#if isOwner}
				<div class="mt-16 flex items-center justify-between">
					<ViewCount ref={recipe?._id} />

					<div>
						<button
							class="shadow_button shadow_button_sm text-red-600"
							style="height: 40px"
							onclick={() => {
								handleSelectRecipe(recipe);
								openDeleteModal();
							}}
						>
							<Trash size="20px" />
						</button>
					</div>
				</div>
			{/if}
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
