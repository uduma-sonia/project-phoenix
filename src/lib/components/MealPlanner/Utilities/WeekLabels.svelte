<script lang="ts">
	let {} = $props();
</script>

{#snippet dayButton(title: string)}
	<div class="font-lexend h-[140px] border bg-[#cfc4e7] px-1 pt-3 text-center text-sm md:text-base">
		{title}
	</div>
{/snippet}

{#snippet timeOfDay(title: string)}
	<div
		class="flex h-full items-center justify-center border-r border-l bg-[#cfc4e7] px-4 text-center text-sm md:text-base"
	>
		{title}
	</div>
{/snippet}

<div class="absolute top-0 left-0 z-30 h-[40px] w-full">
	<div class="font-lexend grid h-full grid-cols-4 pl-[50px]">
		{@render timeOfDay('Breakfast')}
		{@render timeOfDay('Lunch')}
		{@render timeOfDay('Dinner')}
		{@render timeOfDay('Snacks')}
	</div>
</div>

<div class="absolute top-0 left-0 z-30 h-full w-[50px] pt-[40px]">
	<div>
		{@render dayButton('Sun')}
		{@render dayButton('Mon')}
		{@render dayButton('Tue')}
		{@render dayButton('Wed')}
		{@render dayButton('Thu')}
		{@render dayButton('Fri')}
		{@render dayButton('Sat')}
	</div>
</div>
