<script>
	import { onMount } from 'svelte';
	import {
		Chart,
		LineController,
		LineElement,
		PointElement,
		LinearScale,
		CategoryScale,
		Tooltip,
		Filler
	} from 'chart.js';
	import ExpenseUtils from '../Expense/Utilities/utils';

	Chart.register(
		LineController,
		LineElement,
		PointElement,
		LinearScale,
		CategoryScale,
		Tooltip,
		Filler
	);

	let { transactions } = $props();

	let canvas = $state();
	let chart = $state();

	onMount(() => {
		const data = ExpenseUtils.getDailyExpenseLineData(transactions);

		chart = new Chart(canvas, {
			type: 'line',
			data: {
				labels: data.map((d) => d.date),
				datasets: [
					{
						label: 'Daily Spending',
						data: data.map((d) => d.amount),
						borderColor: '#4f46e5',
						backgroundColor: 'rgba(79,70,229,0.2)',
						tension: 0.3,
						fill: true,
						pointRadius: 4
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
							callback: (value) => `₦${value.toLocaleString()}`
						}
					}
				}
			}
		});

		return () => chart?.destroy();
	});
</script>

<div class="chart-wrapper">
	<canvas bind:this={canvas}></canvas>
</div>

<style>
	.chart-wrapper {
		height: 300px;
	}
</style>
