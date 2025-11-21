<script lang="ts">
</script>

{#snippet dayButton(title: string)}
	<div class="font-lexend h-[140px] border bg-[#cfc4e7] px-1 pt-3 text-center text-sm md:text-base">
		{title}
	</div>
{/snippet}

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
