<script lang="ts">
	import { Share2 } from '@lucide/svelte';
	import StatItem from './Utilities/StatItem.svelte';
	// import BarChart from '../Common/BarChart.svelte';

	// let months = ['Jan', 'Feb', 'Mar', 'Apr'];
	// let data = [10, 25, 15, 30];
</script>

<div class="rounded-lg border-2 bg-white p-4 pb-20">
	<div class="flex items-start justify-between gap-4">
		<div>
			<p class="font-lexend text-lg font-light">Drink water</p>
		</div>

		<div>
			<button>
				<Share2 size="20px" />
			</button>
		</div>
	</div>

	<div>
		<div class="mt-10 grid grid-cols-3 gap-6">
			<StatItem />
			<StatItem />
			<StatItem />
			<StatItem />
			<StatItem />
			<StatItem />
		</div>
		<!-- <BarChart title="Monthly Sales" xLabels={months} yValues={data} textColor="#000000" /> -->
	</div>
</div>
