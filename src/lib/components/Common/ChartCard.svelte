<script lang="ts">
	import Helpers from '$lib/utils/helpers';
	import { ChartNoAxesCombined } from '@lucide/svelte';
	import Chart from 'chart.js/auto';

	let {
		chartLabelArray,
		dataset,
		datasetsLabel,
		chartType,
		helperText,
		bgClass = 'bg-primary-plum-400'
	}: {
		chartLabelArray: string[];
		dataset: number[];
		datasetsLabel: string;
		bgClass?: string;
		helperText?: any;
		chartType: 'bar' | 'line' | 'scatter' | 'bubble' | 'pie' | 'doughnut' | 'polarArea' | 'radar';
	} = $props();

	function createChart(node: any) {
		const config = Helpers.getChartConfig(chartType, chartLabelArray, datasetsLabel, dataset);
		const chart = new Chart(node, config);

		return {
			destroy() {
				chart.destroy();
			}
		};
	}

	$effect(() => console.log('dataset', dataset));
</script>

<div class="mb-4">
	{#if datasetsLabel}
		<p class="font-suez border-l-3 px-2 text-lg font-medium md:text-xl">{datasetsLabel}</p>
	{/if}
	{#if helperText}
		<p class="font-lexend text-13 font-light">
			{@html helperText}
		</p>
	{/if}
</div>

{#if dataset?.length}
	{#if chartType === 'pie'}
		<div class="h-[400px] md:h-[500px]">
			<div class="z-10 h-full w-full">
				<div class="h-full flex-1 px-2 py-4">
					<canvas use:createChart></canvas>
				</div>
			</div>
		</div>
	{:else}
		<div class="wrapper_8uef h-[400px] md:h-[500px]">
			<div class="{bgClass} relative z-10 h-full w-full rounded-[18px] border-2 border-black">
				<div class="h-full flex-1 px-2 py-4">
					<canvas use:createChart></canvas>
				</div>
			</div>
		</div>
	{/if}
{:else}
	<div class="flex flex-col items-center justify-center py-10">
		<ChartNoAxesCombined size="40" />
		<p class="font-lexend text-13 mt-6 text-center font-light">No analytics data yet</p>
	</div>
{/if}

<style>
	.wrapper_8uef {
		position: relative;
		border-radius: 18px;
		transition: all 0.4s linear;
	}

	.wrapper_8uef::after {
		content: '';
		position: absolute;
		top: 5px;
		left: 5px;
		right: 0;
		bottom: 0;
		border: 2px solid black;
		z-index: 1;
		border-radius: 18px;
		width: 100%;
		height: 100%;
	}

	.wrapper_8uef::before {
		content: '';
		position: absolute;
		top: 5px;
		left: 5px;
		right: 0;
		bottom: 0;
		border: 2px solid black;
		z-index: 1;
		border-radius: 18px;
		width: 100%;
		height: 100%;
	}
</style>
