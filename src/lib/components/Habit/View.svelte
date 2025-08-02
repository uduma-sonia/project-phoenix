<script lang="ts">
	import DateScroller from './Utilities/DateScroller.svelte';
	import FilterForm from './Utilities/FilterForm.svelte';
	import HabitItem from './Utilities/HabitItem.svelte';
	import HabitSearch from './Utilities/HabitSearch.svelte';
	import MonthlyStats from './MonthlyStats.svelte';
	import YearlyStats from './YearlyStats.svelte';
	import TopSection from '../Common/TopSection.svelte';
	import { Plus } from '@lucide/svelte';
	import { TrackerRequest } from '$lib/requests';
	import { addToast } from '$lib/store/toast';
	import { createQuery, useQueryClient } from '@tanstack/svelte-query';
	import { queryKeys } from '$lib/utils/queryKeys';
	import TrackerUtils from './Utilities/utils';
	import { trackerState } from '$lib/state/tracker.svelte';
	import Helpers from '$lib/utils/helpers';

	let searchQuery = $state('');
	const queryClient = useQueryClient();
	let currentView = $state('monthly');
	let isDeleting = $state(false);

	const trackerQuery = createQuery({
		queryKey: queryKeys.getAllHabits,
		queryFn: () => TrackerRequest.getAllHabits()
	});

	let trackersList = $derived(
		$trackerQuery?.data?.data?.trackers?.filter((item: any) =>
			item.name.toUpperCase().includes(searchQuery?.toUpperCase())
		)
	);

	const changeView = () => {
		if (currentView === 'monthly') {
			currentView = 'yearly';
		} else if (currentView === 'yearly') {
			currentView = 'monthly';
		}
	};

	async function deleteHabit(id: string) {
		try {
			isDeleting = true;
			await TrackerRequest.deleteHabit(id);
			queryClient.invalidateQueries({ queryKey: queryKeys.getAllHabits });
		} catch (error: any) {
			addToast(error?.message, 'error');
		} finally {
			isDeleting = false;
		}
	}

	let { start: dateViewing } = $derived(
		Helpers.getStartAndEndDates({
			dateViewing: trackerState.data.selectedDay
		})
	);
</script>

<div class="mx-auto w-full max-w-[1000px] overflow-x-hidden pb-64">
	<TopSection />
	<DateScroller />

	<div class="flex items-center justify-between">
		<div class="relative z-30 mt-3 flex items-start gap-3 px-3 sm:gap-6">
			<div>
				<HabitSearch bind:searchQuery />
			</div>
		</div>
	</div>

	<div class="relative z-10 mt-10 grid grid-cols-1 gap-4 px-3 sm:grid-cols-2 md:grid-cols-3">
		{#each trackersList as habit, index (index)}
			{@const isActive = TrackerUtils.isHabitActive(habit, dateViewing)}

			{#if isActive}
				<HabitItem {habit} deleteHabit={() => deleteHabit(habit._id)} />
			{/if}
		{/each}

		<!-- <div class="hidden w-1/2 sm:block">
			<div class="bg-whit mb-4 flex rounded-lg border-2 bg-white">
				<div class="w-1/2 rounded-lg">
					<button
						onclick={changeView}
						class:activeView={currentView === 'monthly'}
						class="h-[45px] w-full rounded-lg bg-[#ffffff] text-black"
					>
						Monthly
					</button>
				</div>

				<div class="w-1/2 rounded-lg">
					<button
						onclick={changeView}
						class:activeView={currentView === 'yearly'}
						class="h-[45px] w-full rounded-lg bg-[#ffffff] text-black"
					>
						Yearly
					</button>
				</div>
			</div>

			{#if currentView === 'monthly'}
				<MonthlyStats />
			{/if}
			{#if currentView === 'yearly'}
				<YearlyStats />
			{/if}
		</div> -->
	</div>

	<div
		class="fixed bottom-0 left-1/2 z-50 flex w-full max-w-[1000px] -translate-x-1/2 items-center justify-end p-5"
	>
		<a href="/tracker/create" class="block">
			<button class="create_button shadow_button">
				<Plus />
			</button>
		</a>
	</div>
</div>

<style>
	/* .activeView {
		background-color: #a0c878 !important;
	} */
</style>
