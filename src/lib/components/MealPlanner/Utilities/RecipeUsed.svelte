<script lang="ts">
	import { Plus, Trash } from '@lucide/svelte';

	let { recipeList } = $props();
</script>

<div class="mt-4">
	<button class="font-lexend text-15 flex items-center gap-1 font-semibold">
		Add recipe <Plus size="18" strokeWidth={2.5} />
	</button>
	{#if recipeList?.length > 0}
		<div class="mt-2 space-y-2">
			{#each recipeList as recipe}
				<div
					class="bg-primary-plum-300 flex items-center justify-between gap-2 rounded-lg px-2 py-1.5"
				>
					<a
						class="font-lexend text-xs font-normal text-[#040d1a]"
						target="_blank"
						href={recipe.link}
					>
						{recipe?.title}
					</a>

					<div class="min-h-fit p-0">
						<button onclick={() => console.log(recipe?.id)} class="min-h-fit p-0">
							<Trash size="16" color="#e7000b" strokeWidth={2.6} />
						</button>
					</div>
				</div>
			{/each}
		</div>
	{/if}
</div>
