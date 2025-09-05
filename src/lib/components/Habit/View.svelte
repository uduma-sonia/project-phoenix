<script lang="ts">
	import DateScroller from './Utilities/DateScroller.svelte';
	import HabitItem from './Utilities/HabitItem.svelte';
	import HabitSearch from './Utilities/HabitSearch.svelte';
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
	import FloatingButton from '../Common/FloatingButton.svelte';

	let { user } = $props();

	let searchQuery = $state('');
	const queryClient = useQueryClient();
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
				await TrackerLogRequest.createLog(payload);
				queryClient.invalidateQueries({
					queryKey: queryKeys.getLogs(tracker._id, {
						date: TrackerUtils.getISODate(trackerState.data.selectedDay)
					})
				});
			}

			if (type === 'update') {
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

<div>
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
	</div>

	<FloatingButton link="/tracker/create" />
</div>

<DetailsModal isOpen={modalsState.data.isOpenHabitDetails} onClose={closeHabitDetails} />
