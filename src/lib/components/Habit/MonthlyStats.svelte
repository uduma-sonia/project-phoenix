<script lang="ts">
	import { Share2 } from '@lucide/svelte';
	import StatItem from './Utilities/StatItem.svelte';
	import Calendar from './Utilities/Calendar.svelte';
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
		<Calendar />

		<div class="mt-6">
			<div class="grid grid-cols-3 gap-6">
				<StatItem />
				<StatItem />
				<StatItem />
				<StatItem />
				<StatItem />
				<StatItem />
			</div>
		</div>
	</div>
</div>
