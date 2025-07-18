<script lang="ts">
	import DateScroller from './Utilities/DateScroller.svelte';
	import FilterForm from './Utilities/FilterForm.svelte';
	import HabitItem from './Utilities/HabitItem.svelte';
	import HabitSearch from './Utilities/HabitSearch.svelte';
	import MonthlyStats from './MonthlyStats.svelte';
	import YearlyStats from './YearlyStats.svelte';
	import TopSection from '../Common/TopSection.svelte';

	let currentView = $state('monthly');

	const changeView = () => {
		if (currentView === 'monthly') {
			currentView = 'yearly';
		} else if (currentView === 'yearly') {
			currentView = 'monthly';
		}
	};
</script>

<div class="mx-auto w-full max-w-[1000px] pb-64">
	<TopSection />
	<DateScroller />
	<!-- 

	<div class="relative z-30 mt-3 flex items-start gap-6">
		<HabitSearch />
		<FilterForm />
	</div>

	<div class="relative z-10 mt-10 flex items-start gap-4">
		<div class="w-1/2">
			<div class="space-y-4">
				<HabitItem />
				<HabitItem />
			</div>
		</div>

		<div class="w-1/2">
			<div class="bg-whit mb-4 flex rounded-lg border-2 bg-white">
				<div class="w-1/2 rounded-lg">
					<button
						onclick={changeView}
						class:activeView={currentView === 'monthly'}
						class="h-[45px] w-full rounded-lg bg-[#ffffff] text-black"
					>
						Monthly
					</button>
				</div>

				<div class="w-1/2 rounded-lg">
					<button
						onclick={changeView}
						class:activeView={currentView === 'yearly'}
						class="h-[45px] w-full rounded-lg bg-[#ffffff] text-black"
					>
						Yearly
					</button>
				</div>
			</div>

			{#if currentView === 'monthly'}
				<MonthlyStats />
			{/if}
			{#if currentView === 'yearly'}
				<YearlyStats />
			{/if}
		</div>
	</div> -->
</div>

<!-- <style>
	.activeView {
		background-color: #a0c878 !important;
	}
</style> -->
