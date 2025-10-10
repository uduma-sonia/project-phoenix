<script lang="ts">
	import { ShoppingCart } from '@lucide/svelte';
	import { SectionType, type RecipeResponse } from '../../../../types/recipe';
	import SectionListItem from './SectionListItem.svelte';
	import Tooltip from '$lib/components/Common/Tooltip.svelte';
	import { handleSelectItem, selectedRecipeList } from '$lib/state/recipe.svelte';
	import { openAddToListModal } from '$lib/state/modal.svelte';

	let { recipe }: { recipe: RecipeResponse } = $props();
</script>

{#if recipe?.sections?.length}
	<div class="mt-6">
		{#if selectedRecipeList?.data && selectedRecipeList?.data?.length > 0}
			<div class="mb-6">
				<Tooltip position="right" text="Add to shopping list">
					<button
						class="shadow_button shadow_button_sm shadow_button_thin"
						onclick={openAddToListModal}
					>
						<ShoppingCart />
					</button>
				</Tooltip>
			</div>
		{/if}
		<div class="space-y-10">
			{#each recipe.sections as section, index (index)}
				<div>
					<div class="flex items-center justify-between gap-3">
						<h3 class="text-xl">{section.name}</h3>
					</div>

					{#if section.type === SectionType.CHECKLIST}
						{#if section?.list?.length}
							<div class="mt-2 space-y-3">
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
							<p class="font-lexend font-light">
								{section?.paragraph}
							</p>
						{/if}
					{/if}
				</div>
			{/each}
		</div>
	</div>
{/if}
