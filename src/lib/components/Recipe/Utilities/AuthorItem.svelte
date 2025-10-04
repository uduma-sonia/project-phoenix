<script lang="ts">
	import type { RecipeResponse } from '../../../../types/recipe';

	let { recipe }: { recipe: RecipeResponse } = $props();
</script>

<div class="flex min-w-max items-center gap-1">
	<p class="font-lexend-deca text-sm font-medium">Author:</p>

	<a href={`/recipe/user/${recipe?.ownerId}`} class="font-lexend-deca text-sm font-light underline"
		>{recipe?.ownerName}</a
	>
</div>
