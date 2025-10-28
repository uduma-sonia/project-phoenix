<script lang="ts">
	import { format } from 'date-fns';

	let { text, date } = $props();

	let _date = date && format(new Date(date).toDateString(), 'P');
</script>

<div class="flex items-center gap-2">
	<div>
		<div class="h-3 w-3 bg-black"></div>
	</div>

	<div class="flex-1">
		<p class="font-lexend-deca text-sm font-light">
			{text}

			{#if date}
				<small class="opacity-80"> - {_date}</small>
			{/if}
		</p>
	</div>
</div>
