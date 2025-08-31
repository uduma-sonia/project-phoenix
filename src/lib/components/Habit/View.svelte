<script lang="ts">
	import DateScroller from './Utilities/DateScroller.svelte';
	import HabitItem from './Utilities/HabitItem.svelte';
	import HabitSearch from './Utilities/HabitSearch.svelte';
	import TopSection from '../Common/TopSection.svelte';
	import { Plus } from '@lucide/svelte';
	import { TrackerLogRequest, TrackerRequest } from '$lib/requests';
	import { addToast } from '$lib/store/toast';
	import { createQuery, useQueryClient } from '@tanstack/svelte-query';
	import { queryKeys } from '$lib/utils/queryKeys';
	import TrackerUtils from './Utilities/utils';
	import { trackerState, updateTrackerDetails } from '$lib/state/tracker.svelte';
	import Helpers from '$lib/utils/helpers';
	import { HabitStatus, type Habit } from '../../../types/tracker';
	import DetailsModal from './DetailsModal.svelte';
	import { closeHabitDetails, modalsState, openHabitDetails } from '$lib/state/modal.svelte';

	let { user } = $props();

	let searchQuery = $state('');
	const queryClient = useQueryClient();
	let currentView = $state('monthly');
	let isDeleting = $state(false);
	let userId = $derived(user?._id);

	const trackerQuery = createQuery({
		queryKey: queryKeys.getAllHabits,
		queryFn: () => TrackerRequest.getAllHabits()
	});

	let trackersList = $derived(
		$trackerQuery?.data?.data?.trackers?.filter((item: any) =>
			item.name.toUpperCase().includes(searchQuery?.toUpperCase())
		)
	);
	let { start: dateViewing } = $derived(
		Helpers.getStartAndEndDates({
			dateViewing: trackerState.data.selectedDay
		})
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
			addToast('Habit deleted', 'success');
			queryClient.invalidateQueries({ queryKey: queryKeys.getAllHabits });
		} catch (error: any) {
			addToast(error?.message, 'error');
		} finally {
			isDeleting = false;
		}
	}

	async function updateLog(trackerId: string, status: HabitStatus, type: string, logId: string) {
		try {
			isDeleting = true;

			const payload = {
				ownerId: user._id,
				trackerId: trackerId,
				date: TrackerUtils.getISODate(trackerState.data.selectedDay),
				status: status
				// value: 1,
				// goalValue: 2,
				// goalPeriod: 'DAILY',
				// unitMeasurement: 'count',
			};

			if (type === 'create') {
				await TrackerLogRequest.createLog(payload);
				queryClient.invalidateQueries({
					queryKey: queryKeys.getLogs(trackerId, {
						date: TrackerUtils.getISODate(trackerState.data.selectedDay)
					})
				});
			}

			if (type === 'update') {
				await TrackerLogRequest.updateLog(logId, payload);
				queryClient.invalidateQueries({
					queryKey: queryKeys.getLogs(trackerId, {
						date: TrackerUtils.getISODate(trackerState.data.selectedDay)
					})
				});
			}
		} catch (error: any) {
			addToast(error?.message, 'error');
		} finally {
			isDeleting = false;
		}
	}

	async function updateBuildLog({
		tracker,
		status,
		type,
		log,
		value
	}: {
		tracker: Habit;
		status: HabitStatus;
		type: string;
		log: any;
		value: number;
	}) {
		try {
			isDeleting = true;

			const payload = TrackerUtils.buildLogPayloadBuilder(
				userId,
				tracker,
				value,
				status,
				trackerState
			);

			if (type === 'create') {
				console.log('create', payload);
				await TrackerLogRequest.createLog(payload);
				queryClient.invalidateQueries({
					queryKey: queryKeys.getLogs(tracker._id, {
						date: TrackerUtils.getISODate(trackerState.data.selectedDay)
					})
				});
			}

			if (type === 'update') {
				console.log('update', trackerState.data.selectedDay);

				await TrackerLogRequest.updateLog(log._id, payload);
				queryClient.invalidateQueries({
					queryKey: queryKeys.getLogs(tracker._id, {
						date: TrackerUtils.getISODate(trackerState.data.selectedDay)
					})
				});
			}
		} catch (error: any) {
			addToast(error?.message, 'error');
		} finally {
			isDeleting = false;
		}
	}

	function openDetailsModal(arg: Habit) {
		updateTrackerDetails(arg);
		openHabitDetails();
	}
</script>

<div class="mx-auto w-full max-w-[1000px] overflow-x-hidden pb-64">
	<TopSection />
	<DateScroller />

	<div class="relative z-30 mt-8 gap-3 px-3">
		<HabitSearch bind:searchQuery />
	</div>

	<div class="relative z-10 mt-10 grid grid-cols-1 gap-5 px-3 sm:grid-cols-2 md:grid-cols-3">
		{#each trackersList as habit, index (index)}
			{@const isActive = TrackerUtils.isHabitActive(habit, dateViewing)}

			{#if isActive}
				<HabitItem {openDetailsModal} {habit} {deleteHabit} {updateLog} {updateBuildLog} />
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

<DetailsModal isOpen={modalsState.data.isOpenHabitDetails} onClose={closeHabitDetails} />

<style>
	/* .activeView {
		background-color: #a0c878 !important;
	} */
</style>
