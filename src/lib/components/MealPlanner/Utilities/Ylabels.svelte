<script lang="ts">
	let { weekDates } = $props();
</script>

{#snippet dayButton(title: string, date: Date)}
	<div
		class="font-lexend my-0.5 flex h-[150px] items-center border border-r-0 bg-[#cfc4e7] px-1 text-left text-xs font-light sm:text-sm"
	>
		{title}
	</div>
{/snippet}

<div class="absolute top-0 left-0 z-30 h-full w-[70px] pt-[40px] md:w-[75px]">
	<div>
		{@render dayButton('Breakfast', weekDates[0])}
		{@render dayButton('Lunch', weekDates[1])}
		{@render dayButton('Dinner', weekDates[2])}
		{@render dayButton('Snack', weekDates[3])}
	</div>
</div>
