<script lang="ts">
	import type { RecipeResponse } from '../../../../types/recipe';

	let { recipe, isOwner }: { recipe: RecipeResponse; isOwner: boolean } = $props();
</script>

<div class="flex min-w-max items-center gap-1">
	<p class="font-lexend-deca text-sm font-medium">Author:</p>

	<a
		href={`/recipe/user/${recipe?.ownerId}?s=${recipe?.slug}&o=${recipe?.ownerId}`}
		class="font-lexend-deca text-sm font-light underline">{recipe?.ownerName}</a
	>
	{#if !isOwner}
		<a href={`/recipe/user/${recipe?.ownerId}?s=${recipe?.slug}&o=${recipe?.ownerId}`}>
			<p class="font-lexend text-11 font-extralight">- View other recipes</p>
		</a>
	{/if}
</div>
