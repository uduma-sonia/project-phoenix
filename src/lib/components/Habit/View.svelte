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
			<div class="rounded-lg border-2 bg-white p-4">
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
