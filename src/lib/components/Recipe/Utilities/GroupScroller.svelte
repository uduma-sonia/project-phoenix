<script lang="ts">
	import { Heart, Plus } from '@lucide/svelte';
	import NewGroup from './NewGroup.svelte';
	import { createQuery } from '@tanstack/svelte-query';
	import { queryKeys } from '$lib/utils/queryKeys';
	import { recipeRequest } from '$lib/requests';
	import TabButton from '$lib/components/Common/TabButton.svelte';

	let { currentTab = $bindable(), handleChangeTab } = $props();

	let addNewGroup = $state(false);

	const groupQuery = createQuery({
		queryKey: queryKeys.getRecipeGroups,
		queryFn: () => recipeRequest.getRecipeGroups()
	});

	let groupList = $derived($groupQuery?.data?.data?.recipeGroups);

	// let filteredGroupList = $derived(
	// 	groupList?.filter((item: RecipeGroup) => {
	// 		console.log(item);
	// 		if (currentTab === 'All') {
	// 			return item;
	// 		} else {
	// 			if (currentTab === item.name) {
	// 				return item;
	// 			}
	// 		}
	// 	}) || []
	// );

	// $effect(() => console.log($state.snapshot(filteredGroupList)));

	function changeTab(arg: string) {
		currentTab = arg;
		handleChangeTab(arg);
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
				<TabButton name={'All'} {changeTab} {currentTab} />
				<TabButton name={'Saved'} {changeTab} {currentTab} LeftIcon={Heart} />

				{#each groupList as group, index (index)}
					<TabButton name={group?.name} {changeTab} {currentTab} />
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
</style>
