<script lang="ts">
	import ChartCard from '$lib/components/Common/ChartCard.svelte';

	let {
		chartData,
		description,
		title,
		bgClass = 'bg-primary-biloba-400',
		chartType = 'bar' as any
	} = $props();

	const chartLabel = $derived(chartData?.map((item: any) => item.category));
	const chartDataset = $derived(chartData?.map((item: any) => item.amount));
</script>

<ChartCard
	{chartType}
	chartLabelArray={chartLabel}
	dataset={chartDataset}
	datasetsLabel={title}
	helperText={description}
	{bgClass}
/>
