<script lang="ts">
	import {
		Chart,
		BarController,
		BarElement,
		PointElement,
		LinearScale,
		CategoryScale,
		Tooltip,
		Title,
		Legend,
		Filler
	} from 'chart.js';
	import Helpers from '$lib/utils/helpers';
	import ExpenseUtils from './utils';

	Chart.register(
		BarController,
		BarElement,
		PointElement,
		LinearScale,
		CategoryScale,
		Tooltip,
		Filler,
		Title,
		Legend
	);

	let { transactions, type, description, title } = $props();

	let canvas: any = $state();
	let chart: Chart | any = $state();

	$effect(() => {
		const data = ExpenseUtils.getExpenseBarData(transactions, type);

		chart = new Chart(canvas, {
			type: 'bar',
			data: {
				labels: data.map((d) => d.category),
				datasets: [
					{
						label: title,
						data: data.map((d) => d.amount),
						backgroundColor: '#ff9a9a90',
						borderWidth: 1,
						borderColor: '#000000',
						borderRadius: 8
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
	<p class="text-lg font-medium md:text-xl">{title}</p>

	<p class="font-lexend text-13 font-light">
		{description}
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
