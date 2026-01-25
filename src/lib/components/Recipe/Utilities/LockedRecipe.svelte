<script lang="ts">
	import BasicButton from '$lib/components/Common/Form/BasicButton.svelte';
	import { LockKeyhole } from '@lucide/svelte';
	import type { RecipeResponse } from '../../../../types/recipe';

	let { recipe }: { recipe: RecipeResponse } = $props();
</script>

<div class="pt-20">
	<div
		class="mx-auto flex h-[300px] max-w-[300px] flex-col items-center justify-center rounded-2xl border-2 border-black p-4 text-center"
	>
		<LockKeyhole size="30px" />
		<p class="font-lexend my-12 text-sm font-light">
			Sorry, this recipe has been locked by the owner
		</p>

		<a href={`/recipe/user/${recipe?.ownerId}?s=${recipe?.slug}&o=${recipe?.ownerId}`}>
			<BasicButton label="View other recipes" />
		</a>
	</div>
</div>
