<script lang="ts">
	import DateScroller from './Utilities/DateScroller.svelte';
	import FilterForm from './Utilities/FilterForm.svelte';
	import HabitItem from './Utilities/HabitItem.svelte';
	import HabitSearch from './Utilities/HabitSearch.svelte';
	import MonthlyStats from './MonthlyStats.svelte';
	import YearlyStats from './YearlyStats.svelte';
	import TopSection from '../Common/TopSection.svelte';
	import { Plus } from '@lucide/svelte';
	import { TrackerRequest } from '$lib/requests';
	import { addToast } from '$lib/store/toast';
	import { useQueryClient } from '@tanstack/svelte-query';
	import { queryKeys } from '$lib/utils/queryKeys';

	let { trackersList } = $props();
	const queryClient = useQueryClient();

	let currentView = $state('monthly');
	let isDeleting = $state(false);

	const changeView = () => {
		if (currentView === 'monthly') {
			currentView = 'yearly';
		} else if (currentView === 'yearly') {
			currentView = 'monthly';
		}
	};

	async function deleteHabit(id: string) {
		try {
			isDeleting = true;

			const result = await TrackerRequest.deleteHabit(id);
			queryClient.invalidateQueries({ queryKey: queryKeys.getAllHabits });
		} catch (error: any) {
			addToast(error?.message, 'error');
		} finally {
			isDeleting = false;
		}
	}
</script>

<div class="mx-auto w-full max-w-[1000px] overflow-x-hidden pb-64">
	<TopSection />
	<DateScroller />

	<div class="flex items-center justify-between">
		<div class="relative z-30 mt-3 flex items-start gap-3 px-3 sm:gap-6">
			<div>
				<HabitSearch />
			</div>
			<div>
				<FilterForm />
			</div>
		</div>

		<div class="pr-4">
			<a href="/tracker/create" class="block">
				<button class="shadow_button shadow_button_thin shadow_button_with_icon">
					<Plus /> Create
				</button>
			</a>
		</div>
	</div>

	<div class="relative z-10 mt-10 items-start gap-4 px-3 sm:flex">
		<div class="sm:w-1/2">
			<div class="space-y-6">
				{#each trackersList as habit, index (index)}
					<HabitItem {habit} deleteHabit={() => deleteHabit(habit._id)} />
				{/each}
			</div>
		</div>

		<div class="hidden w-1/2 sm:block">
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
	</div>
</div>

<!-- <style>
	.activeView {
		background-color: #a0c878 !important;
	}
</style> -->
