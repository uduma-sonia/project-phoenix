<script lang="ts">
	import HamburgerDropdown from '$lib/components/Common/HamburgerDropdown.svelte';
	import {
		Check,
		Ban,
		Minus,
		Plus,
		SkipForward,
		SquarePen,
		Trash2,
		StepForward,
		RefreshCcw
	} from '@lucide/svelte';
	import TrackerUtils from './utils';
	import { HabitStatus } from '../../../../types/tracker';
	import { createQuery } from '@tanstack/svelte-query';
	import { queryKeys } from '$lib/utils/queryKeys';
	import { TrackerLogRequest } from '$lib/requests';
	import { trackerState } from '$lib/state/tracker.svelte';
	import type { HabitItemProps } from '../../../../types/tracker';
	import Helpers from '$lib/utils/helpers';

	let { habit, deleteHabit, updateLog, updateBuildLog, openDetailsModal }: HabitItemProps =
		$props();

	const logQuery = $derived(
		createQuery({
			queryKey: queryKeys.getLogs(habit._id, {
				date: TrackerUtils.getISODate(trackerState.data.selectedDay)
			}),
			queryFn: () =>
				TrackerLogRequest.getLog(habit._id, {
					date: TrackerUtils.getISODate(trackerState.data.selectedDay)
				})
		})
	);

	let logDetails = $derived($logQuery?.data?.data?.trackerLog);
	let logValue = $derived(logDetails?.value || 0);
	const habitType = $derived(logDetails?._id ? 'update' : 'create');

	let debounceTimer: any = $state();

	function increaseValue() {
		let goalValue = habit?.goalValue;

		if (logValue + 1 <= goalValue) {
			logValue = logValue + 1;
		}

		clearTimeout(debounceTimer);

		debounceTimer = setTimeout(() => {
			const _status =
				logValue >= Number(habit.goalValue) ? HabitStatus.COMPLETED : HabitStatus.PENDING;
			const _value = _status === HabitStatus.COMPLETED ? Number(habit.goalValue) : logValue;

			updateBuildLog({
				tracker: habit,
				status: _status,
				type: habitType,
				log: logDetails,
				value: _value
			});
		}, 500);
	}

	function decreaseValue() {
		if (logValue - 1 >= 0) {
			logValue = logValue - 1;
		}

		clearTimeout(debounceTimer);

		debounceTimer = setTimeout(() => {
			const _status = HabitStatus.PENDING;

			updateBuildLog({
				tracker: habit,
				status: _status,
				type: habitType,
				log: logDetails,
				value: logValue
			});
		}, 500);
	}

	function statusAction() {
		const _status = logDetails?.status == HabitStatus.STOP ? HabitStatus.START : HabitStatus.STOP;

		const updated_at = Helpers.toISOString(logDetails?.updatedAt);
		updateLog(habit._id, _status, habitType, logDetails?._id, updated_at);
	}

	function restartAction() {
		const _status = HabitStatus.PENDING;

		if (habit.type === 'QUIT') {
			updateLog(habit._id, _status, habitType, logDetails?._id);
		}

		if (habit.type === 'BUILD') {
			updateBuildLog({
				tracker: habit,
				status: HabitStatus.PENDING,
				type: habitType,
				log: logDetails,
				value: 0
			});
		}
	}

	function done() {
		updateBuildLog({
			tracker: habit,
			status: HabitStatus.COMPLETED,
			type: habitType,
			log: logDetails,
			value: Number(habit.goalValue)
		});
	}
	function skip() {
		updateBuildLog({
			tracker: habit,
			status: HabitStatus.SKIPPED,
			type: habitType,
			log: logDetails,
			value: logValue
		});
	}
	function _delete() {
		deleteHabit(habit?._id);
	}

	const moreOptions = [
		// QUIT
		{
			label: 'Stop',
			icon: Ban,
			type: 'quit',
			action: statusAction
		},

		// BUILD
		{
			label: 'Done',
			icon: Check,
			type: 'build',
			action: done
		},
		{
			label: 'Skip',
			icon: SkipForward,
			type: 'build',
			action: skip
		},

		// ALL
		{
			label: 'Edit',
			icon: SquarePen,
			type: 'all',
			link: `/tracker/${habit?._id}/edit`
		},
		{
			label: 'Delete',
			icon: Trash2,
			iconColor: 'red',
			type: 'all',
			action: _delete
		}
	];
	const stopOptions = [
		{
			label: 'Start',
			icon: StepForward,
			type: 'quit',
			action: statusAction
		},

		{
			label: 'Edit',
			icon: SquarePen,
			type: 'all',
			link: `/tracker/${habit?._id}/edit`
		},
		{
			label: 'Delete',
			icon: Trash2,
			iconColor: 'red',
			type: 'all',
			action: _delete
		}
	];
	const restartOptions = [
		{
			label: 'Restart',
			icon: RefreshCcw,
			type: 'build',
			action: restartAction
		},

		{
			label: 'Edit',
			icon: SquarePen,
			type: 'all',
			link: `/tracker/${habit?._id}/edit`
		},
		{
			label: 'Delete',
			icon: Trash2,
			iconColor: 'red',
			type: 'all',
			action: _delete
		}
	];

	function getOptionList(status: HabitStatus, { restart, more, stop }: any) {
		if (status === HabitStatus.COMPLETED || status === HabitStatus.SKIPPED) {
			return restart;
		}

		if (status === HabitStatus.PENDING || status === HabitStatus.START) {
			return more;
		}
		if (status === HabitStatus.STOP) {
			return stop;
		}

		return more;
	}

	function generateOptionsDropdown(arr: any[], type: string, status: string) {
		let options = [];

		for (let i = 0; i < arr.length; i++) {
			const element = arr[i];
			if (element.type?.toLowerCase() == type.toLowerCase() || element.type == 'all') {
				options.push(element);
			}
		}

		return options;
	}
</script>

<div class="item_wrapper h-[170px]">
	<button
		class="relative z-10 h-full w-full cursor-pointer gap-3 rounded-lg border-2 border-black bg-white p-4"
		onclick={() => {
			openDetailsModal({ ...habit, logDetails: logDetails });
		}}
	>
		<div class="absolute -top-3 left-3 -rotate-3">
			<p
				class:bg-brand-quit={habit.type === 'QUIT'}
				class:bg-brand-build={habit.type === 'BUILD'}
				class="font-lexend bg-brand-build inline-block rounded-sm px-2 py-0.5 text-[10px] font-normal text-black capitalize"
			>
				{habit.type}
			</p>
		</div>
		<div class="flex h-full flex-col justify-between">
			<div>
				<div>
					{#if habit.icon}
						<img src={habit.icon} alt="walk icon" class="mx-auto h-6" />
					{/if}
				</div>
				<div class="font-lexend mt-3 line-clamp-2 w-full text-center font-normal hover:underline">
					{habit.name}
				</div>
			</div>

			<div class="mt-5">
				{#if habit.type === 'BUILD'}
					{#if logDetails?._id && logDetails?.status === HabitStatus.SKIPPED}
						<p class="font-lexend skipped text-center text-[13px] font-semibold">Skipped</p>
					{/if}

					{#if !logDetails?._id || logDetails?.status === HabitStatus.PENDING}
						<div class="flex items-center justify-center gap-2">
							<div class="w-fit">
								<div
									tabindex="0"
									role="button"
									class="button_active flex h-7 w-7 items-center justify-center rounded-full bg-black font-normal"
									onclick={(e) => {
										e.preventDefault();
										e.stopPropagation();
										decreaseValue();
									}}
									onkeydown={() => console.log('keydown::')}
								>
									<Minus size="16px" color="#FFFFFF" />
								</div>
							</div>

							<div class="font-lexend text-[13px] font-light">
								{logValue}/{habit.goalValue}
								{habit?.unitMeasurement}
							</div>

							<div class="w-fit">
								<div
									tabindex="0"
									role="button"
									class="button_active flex h-7 w-7 items-center justify-center rounded-full bg-black font-normal"
									onclick={(e) => {
										e.preventDefault();
										e.stopPropagation();
										increaseValue();
									}}
									onkeydown={() => console.log('keydown::')}
								>
									<Plus size="16px" color="#FFFFFF" />
								</div>
							</div>
						</div>
					{/if}

					{#if logDetails?.status === HabitStatus.COMPLETED}
						<p class="font-lexend completed text-center text-[13px] font-semibold">Completed</p>
					{/if}
				{/if}

				{#if habit.type === 'QUIT'}
					<div>
						{#if logDetails?._id && logDetails?.status === HabitStatus.STOP}
							<p class="font-lexend stopped text-center text-[13px] font-semibold">Stopped</p>
						{/if}

						{#if !logDetails?._id || logDetails?.status === HabitStatus.START}
							<p class="font-lexend text-center text-[13px] font-light">
								{TrackerUtils.renderStreakCountdown(
									TrackerUtils.calculateStreakTime(logDetails?.updatedAt || habit?.startDate)
								)}
								{TrackerUtils.renderStreakCountdownSuffix(
									TrackerUtils.calculateStreakTime(logDetails?.updatedAt || habit?.startDate)
								)}
							</p>
						{/if}
					</div>
				{/if}
			</div>
		</div>
	</button>

	<div class="absolute top-6 right-4 z-50 -translate-y-1/2">
		<HamburgerDropdown
			options={generateOptionsDropdown(
				getOptionList(logDetails?.status, {
					restart: restartOptions,
					more: moreOptions,
					stop: stopOptions
				}),
				habit?.type,
				logDetails?.status
			)}
		/>
	</div>
</div>

<style>
	.completed {
		color: #1eb564 !important;
	}
	.skipped {
		color: #e98623 !important;
	}
	.stopped {
		color: #e7000b !important;
	}
	.item_wrapper {
		position: relative;
		border-radius: 8px;
		transition: all 0.4s linear;
	}

	.item_wrapper::before {
		content: '';
		position: absolute;
		top: 2px;
		left: 2px;
		right: 0;
		bottom: 0;
		background-color: black;
		border: 2px solid black;
		z-index: 1;
		border-radius: 8px;
		width: 100%;
		height: 100%;
	}
</style>
