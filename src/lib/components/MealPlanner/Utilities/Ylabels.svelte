<script lang="ts">
	import { format, isSameDay } from 'date-fns';

	let { weekDates } = $props();
</script>

{#snippet dayButton(title: string, date: Date)}
	<div
		class="font-lexend my-0.5 flex h-[150px] items-center border border-r-0 bg-[#cfc4e7] px-1 text-left text-sm font-light"
	>
		{title}

		<!-- {#if date}
			<div class="font-lexend mt-2 mb-2 border-t border-t-[#b097e7] pt-1.5 text-xs font-light">
				<p>{format(new Date(date), 'MMM')}</p>
				<p>{format(new Date(date), 'dd')}</p>
			</div>

			{#if isSameDay(new Date(), date)}
				<div class="bg-brand-quit mx-auto h-3 w-3 rounded-full"></div>
			{/if}
		{/if} -->
	</div>
{/snippet}

<div class="absolute top-0 left-0 z-30 h-full w-[80px] pt-[40px]">
	<div>
		{@render dayButton('Breakfast', weekDates[0])}
		{@render dayButton('Lunch', weekDates[1])}
		{@render dayButton('Dinner', weekDates[2])}
		{@render dayButton('Snack', weekDates[3])}
	</div>
</div>
