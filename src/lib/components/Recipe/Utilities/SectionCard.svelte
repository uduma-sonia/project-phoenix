<script lang="ts">
	import { type RecipeResponse } from '../../../../types/recipe';
	import SectionItem from './SectionItem.svelte';

	let { recipe }: { recipe: RecipeResponse } = $props();
</script>

{#if recipe?.sections?.length}
	<div class="mt-6">
		<div class="space-y-6">
			{#each recipe.sections as section, index (index)}
				<!-- <div>
					<div class="flex items-center justify-between gap-3">
						<h3 class="text-lg md:text-xl">{section.name}</h3>
					</div>

					{#if section.type === SectionType.CHECKLIST}
						{#if section?.list?.length}
							<div class="mt-4 space-y-3">
								{#each section?.list as item, index (index)}
									{@const isSelected = selectedRecipeList?.data?.includes(item.value)}
									<SectionListItem
										measurement={item.measurement}
										{isSelected}
										{handleSelectItem}
										name={item?.value}
										isChecklist
										{index}
									/>
								{/each}
							</div>
						{/if}
					{/if}
					{#if section.type === SectionType.LIST}
						{#if section?.list?.length}
							<div class="mt-2 space-y-3">
								{#each section?.list as item, index (index)}
									<SectionListItem name={item?.value} {index} />
								{/each}
							</div>
						{/if}
					{/if}
					{#if section.type === SectionType.PARAGRAPH}
						{#if section?.paragraph}
							<p class="font-lexend text-sm font-light md:text-base">
								{section?.paragraph}
							</p>
						{/if}
					{/if}
				</div> -->

				<SectionItem {section} />
			{/each}
		</div>
	</div>
{/if}
