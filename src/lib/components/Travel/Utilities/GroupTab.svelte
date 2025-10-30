<script lang="ts">
	import { Plus } from '@lucide/svelte';
	import NewGroup from './NewGroup.svelte';
	import { createQuery } from '@tanstack/svelte-query';
	import { TripRequest } from '$lib/requests';
	import { page } from '$app/state';
	import { queryKeys } from '$lib/utils/queryKeys';
	import Timeline from './Timeline.svelte';
	import Tooltip from '$lib/components/Common/Tooltip.svelte';
	import TripUtils from './utils';
	import { openCreateActivityModal } from '$lib/state/modal.svelte';

	let groupQuery = createQuery({
		queryKey: queryKeys.getTripActivityGroups(page.params.id),
		queryFn: () => TripRequest.getTripActivityGroups(page.params.id)
	});
	let activityQuery = createQuery({
		queryKey: queryKeys.getTripActivities(page.params.id),
		queryFn: () => TripRequest.getTripActivities(page.params.id)
	});

	let addNewGroup = $state(false);
	let currentTab = $state('ALL');

	let groupList = $derived($groupQuery?.data?.data?.travelGroup);
	let activityList = $derived($activityQuery?.data?.data?.travelActivity);
	let filteredActivityList = $derived(TripUtils.filterActivityList(activityList, currentTab));

	function changeTab(arg: string) {
		currentTab = arg;
	}

	function toggleView() {
		addNewGroup = !addNewGroup;
	}
</script>

<div class="mt-8">
	<div
		class="middle_container no-scrollbar relative mb-6 flex flex-nowrap items-center justify-between gap-3 overflow-x-auto pr-0.5 sm:gap-4"
	>
		{#if !addNewGroup}
			<div class="no-scrollbar flex flex-nowrap items-center gap-3">
				<div class="min-w-fit">
					<button
						class="bg-brand-rose font-lexend button_active h-[50px] rounded-lg border-2 border-black px-6 font-light"
						onclick={() => changeTab('ALL')}
						class:selected={currentTab === 'ALL'}
					>
						All
					</button>
				</div>

				{#if groupList?.length > 0}
					{#each groupList as group (group._id)}
						<div class="min-w-fit">
							<button
								class="bg-brand-rose font-lexend button_active h-[50px] rounded-lg border-2 border-black px-6 font-light"
								onclick={() => changeTab(group._id)}
								class:selected={currentTab === group._id}
							>
								{group.name}
							</button>
						</div>
					{/each}
				{/if}
			</div>

			<div class="sticky top-0 right-0 ml-10">
				<div>
					<Tooltip text="Create new group">
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

	{#if filteredActivityList?.length > 0}
		<div class="space-y-3">
			{#each filteredActivityList as activity, index (index)}
				<Timeline {activity} />
			{/each}
		</div>
	{:else}
		<div class="flex h-32 items-center justify-center">
			<div class="flex flex-col items-center justify-center">
				<p class="text-13 font-lexend mb-6 font-light">No activity created</p>
				<button
					class="shadow_button shadow_button_sm shadow_button_thin"
					type="button"
					onclick={openCreateActivityModal}
				>
					Create activity
				</button>
			</div>
		</div>
	{/if}
</div>

<style>
	.selected {
		background-color: #c2e08a !important;
	}
</style>
