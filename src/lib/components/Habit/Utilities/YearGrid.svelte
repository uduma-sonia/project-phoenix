<script lang="ts">
	import { Play } from '@lucide/svelte';
	import { subMonths, addMonths, format, subYears, addYears } from 'date-fns';

	let currentYear = $state(new Date());

	const prevYear = () => {
		currentYear = subYears(currentYear, 1);
	};

	const nextYear = () => {
		currentYear = addYears(currentYear, 1);
	};
</script>

<div>
	<div class="date-picker-header mb-10">
		<button class="shadow_button control_button" onclick={prevYear}>
			<span class="block rotate-180">
				<Play size="18px" />
			</span>
		</button>
		<p>{format(currentYear, 'MMMM yyyy')}</p>
		<button class="shadow_button control_button" onclick={nextYear}>
			<Play size="18px" />
		</button>
	</div>

	<div class="flex gap-3">
		<div>
			<p class="font-lexend text-sm font-light">Jan</p>
		</div>

		<div class="flex flex-1 flex-wrap gap-x-2 gap-y-2">
			{#each [...new Array(30)] as item}
				<div class="h-5 w-5 min-w-5 rounded-sm bg-gray-500"></div>
			{/each}
		</div>
	</div>
</div>

<style>
	.control_button {
		width: fit-content !important;
		height: 35px;
	}

	.date-picker-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 20px;
	}

	.date-picker-header p {
		font-size: 16px;
		font-weight: 500;
	}
</style>
