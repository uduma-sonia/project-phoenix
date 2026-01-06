<script lang="ts">
	import BarChart from '$lib/components/Common/BarChart.svelte';
	import ExpenseUtils from './utils';

	import { Chart, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';
	// import { Line } from 'svelte-chartjs';
	// import { Chart } from 'chart.js/auto';

	// Chart.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

	let { txnList } = $props();

	// let data = {
	// 	labels: ['_label', '_label', '_label', '_label', '_label'],
	// 	datasets: [
	// 		{
	// 			label: 'User Signups',
	// 			data: {
	// 				label: 'd',
	// 				dataset: [1, 2, 3],
	// 				total: 15
	// 			},
	// 			backgroundColor: '#000000',
	// 			borderWidth: 2,
	// 			borderColor: '#000000'
	// 		}
	// 	]
	// };

	const options = {
		maintainAspectRatio: false,
		plugins: {
			legend: {
				display: false
			}
		},
		scales: {
			y: {
				beginAtZero: true,
				grid: {
					display: true,
					drawBorder: false
				}
			},
			x: {
				grid: {
					display: false,
					drawBorder: false
				}
			}
		}
	};

	const DATA_COUNT = 7;
	const NUMBER_CFG = { count: DATA_COUNT, min: -100, max: 100 };

	// const labels = Utils.months({count: 7});
	const data = {
		labels: ['jan'],
		datasets: [
			{
				label: 'Dataset 1',
				data: [1, 2, 3],
				borderColor: 'red'
				//   backgroundColor: Utils.transparentize(Utils.CHART_COLORS.red, 0.5),
			}
		]
	};

	$effect(() => console.log(ExpenseUtils.getDailyExpenseLineData(txnList)));
</script>

<div class="mb-4 flex items-center justify-between gap-4">
	<p class="text-lg font-medium md:text-xl">Daily Spending Trend</p>
</div>

<div>
	<!-- <BarChart/> -->
	<BarChart title="Bar" xLabels={['mon', 'tue', 'wed']} yValues={[1, 2, 3, 4]} textColor="red" />

	<!-- chart -->
	<!-- <Bar {options} {data} /> -->
	<!-- data={{
			labels: ['_label', '_label', '_label', '_label', '_label'],
			datasets: [
				{
					label: 's',
                    data: {
                        
                    }
				}
			]
		}} -->
</div>
