<script lang="ts">
	import { Heart } from '@lucide/svelte';
	import type { RecipeResponse } from '../../../../types/recipe';
	import Image from '$lib/components/Common/Image.svelte';

	let { recipe }: { recipe: RecipeResponse } = $props();

	let recipeImage = $derived(recipe?.images ? recipe?.images[0] : '');
</script>

<a
	href={`/recipe/${recipe?.slug}?owner=${recipe.ownerId}`}
	class="button_active relative cursor-pointer"
>
	<div class="bg-brand-recipe relative h-6 w-16 rounded-tl-lg border-2 border-b-0">
		<div class="bg-brand-recipe absolute top-2 -right-10 h-20 w-full -rotate-45 border-r-2"></div>
	</div>

	<div class="card_wrapper bg-brand-recipe rounded-lg rounded-tl-none">
		<div
			class="bg-brand-recipe relative z-10 h-[220px] w-full max-w-[350px] rounded-lg rounded-tl-none border-2"
		>
			{#if recipeImage}
				<div class="h-[160px] overflow-hidden rounded-t-lg">
					<Image src={recipeImage} className="h-full w-full object-cover" />
				</div>
			{/if}
			{#if !recipeImage}
				<div
					class="text-10 flex h-[160px] items-center justify-center overflow-hidden rounded-t-lg"
				>
					<p>No image available</p>
				</div>
			{/if}

			<div class="h-[60px] p-2">
				<p class="font-lexend line-clamp-2 text-sm font-light">
					{recipe?.name}
				</p>
			</div>
		</div>
	</div>

	{#if recipe.isSaved}
		<div class="absolute right-3 bottom-3 z-50">
			<Heart size="18px" fill="#101010" />
		</div>
	{/if}
</a>

<style>
	.card_wrapper {
		position: relative;
	}

	.card_wrapper::before {
		content: '';
		position: absolute;
		top: 3px;
		left: 3px;
		right: 0;
		bottom: 0;
		background-color: #000000;
		border: 2px solid black;
		z-index: 1;
		border-radius: 8px;
		width: 100%;
		height: 100%;
	}
</style>
