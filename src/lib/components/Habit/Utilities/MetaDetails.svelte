<script lang="ts">
	import { format } from 'date-fns';

	let { details } = $props();
</script>

<div class="mt-8">
	<div class="mb-4">
		{#if details?.startDate}
			<p class="font-lexend text-sm font-light">
				Start date: {format(new Date(details?.startDate), 'PP')}
			</p>
		{/if}

		{#if details?.isIndefinite}
			<p class="font-lexend text-sm font-light">No end date</p>
		{:else}
			<p class="font-lexend text-sm font-light">
				End date: {format(new Date(details?.startDate), 'PP')}
			</p>
		{/if}
	</div>

	<p class="font-lexend text-sm font-light">
		{details.description}
	</p>
</div>
