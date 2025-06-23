<script lang="ts">
	import { Share2 } from '@lucide/svelte';
	import NameCard from '../Common/NameCard.svelte';
	import NavBar from '../Common/NavBar.svelte';
	import DateScroller from './Utilities/DateScroller.svelte';
	import FilterForm from './Utilities/FilterForm.svelte';
	import HabitItem from './Utilities/HabitItem.svelte';
	import HabitSearch from './Utilities/HabitSearch.svelte';
	import Calendar from './Utilities/Calendar.svelte';
	import Stats from './Stats.svelte';

	let currentView = $state('monthly');

	const changeView = () => {
		if (currentView === 'monthly') {
			currentView = 'yearly';
		} else if (currentView === 'yearly') {
			currentView = 'monthly';
		}
	};
</script>

<div class="mx-auto w-full max-w-[1000px] pb-14">
	<NavBar />
	<NameCard />
	<DateScroller />
	<div class="mt-3 flex items-start gap-6">
		<HabitSearch />
		<FilterForm />
	</div>

	<div class="mt-10 flex items-start gap-4">
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
						<Stats />
					</div>
				</div>
			</div>
		</div>
	</div>
</div>

<style>
	.activeView {
		background-color: #a0c878 !important;
	}
</style>
