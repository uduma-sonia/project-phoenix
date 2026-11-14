<script lang="ts">
	import { AlarmClock, Flame, Heart, Utensils } from '@lucide/svelte';
	import type { RecipeResponse } from '../../../../types/recipe';
	import Image from '$lib/components/Common/Image.svelte';
	import PrepTime from './PrepTime.svelte';
	import Difficulty from './Difficulty.svelte';

	let { recipe }: { recipe: RecipeResponse } = $props();

	let recipeImage = $derived(recipe?.images ? recipe?.images[0] : '');
	let groupsList = $derived(recipe?.groups?.map((item) => item.name));
</script>

<a
	href={`/recipe/${recipe?.slug}?owner=${recipe.ownerId}`}
	class="overflowhidden h-[100px]min-h-[100px] relative w-full rounded-2xl border-2"
>
	{#if recipe.isSaved}
		<div class="absolute right-3 bottom-3 z-50">
			<Heart size="16px" fill="#ff91e8" />
		</div>
	{/if}

	<div class="bg-primary-orange-100 flex h-full gap-2 rounded-2xl p-2.5">
		<div
			class="bg-primary-orange-300 flex h-[80px] w-[80px] min-w-[80px] items-center justify-center overflow-hidden rounded-lg border shadow-md"
		>
			<Image
				noImgClassName="w-10"
				withLoadingAnimation={true}
				src={recipeImage}
				className="h-full w-full max-h-full max-w-full object-cover"
			/>
		</div>

		<div class="flex-1">
			<p class="font-lexend text-15 line-clamp-2 font-medium">
				{recipe?.name}
			</p>

			<div class="my-1.5 flex gap-4">
				{#if recipe?.servings}
					<div class="flex min-w-max items-center gap-1">
						<p class="font-lexend-deca flex items-center gap-1 text-sm">
							<Utensils size="16px" strokeWidth={2.5} />
						</p>
						<p class="font-lexend-deca text-xs font-light">{recipe.servings}</p>
					</div>
				{/if}
				{#if recipe.cookTime || recipe.prepTime}
					<PrepTime
						data={{
							hour:
								Math.max(0, Number(recipe.cookTime?.hour || 0)) +
								Math.max(0, Number(recipe.prepTime?.hour || 0)),
							minutes:
								Math.max(0, Number(recipe.cookTime?.minutes || 0)) +
								Math.max(0, Number(recipe.prepTime?.minutes || 0))
						}}
						Icon={AlarmClock}
						iconProps={{ strokeWidth: 2.5 }}
					/>
				{/if}
				{#if recipe?.difficulty}
					<Difficulty difficulty={recipe.difficulty} />
				{/if}
			</div>

			{#if groupsList?.length}
				<div class="flex items-center gap-2">
					<p
						class="font-lexend text-brand-grey-text line-clamp-1 min-w-fit rounded-sm text-xs font-normal"
					>
						{groupsList?.join(', ')}
					</p>
				</div>
			{/if}
		</div>
	</div>
</a>
