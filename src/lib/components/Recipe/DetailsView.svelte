<script lang="ts">
	import { Link, Trash, SquarePen, LockKeyhole } from '@lucide/svelte';
	import BackComponent from '../Common/BackComponent.svelte';
	import IngredientItem from './Utilities/IngredientItem.svelte';
	import InstructionItem from './Utilities/InstructionItem.svelte';
	import { createQuery } from '@tanstack/svelte-query';
	import { queryKeys } from '$lib/utils/queryKeys';
	import { recipeRequest } from '$lib/requests';
	import { page } from '$app/state';
	import Seo from '../Common/SEO.svelte';
	import { openDeleteModal } from '$lib/state/modal.svelte';
	import { handleSelectRecipe } from '$lib/state/recipe.svelte';
	import Helpers from '$lib/utils/helpers';
	import BasicButton from '../Common/BasicButton.svelte';

	let { user, isLoggedIn } = $props();

	const detailsQuery = createQuery({
		queryKey: queryKeys.getSingleRecipe(page.params.id),
		queryFn: () => recipeRequest.getSingleRecipe(page.params.id)
	});

	const recipe = $derived($detailsQuery?.data?.data?.recipe);
	let isOwner = $derived(user?._id ? (user?._id === recipe?.ownerId ? true : false) : false);

	function copyLink() {
		Helpers.copyToClipboard(window?.location?.href, 'Link copied');
	}

	function shareToPinterest() {
		const baseUrl = 'https://www.pinterest.com/pin/create/button';
		const url = encodeURIComponent(window?.location?.href);
		const media = encodeURIComponent(recipe?.imageUrl || '');
		const description = encodeURIComponent(recipe?.name || '');
		const pinterestUrl = `${baseUrl}?url=${url}&media=${media}&description=${description}`;
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

<Seo title={recipe?.name || 'Recipe'} />

{#if !$detailsQuery?.isLoading && recipe}
	{#if recipe?.isPrivate && !isOwner}
		<div class="pt-20">
			<div
				class="mx-auto flex h-[300px] max-w-[300px] flex-col items-center justify-center rounded-2xl border-2 border-black p-4 text-center"
			>
				<LockKeyhole size="30px" />
				<p class="font-lexend my-12 text-sm font-light">
					Sorry, this recipe has been locked by the owner
				</p>

				<a href={`/recipe/user/${recipe?.ownerId}`}>
					<BasicButton label="View other recipes" />
				</a>
			</div>
		</div>
	{:else}
		<div class="mx-auto mt-4 max-w-[500px] px-3 pb-24">
			<BackComponent {backLink} title={recipe?.name} />

			<div class="mt-6">
				<div class="image_wrapper h-[200px]">
					<div
						class="relative z-10 h-full w-full cursor-pointer gap-3 overflow-hidden rounded-lg border-2 border-black bg-white"
					>
						{#if recipe?.imageUrl}
							<img
								src={recipe?.imageUrl}
								alt=""
								class="max-h-full w-full max-w-full object-cover"
							/>
						{/if}
					</div>
				</div>

				<div class="mt-4 flex items-center justify-between gap-3">
					<div class="flex items-center gap-3">
						<div>
							<button
								class="shadow_button shadow_button_sm"
								style="height: 40px"
								onclick={shareToPinterest}
							>
								<img src="/images/pinterest_logo.svg" class="w-5" alt="" />
							</button>
						</div>
						<div>
							<button
								class="shadow_button shadow_button_sm"
								style="height: 40px"
								onclick={copyLink}
							>
								<Link size="20px" />
							</button>
						</div>
					</div>

					<div>
						{#if isOwner}
							<a href={`/recipe/${page.params.id}/edit`}>
								<button class="shadow_button shadow_button_sm" style="height: 40px">
									<SquarePen size="20px" />
								</button>
							</a>
						{/if}
					</div>
				</div>

				<div class="mt-8">
					<div>
						<div class="flex items-center justify-between gap-3">
							<h3 class="text-xl">Ingredients</h3>

							<div>
								<a href={`/recipe/user/${recipe?.ownerId}`}>
									<p class="font-lexend text text-xs underline">View my other recipes</p>
								</a>
							</div>
						</div>

						<div class="mt-4 space-y-3">
							{#each recipe?.ingredients as item, index (index)}
								<IngredientItem name={item?.value} />
							{/each}
						</div>
					</div>

					<div class="mt-8">
						<h3 class="text-xl">Instructions</h3>

						<div class="mt-4 space-y-4">
							{#each recipe?.method as item, index (index)}
								<InstructionItem name={item?.value} step={'' + (index + 1)} />
							{/each}
						</div>
					</div>

					<div class="mt-8">
						<h3 class="text-xl">Additional notes</h3>

						<div class="mt-4">
							<p class="font-lexend font-light">{'Additional notes'}</p>
						</div>
					</div>
				</div>
			</div>

			<div class="mt-16 flex justify-end">
				<div>
					{#if isOwner}
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
					{/if}
				</div>
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
