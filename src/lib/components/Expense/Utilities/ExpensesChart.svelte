<script lang="ts">
	import ChartCard from '$lib/components/Common/ChartCard.svelte';

	let {
		description,
		chartType = 'bar' as any,
		chartLabelArray,
		chartDataset,
		datasetsLabel
	} = $props();
</script>

<ChartCard
	{chartType}
	{chartLabelArray}
	dataset={chartDataset}
	{datasetsLabel}
	helperText={description}
/>
