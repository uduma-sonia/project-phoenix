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
		X,
		StepForward
	} from '@lucide/svelte';
	import TrackerUtils from './utils';
	import { HabitStatus } from '../../../../types/tracker';
	import { createQuery } from '@tanstack/svelte-query';
	import { queryKeys } from '$lib/utils/queryKeys';
	import { TrackerLogRequest } from '$lib/requests';
	import { trackerState } from '$lib/state/tracker.svelte';

	let { habit, deleteHabit, updateLog, updateBuildLog } = $props();

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

	function statusAction() {
		const _status = logDetails?.status == HabitStatus.STOP ? HabitStatus.START : HabitStatus.STOP;
		const type = logDetails?._id ? 'update' : 'create';
		updateLog(habit._id, _status, type, logDetails?._id);
	}

	function done() {
		const type = logDetails?._id ? 'update' : 'create';
		updateBuildLog(habit, HabitStatus.COMPLETED, type, logDetails);
	}
	function skip() {
		const type = logDetails?._id ? 'update' : 'create';
		updateBuildLog(habit, HabitStatus.SKIPPED, type, logDetails);
	}

	const moreOptions = [
		// QUIT
		{
			label: 'Stop',
			icon: Ban,
			type: 'quit',
			action: statusAction
		},
		{
			label: 'Start',
			icon: StepForward,
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

		{
			label: 'Edit',
			icon: SquarePen,
			type: 'all'
		},
		{
			label: 'Delete',
			icon: Trash2,
			iconColor: 'red',
			type: 'all',
			action: deleteHabit
		}
	];

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
	<div class="relative z-10 h-full w-full gap-3 rounded-lg border-2 border-black bg-white p-4">
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
				<p class="font-lexend mt-3 text-center font-normal">{habit.name}</p>
			</div>

			<div class="mt-5">
				{#if habit.type === 'BUILD'}
					{#if logDetails?._id && logDetails?.status === HabitStatus.SKIPPED}
						<p class="font-lexend text-center text-[13px] font-semibold text-amber-600">Skipped</p>
					{/if}

					{#if !logDetails?._id || logDetails?.status === HabitStatus.COMPLETED}
						<div>
							<div class="flex items-center justify-center gap-2">
								<div class="w-fit">
									<button
										class="button_active flex h-7 w-7 items-center justify-center rounded-full bg-black font-normal"
									>
										<Minus size="16px" color="#FFFFFF" />
									</button>
								</div>

								<div class="font-lexend text-[13px] font-light">
									{logDetails?.value || 0} /{habit.goalValue}
									{habit?.unitMeasurement}
								</div>

								<div class="w-fit">
									<button
										class="button_active flex h-7 w-7 items-center justify-center rounded-full bg-black font-normal"
									>
										<Plus size="16px" color="#FFFFFF" />
									</button>
								</div>
							</div>
						</div>
					{/if}
				{/if}
				{#if habit.type === 'QUIT'}
					<div>
						{#if logDetails?._id && logDetails?.status === HabitStatus.STOP}
							<p class="font-lexend text-center text-[13px] font-semibold text-red-600">Stopped</p>
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
	</div>

	<div class="absolute top-6 right-4 z-50 -translate-y-1/2">
		<HamburgerDropdown
			options={generateOptionsDropdown(moreOptions, habit?.type, logDetails?.status)}
		/>
	</div>
</div>

<style>
	.item_wrapper {
		position: relative;
		border-radius: 8px;
		transition: all 0.4s linear;
	}

	.item_wrapper::before {
		content: '';
		position: absolute;
		top: 1px;
		left: 1px;
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
