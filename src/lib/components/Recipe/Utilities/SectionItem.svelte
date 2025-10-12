<script lang="ts">
	import { handleSelectItem, selectedRecipeList } from '$lib/state/recipe.svelte';
	import { ChevronDown, ChevronRight } from '@lucide/svelte';
	import { SectionType } from '../../../../types/recipe';
	import SectionListItem from './SectionListItem.svelte';

	let { section } = $props();

	let showInfo = $state(true);
</script>

<div>
	<button
		class="mb-2 flex items-center justify-between gap-1"
		onclick={() => (showInfo = !showInfo)}
	>
		{#if showInfo}
			<ChevronDown />
		{:else}
			<ChevronRight />
		{/if}
		<h3 class="text-lg md:text-xl">{section.name}</h3>
	</button>

	{#if showInfo}
		<div>
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
		</div>
	{/if}
</div>
