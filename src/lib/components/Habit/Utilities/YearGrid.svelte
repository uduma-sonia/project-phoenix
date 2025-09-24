<script lang="ts">
	import Helpers from '$lib/utils/helpers';
	import { Play } from '@lucide/svelte';
	import { format, subYears, addYears } from 'date-fns';
	import TrackerUtils from './utils';
	import { HabitStatus } from '../../../../types/tracker';

	let { handleUpdateYear, value, logsList } = $props();

	let currentYear = $state(value);

	const prevYear = () => {
		handleUpdateYear(subYears(currentYear, 1));
		currentYear = subYears(currentYear, 1);
	};

	const nextYear = () => {
		handleUpdateYear(addYears(currentYear, 1));
		currentYear = addYears(currentYear, 1);
	};

	let getRange = $derived(Helpers.generateYearRange(currentYear));
</script>

<div>
	<div class="date-picker-header mb-6">
		<button class="shadow_button control_button" onclick={prevYear}>
			<span class="block rotate-180">
				<Play size="18px" />
			</span>
		</button>
		<p>{format(currentYear, 'yyyy')}</p>
		<button class="shadow_button control_button" onclick={nextYear}>
			<Play size="18px" />
		</button>
	</div>

	<div class="grid grid-cols-2 gap-3 sm:grid-cols-3">
		{#each getRange as item, index (index)}
			<div>
				<div class="mb-2">
					<p class="font-lexend text-sm font-light capitalize">{item.month}</p>
				</div>

				<div class="grid grid-cols-7 gap-[2px]">
					{#each TrackerUtils.padMonthDays(item?.days) as day, i}
						{#if day === null}
							<div class="h-5 w-5"></div>
						{:else}
							{@const dateObj = new Date(day)}
							{@const getLog = TrackerUtils.getLogForDay(logsList, day)}

							<div
								class="flex h-5 w-5 items-center justify-center rounded-sm bg-gray-300 text-[10px]"
								class:date-complete={getLog?.status == HabitStatus.COMPLETED}
								class:date-skip={getLog?.status == HabitStatus.SKIPPED}
							>
								{dateObj.getDate()}
							</div>
						{/if}
					{/each}
				</div>
			</div>
		{/each}
	</div>

	<!-- <div class="grid grid-cols-2 gap-3 sm:grid-cols-3">
		{#each getRange as item, index (index)}
			<div>
				<div class="mb-2">
					<p class="font-lexend text-sm font-light capitalize">{item.month}</p>
				</div>

				<div class="grid grid-cols-7 gap-[2px]">
					{#each buildMonthDays(TrackerUtils.getDateNum(currentStatsYear.year)._year, index) as day, i}
						{#if day === null}
							<div class="h-5 w-5"></div>
						{:else}
							{@const getLog = getLogForDay(logsList, `${TrackerUtils.getDateNum(currentStatsYear.year)}-${item.monthIndex + 1}-${day}`)}

							<div
								class="flex h-5 w-5 items-center justify-center rounded-sm bg-gray-300 text-[10px]"
								class:date-complete={getLog?.status == HabitStatus.COMPLETED}
								class:date-skip={getLog?.status == HabitStatus.SKIPPED}
							>
								{day}
							</div>
						{/if}
					{/each}
				</div>
			</div>
		{/each}
	</div> -->
</div>

<style>
	.control_button {
		width: fit-content !important;
		height: 35px;
	}

	.date-picker-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 20px;
	}

	.date-picker-header p {
		font-size: 16px;
		font-weight: 500;
	}

	.date-complete {
		background-color: #8cbf80 !important;
	}
	.date-skip {
		background-color: #e98623 !important;
	}
</style>
