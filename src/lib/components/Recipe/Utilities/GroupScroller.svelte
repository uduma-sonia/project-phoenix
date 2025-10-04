<script lang="ts">
	import { Plus } from '@lucide/svelte';
	import NewGroup from './NewGroup.svelte';
	import { createQuery } from '@tanstack/svelte-query';
	import { queryKeys } from '$lib/utils/queryKeys';
	import { recipeRequest } from '$lib/requests';

	let addNewGroup = $state(false);
	let currentTab = $state('ALL');

	const groupQuery = createQuery({
		queryKey: queryKeys.getRecipeGroups,
		queryFn: () => recipeRequest.getRecipeGroups()
	});

	let groupList = $derived($groupQuery?.data?.data?.recipeGroups);

	function changeTab(arg: string) {
		currentTab = arg;
	}

	function toggleView() {
		addNewGroup = !addNewGroup;
	}
</script>

<div class="my-4 px-3">
	{#if !addNewGroup}
		<div class="flex items-center gap-3 overflow-hidden pr-1">
			<div
				class="middle_container no-scrollbar flex max-w-[83.5%] flex-1 flex-nowrap items-center gap-3 overflow-x-auto sm:gap-4"
			>
				<div class="min-w-fit">
					<button
						class="bg-brand-rose font-lexend button_active h-[50px] rounded-lg border-2 border-black px-6 font-light"
						onclick={() => changeTab('ALL')}
						class:selected={currentTab === 'ALL'}
					>
						All
					</button>
				</div>

				{#each groupList as group, index (index)}
					<div class="min-w-[100px] sm:min-w-[120px]">
						<button
							class="bg-brand-rose font-lexend button_active flex h-[50px] w-full items-center justify-center gap-1 rounded-lg border-2 border-black text-sm font-normal sm:text-base"
						>
							{group?.name}
						</button>
					</div>
				{/each}
			</div>
			<div>
				<button class="shadow_button shadow_button_sm" onclick={toggleView}>
					<Plus />
				</button>
			</div>
		</div>
	{/if}

	{#if addNewGroup}
		<NewGroup {toggleView} />
	{/if}
</div>

<style>
	.middle_container {
		transition: all 0.3s linear;
		scroll-behavior: smooth;
	}

	.selected {
		background-color: #c2e08a !important;
	}
</style>
