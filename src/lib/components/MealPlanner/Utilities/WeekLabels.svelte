<script lang="ts">
	import { format, isSameDay } from 'date-fns';

	let { weekDates } = $props();
</script>

{#snippet dayButton(title: string, date: Date)}
	<div class="font-lexend h-[140px] border bg-[#cfc4e7] px-1 pt-3 text-center text-sm md:text-base">
		{title}

		{#if date}
			<div class="font-lexend mt-2 mb-2 border-t border-t-[#b097e7] pt-1.5 text-xs font-light">
				<p>{format(new Date(date), 'MMM')}</p>
				<p>{format(new Date(date), 'dd')}</p>
			</div>

			{#if isSameDay(new Date(), date)}
				<div class="bg-brand-quit mx-auto h-3 w-3 rounded-full"></div>
			{/if}
		{/if}
	</div>
{/snippet}

<div class="absolute top-0 left-0 z-30 h-full w-[50px] pt-[40px]">
	<div>
		{@render dayButton('Sun', weekDates[0])}
		{@render dayButton('Mon', weekDates[1])}
		{@render dayButton('Tue', weekDates[2])}
		{@render dayButton('Wed', weekDates[3])}
		{@render dayButton('Thu', weekDates[4])}
		{@render dayButton('Fri', weekDates[5])}
		{@render dayButton('Sat', weekDates[6])}
	</div>
</div>
