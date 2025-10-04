<script lang="ts">
	import { SectionType, type RecipeResponse } from '../../../../types/recipe';
	import SectionListItem from './SectionListItem.svelte';

	let { recipe }: { recipe: RecipeResponse } = $props();
</script>

{#if recipe?.sections?.length}
	<div class="mt-8 space-y-8">
		{#each recipe.sections as section, index (index)}
			<div>
				<div class="flex items-center justify-between gap-3">
					<h3 class="text-xl">{section.name}</h3>
				</div>

				{#if section.type === SectionType.LIST}
					{#if section?.list?.length}
						<div class="mt-2 space-y-3">
							{#each section?.list as item, index (index)}
								<SectionListItem name={item?.value} />
							{/each}
						</div>
					{/if}
				{/if}
				{#if section.type === SectionType.PARAPGRAPH}
					{#if section?.paragraph}
						<p class="font-lexend font-light">
							{section?.paragraph}
						</p>
					{/if}
				{/if}
			</div>
		{/each}
	</div>
{/if}
