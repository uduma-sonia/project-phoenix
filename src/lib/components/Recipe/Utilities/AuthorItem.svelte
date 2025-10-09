<script lang="ts">
	import Tooltip from '$lib/components/Common/Tooltip.svelte';
	import type { RecipeResponse } from '../../../../types/recipe';

	let { recipe }: { recipe: RecipeResponse } = $props();
</script>

<div class="mt-4 flex min-w-max items-center gap-1">
	<p class="font-lexend-deca text-sm font-medium">Author:</p>

	<Tooltip text="View other recipes">
		<a
			href={`/recipe/user/${recipe?.ownerId}`}
			class="font-lexend-deca text-sm font-light underline">{recipe?.ownerName}</a
		>
	</Tooltip>
</div>
