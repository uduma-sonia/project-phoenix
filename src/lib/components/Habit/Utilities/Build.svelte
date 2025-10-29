<script lang="ts">
	import { trackerState } from '$lib/state/tracker.svelte';
	import MonthlyStats from '../MonthlyStats.svelte';
	import YearlyStats from '../YearlyStats.svelte';
	import ActionCard from './ActionCard.svelte';

	let currentView = $state('monthly');

	const changeView = () => {
		if (currentView === 'monthly') {
			currentView = 'yearly';
		} else if (currentView === 'yearly') {
			currentView = 'monthly';
		}
	};
</script>

<div class="flex flex-col gap-4 px-4 pb-0 sm:flex-row sm:items-center">
	<div class="flex w-full rounded-lg border-2 bg-white sm:w-1/2">
		<div class="w-1/2 rounded-lg">
			<button
				onclick={changeView}
				class:bg-brand-build={currentView === 'monthly' &&
					trackerState?.data?.trackerDetails?.type == 'BUILD'}
				class="h-[40px] w-full rounded-lg bg-[#ffffff] text-black"
			>
				Monthly
			</button>
		</div>

		<div class="w-1/2 rounded-lg">
			<button
				onclick={changeView}
				class:bg-brand-build={currentView === 'yearly' &&
					trackerState?.data?.trackerDetails?.type == 'BUILD'}
				class="h-[40px] w-full rounded-lg bg-[#ffffff] text-black"
			>
				Yearly
			</button>
		</div>
	</div>

	<div class="w-full sm:w-1/2">
		<ActionCard />
	</div>
</div>

<div class="p-4">
	{#if currentView === 'monthly'}
		<MonthlyStats details={trackerState?.data?.trackerDetails} />
	{/if}

	{#if currentView === 'yearly'}
		<YearlyStats details={trackerState?.data?.trackerDetails} />
	{/if}
</div>
