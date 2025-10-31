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
	import LoaderError from '../Common/LoaderError.svelte';
	import { format } from 'date-fns';
	import EmptyState from '../Common/EmptyState.svelte';
	import { onMount } from 'svelte';

	let { user } = $props();

	let searchQuery = $state('');
	const queryClient = useQueryClient();
	let isDeleting = $state(false);
	let userId = $derived(user?._id);

	let trackerQuery = createQuery({
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
	let isLoading = $derived($trackerQuery?.isLoading);
	let isError = $derived($trackerQuery?.isError);
	let hasTrackers = $derived((trackersList ?? []).length > 0);

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

	async function updateHistory(id: string, text: string) {
		try {
			await TrackerRequest.updateHistory({
				trackerId: id,
				text: text,
				status: HabitStatus.START,
				date: TrackerUtils.getISODate(new Date())
			});
		} catch (error: any) {
			addToast(error || 'An error occured', 'error');
		}
	}

	async function updateLog(
		trackerId: string,
		status: HabitStatus,
		type: string,
		logId: string,
		updated_at?: string
	) {
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

				if (status === HabitStatus.STOP) {
					const _date = TrackerUtils.renderStreakCountdown(
						TrackerUtils.calculateStreakTime(updated_at)
					);
					const _time = TrackerUtils.renderStreakCountdownSuffix(
						TrackerUtils.calculateStreakTime(updated_at)
					);

					const text = `You stopped this streak. Record: ${_date} ${_time}`;

					updateHistory(trackerId, text);
				}
			}

			if (type === 'update') {
				await TrackerLogRequest.updateLog(logId, payload);
				queryClient.invalidateQueries({
					queryKey: queryKeys.getLogs(trackerId, {
						date: TrackerUtils.getISODate(trackerState.data.selectedDay)
					})
				});

				if (status === HabitStatus.STOP) {
					const _date = TrackerUtils.renderStreakCountdown(
						TrackerUtils.calculateStreakTime(updated_at)
					);
					const _time = TrackerUtils.renderStreakCountdownSuffix(
						TrackerUtils.calculateStreakTime(updated_at)
					);

					const text = `You stopped this streak. Record: ${_date} ${_time}`;

					updateHistory(trackerId, text);
				}

				if (status === HabitStatus.START) {
					if (updated_at) {
						const text = `You started this streak again on ${format(new Date(updated_at), 'PP')}`;
						updateHistory(trackerId, text);
					}
				}
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

	let hasMount = $state(false);
	onMount(() => {
		hasMount = true;
	});
</script>

<div class="pb-24">
	<p class="font-lexend mb-4 px-3 text-xs font-normal text-wrap">Track your habits</p>

	<DateScroller />

	<div class="relative z-30 mt-5 gap-3 px-3">
		<HabitSearch placeholder="Search tracker" bind:searchQuery />
	</div>

	<LoaderError {isLoading} error={isError} />

	{#if !isLoading && !isError}
		{#if hasTrackers}
			<div class="relative z-10 mt-10 grid grid-cols-1 gap-5 px-3 sm:grid-cols-2 md:grid-cols-3">
				{#each trackersList as habit, index (index)}
					{@const isActive = TrackerUtils.isHabitActive(habit, dateViewing)}

					{#if isActive}
						<HabitItem {openDetailsModal} {habit} {deleteHabit} {updateLog} {updateBuildLog} />
					{/if}
				{/each}
			</div>
		{:else if !isError}
			{#if hasMount}
				<EmptyState
					buttonText="Create Tracker"
					link="/tracker/create"
					heading="Ready to track?"
					text="Add your first habit and start your streak today"
				/>
			{:else}
				<LoaderError isLoading={true} />
			{/if}
		{/if}
	{/if}
</div>

<DetailsModal isOpen={modalsState.data.isOpenHabitDetails} onClose={closeHabitDetails} />
