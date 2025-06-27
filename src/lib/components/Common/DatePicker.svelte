<script lang="ts">
	import { Play } from '@lucide/svelte';
	import {
		format,
		addMonths,
		subMonths,
		startOfMonth,
		endOfMonth,
		startOfWeek,
		endOfWeek,
		eachDayOfInterval,
		isSameMonth,
		isSameDay,
		addDays
	} from 'date-fns';

	let selectedDate = $state(new Date());
	let currentMonth = $state(new Date());
	let _startOfWeek = startOfWeek(new Date());
	let daysArray = Array.from({ length: 7 }, (_, i) => i + 1);
	let _eachDayOfInterval = $derived(
		eachDayOfInterval({
			start: startOfWeek(startOfMonth(currentMonth)),
			end: endOfWeek(endOfMonth(currentMonth))
		})
	);

	const prevMonth = () => {
		currentMonth = subMonths(currentMonth, 1);
	};

	const nextMonth = () => {
		currentMonth = addMonths(currentMonth, 1);
	};

	const handleDateSelect = (day: Date) => {
		selectedDate = day;
	};
	const renderDateBgColor = (day: Date) => {
		return isSameDay(day, selectedDate);
	};

	const renderDateColor = (day: Date) => {
		return isSameMonth(day, currentMonth);
	};
</script>

<div class="">
	<div class="date-picker-header">
		<button class="shadow_button control_button" onclick={prevMonth}>
			<span class="block rotate-180">
				<Play size="18px" />
			</span>
		</button>
		<p>{format(currentMonth, 'MMMM yyyy')}</p>
		<button class="shadow_button control_button" onclick={nextMonth}>
			<Play size="18px" />
		</button>
	</div>

	<div class="date-picker-days">
		{#each daysArray as _, i (i)}
			<p class="rounded-md border-2 text-sm font-medium text-black">
				{format(addDays(_startOfWeek, i), 'EEE')}{' '}
			</p>
		{/each}
	</div>

	<div class="date-picker-dates">
		{#each _eachDayOfInterval as day (day)}
			<button
				class:date-selected={renderDateBgColor(day)}
				class:not={!isSameMonth(day, currentMonth)}
				class:date-color={renderDateColor(day)}
				onclick={() => {
					if (isSameMonth(day, currentMonth)) {
						handleDateSelect(new Date(day.getFullYear(), day.getMonth(), day.getDate()));
					}
				}}
			>
				{format(day, 'd')}
			</button>
		{/each}
	</div>
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

	.date-picker-days {
		display: grid;
		grid-template-columns: repeat(7, 1fr);
		gap: 4px;
		text-align: center;
		margin-top: 20px;
		margin-bottom: 20px;
	}

	.date-picker-dates {
		display: grid;
		grid-template-columns: repeat(7, 1fr);
		gap: 4px;
	}

	.date-picker-dates button {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 45px;
		font-family: 'Lexend Deca Variable', sans-serif;
		font-weight: 300;
		font-size: 13px;
		background-color: transparent;
		color: #7f7e7e;
		border: 2px solid black;
		text-align: center;
		border-radius: 8px;
		padding: 10px 0;
	}

	.not {
		border: 1px solid black !important;
	}

	.date-selected {
		background-color: #c2e08a !important;
		font-weight: 600 !important;
	}

	.date-color {
		color: #000000 !important;
	}
</style>
