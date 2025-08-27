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
</script>

<ModalWrapper {onClose} {isOpen} maxWidth="max-w-[1000px]" label={details?.name} height="90vh">
	<div class="flex flex-col gap-4 p-4 sm:flex-row sm:items-center">
		<div class="flex w-full rounded-lg border-2 bg-white sm:w-1/2">
			<div class="w-1/2 rounded-lg">
				<button
					onclick={changeView}
					class:bg-brand-build={currentView === 'monthly' &&
						trackerState?.data?.trackerDetails?.type == 'BUILD'}
					class:bg-brand-quit={currentView === 'monthly' &&
						trackerState?.data?.trackerDetails?.type == 'QUIT'}
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
					class:bg-brand-quit={currentView === 'yearly' &&
						trackerState?.data?.trackerDetails?.type == 'QUIT'}
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
			<YearlyStats />
		{/if}
	</div>
</ModalWrapper>
