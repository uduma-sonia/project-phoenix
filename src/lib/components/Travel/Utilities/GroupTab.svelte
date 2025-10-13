<script lang="ts">
	import { Plus } from '@lucide/svelte';
	import NewGroup from './NewGroup.svelte';
	import { createQuery } from '@tanstack/svelte-query';
	import { tripRequest } from '$lib/requests';
	import { page } from '$app/state';
	import { queryKeys } from '$lib/utils/queryKeys';
	import type { TripActivity } from '../../../../types/trip';
	import Timeline from './Timeline.svelte';
	import Tooltip from '$lib/components/Common/Tooltip.svelte';
	import TripUtils from './utils';

	let addNewGroup = $state(false);
	let currentTab = $state('ALL');

	function toggleView() {
		addNewGroup = !addNewGroup;
	}

	const groupQuery = createQuery({
		queryKey: queryKeys.getTripActivityGroups(page.params.id),
		queryFn: () => tripRequest.getTripActivityGroups(page.params.id)
	});

	let groupList = $derived($groupQuery?.data?.data?.travelGroup);

	let activityQuery = createQuery({
		queryKey: queryKeys.getTripActivities(page.params.id),
		queryFn: () => tripRequest.getTripActivities(page.params.id)
	});

	let activityList = $derived($activityQuery?.data?.data?.travelActivity);

	function changeTab(arg: string) {
		currentTab = arg;
	}

	let filteredActivityList = $derived(
		activityList?.filter((item: TripActivity) => {
			if (currentTab === 'ALL') {
				return item;
			} else {
				if (currentTab === item.groupId) {
					return item;
				}
			}
		}) || []
	);
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

	<div class="space-y-8">
		<!-- <div class="timeline_wrapper no-scrollbar space-y-8 overflow-y-auto"> -->
		{#each TripUtils.groupByDay(filteredActivityList) as activity, index (index)}
			<Timeline {activity} />
		{/each}
	</div>

	<!-- {#if filteredActivityList?.length > 0}
		<div class="space-y-3">
			{#each filteredActivityList as activity, index (index)}
				<ActivityCard {activity} />
			{/each}
		</div>
	{:else}
		<div class="flex h-32 items-center justify-center">
			<p>No activity created</p>
		</div>
	{/if} -->

	<!-- <div class="mt-6">
		<AddActivity {groupList} />
	</div> -->
</div>

<style>
	.selected {
		background-color: #c2e08a !important;
	}
</style>
