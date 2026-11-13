<script lang="ts">
	import Helpers from '$lib/utils/helpers';
	import { format, isSameDay } from 'date-fns';
	import { onMount } from 'svelte';

	let { currentMonth, updateSelectedDay, currentDay } = $props();

	let daysArray = $derived(Helpers.generateDaysOfMonth(new Date(currentMonth)));

	onMount(() => {
		setTimeout(() => {
			const middle_container = document.getElementById('middle_container');
			const todayEl = middle_container?.querySelector('#today-button');
			todayEl?.scrollIntoView({ behavior: 'smooth', inline: 'start' });
		}, 0);
	});
</script>

<div class="px-3">
	<div class="mt-6 rounded-2xl border-2 bg-white p-4">
		<p class="font-suez inline-block text-base font-medium md:text-lg">
			{format(currentMonth, 'MMMM')}
		</p>

		<div
			id="middle_container"
			class="middle_container no-scrollbar mt-2 flex flex-nowrap items-center gap-3 overflow-x-auto py-2 sm:gap-4"
		>
			{#each daysArray as day (day)}
				{@const isToday = isSameDay(new Date(day), new Date(currentDay))}

				<div>
					<button
						id={isToday ? 'today-button' : null}
						class="font-lexend days_btn flex h-[66px] w-12 flex-col items-center justify-center gap-0.5 rounded-xl border-2 border-black text-sm font-normal sm:text-base"
						class:today={isToday}
						onclick={() => updateSelectedDay(day)}
					>
						<span class="font-semibold">
							{format(day, 'iii')}
						</span>
						<span class="text-13">
							{format(day, 'dd')}
						</span>
					</button>
				</div>
			{/each}
		</div>
	</div>
</div>

<style>
	.middle_container {
		transition: all 0.3s linear;
		scroll-behavior: smooth;
	}

	.today {
		background-color: #c2e08a !important;
		box-shadow:
			2px 2px 0 black,
			2px 2px 0 black,
			2px 2px 0 black;
	}

	.days_btn:hover {
		box-shadow:
			2px 2px 0 black,
			2px 2px 0 black,
			2px 2px 0 black;
	}
</style>
