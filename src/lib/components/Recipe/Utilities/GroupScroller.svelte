<script lang="ts">
	import { Heart, Plus } from '@lucide/svelte';
	import NewGroup from './NewGroup.svelte';
	import { createQuery } from '@tanstack/svelte-query';
	import { queryKeys } from '$lib/utils/queryKeys';
	import { recipeRequest } from '$lib/requests';
	import TabButton from '$lib/components/Common/TabButton.svelte';
	import Tooltip from '$lib/components/Common/Tooltip.svelte';

	let { currentTab = $bindable(), handleChangeTab } = $props();

	let addNewGroup = $state(false);

	const groupQuery = createQuery({
		queryKey: queryKeys.getRecipeGroups,
		queryFn: () => recipeRequest.getRecipeGroups()
	});

	let groupList = $derived($groupQuery?.data?.data?.recipeGroups);

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
		<div class="flex items-center justify-between gap-4">
			<div class="no-scrollbar flex items-center gap-4 overflow-x-auto">
				<TabButton name={'All'} {changeTab} {currentTab} />
				<TabButton name={'Saved'} {changeTab} {currentTab} LeftIcon={Heart} />

				{#each groupList as group, index (index)}
					<TabButton name={group?.name} {changeTab} {currentTab} />
				{/each}
			</div>

			<div>
				<Tooltip text={'Create category'}>
					<button class="shadow_button shadow_button_sm" onclick={toggleView}>
						<Plus />
					</button>
				</Tooltip>
			</div>
		</div>
	{/if}

	{#if addNewGroup}
		<NewGroup {toggleView} />
	{/if}
</div>
