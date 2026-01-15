<script lang="ts">
	import {
		Chart,
		LineController,
		LineElement,
		PointElement,
		LinearScale,
		CategoryScale,
		Tooltip,
		Title,
		Legend,
		Filler
	} from 'chart.js';
	import { format } from 'date-fns';
	import Helpers from '$lib/utils/helpers';

	Chart.register(
		LineController,
		LineElement,
		PointElement,
		LinearScale,
		CategoryScale,
		Tooltip,
		Filler,
		Title,
		Legend
	);

	let { chartData } = $props();

	let canvas: any = $state();
	let chart: Chart | undefined = $state();

	$effect(() => {
		chart = new Chart(canvas, {
			type: 'line',
			data: {
				labels: chartData?.map((d: { date: string }) => format(new Date(d.date), 'MMM d')),
				datasets: [
					{
						label: 'Daily trend',
						data: chartData?.map((d: { amount: number }) => d.amount),
						backgroundColor: '#1eb564',
						borderWidth: 1,
						borderColor: '#1eb564',
						tension: 0.12
					}
				]
			},
			options: {
				responsive: true,
				maintainAspectRatio: false,
				scales: {
					x: {
						grid: { display: false }
					},
					y: {
						beginAtZero: true,
						ticks: {
							callback: (value) => `${Helpers.convertNumber(Number(value))}`
						}
					}
				}
			}
		});

		return () => chart?.destroy();
	});
</script>

<div class="mb-4">
	<p class="text-lg font-medium md:text-xl">Daily Spending Trend</p>
	<p class="font-lexend text-13 font-light">
		Shows how much you spend each day and helps you spot spending patterns over time
	</p>
</div>

<div class="retro_wrapper">
	<div class="retro_wrapper_inner_ejf">
		<div class="chart-wrapper">
			<canvas bind:this={canvas}></canvas>
		</div>
	</div>
</div>

<style>
	.chart-wrapper {
		height: 400px;
	}
	.retro_wrapper_inner_ejf {
		position: relative;
		z-index: 10;
		width: 100%;
		border-radius: 8px;
		border: 2px solid black;
		background-color: #fff;
		padding: 16px;
	}
</style>
