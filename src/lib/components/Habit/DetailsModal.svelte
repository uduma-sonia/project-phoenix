<script lang="ts">
	import { trackerState } from '$lib/state/tracker.svelte';
	import ModalWrapper from '../Common/ModalWrapper.svelte';
	import MonthlyStats from './MonthlyStats.svelte';
	import ActionCard from './Utilities/ActionCard.svelte';
	import YearlyStats from './YearlyStats.svelte';

	let { onClose, isOpen } = $props();

	let details = $derived(trackerState.data.trackerDetails);
	let currentView = $state('monthly');

	const changeView = () => {
		if (currentView === 'monthly') {
			currentView = 'yearly';
		} else if (currentView === 'yearly') {
			currentView = 'monthly';
		}
	};

	// $effect(() => console.log($state.snapshot(trackerState.data.trackerDetails)));
</script>

<ModalWrapper {onClose} {isOpen} maxWidth="max-w-[1000px]">
	<div class="mb-6 flex items-center gap-2">
		<div>
			{#if details?.icon}
				<img src={details.icon} alt="walk icon" class="h-5" />
			{/if}
		</div>
		<p class="font-lexend text-lg sm:text-xl">{details?.name}</p>
	</div>

	<div class="mb-4 flex flex-col gap-4 sm:flex-row sm:items-center">
		<div class="flex w-full rounded-lg border-2 bg-white sm:w-1/2">
			<div class="w-1/2 rounded-lg">
				<button
					onclick={changeView}
					class:activeView={currentView === 'monthly'}
					class="h-[40px] w-full rounded-lg bg-[#ffffff] text-black"
				>
					Monthly
				</button>
			</div>

			<div class="w-1/2 rounded-lg">
				<button
					onclick={changeView}
					class:activeView={currentView === 'yearly'}
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

	{#if currentView === 'monthly'}
		<MonthlyStats />
	{/if}

	{#if currentView === 'yearly'}
		<YearlyStats />
	{/if}
</ModalWrapper>

<style>
	.activeView {
		background-color: #a0c878 !important;
	}
</style>
