<script lang="ts">
	import { Plus } from '@lucide/svelte';
	import { createQuery } from '@tanstack/svelte-query';
	import { queryKeys } from '$lib/utils/queryKeys';
	import { packingRequest } from '$lib/requests';
	import TabButton from '$lib/components/Common/TabButton.svelte';
	import NewCategory from './NewCategory.svelte';

	let { currentTab = $bindable(), handleChangeTab } = $props();

	let addNewGroup = $state(false);

	const groupQuery = createQuery({
		queryKey: queryKeys.getPackingCategories,
		queryFn: () => packingRequest.getPackingCategories()
	});

	let groupList = $derived($groupQuery?.data?.data?.packingCategory);

	function changeTab(arg: string) {
		currentTab = arg;
		handleChangeTab(arg);
	}

	function toggleView() {
		addNewGroup = !addNewGroup;
	}
</script>

<div class="">
	{#if !addNewGroup}
		<div class="flex items-center justify-between gap-4">
			<div class="no-scrollbar flex items-center gap-4 overflow-x-auto">
				<TabButton name={'All'} {changeTab} {currentTab} />

				<!-- {#each groupList as group, index (index)}
					<TabButton name={group?.name} {changeTab} {currentTab} />
				{/each} -->
			</div>

			<!-- <div>
				<button class="shadow_button shadow_button_sm" onclick={toggleView}>
					<Plus />
				</button>
			</div> -->
		</div>
	{/if}

	<!-- {#if addNewGroup}
		<NewCategory {toggleView} />
	{/if} -->
</div>
