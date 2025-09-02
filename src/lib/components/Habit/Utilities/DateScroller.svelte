<script lang="ts">
	import { trackerState, updateSelectedDay } from '$lib/state/tracker.svelte';
	import Helpers from '$lib/utils/helpers';
	import { Play } from '@lucide/svelte';
	import { isFuture, isSameDay } from 'date-fns';
	import { onMount } from 'svelte';

	let middle_container: any;
	let daysArray = $state(Helpers.generateScrollableDays(180));

	const handleScrollLeft = () => {
		middle_container.scrollLeft -= 300;
	};
	const handleScrollRight = () => {
		middle_container.scrollLeft += 300;
	};

	onMount(() => {
		setTimeout(() => {
			const todayEl = document.getElementById('today-button');
			todayEl?.scrollIntoView({ behavior: 'instant', inline: 'center' });
		}, 0);
	});
</script>

<div class="my-4 px-3">
	<div class="flex items-center gap-3 overflow-hidden py-1 pr-1">
		<div>
			<button class="shadow_button shadow_button_sm" onclick={handleScrollLeft}>
				<span class="block rotate-180">
					<Play />
				</span>
			</button>
		</div>

		<div
			bind:this={middle_container}
			class="middle_container no-scrollbar flex max-w-[83.5%] flex-1 flex-nowrap items-center gap-3 overflow-x-auto sm:gap-4"
		>
			{#each daysArray as day, index (index)}
				{@const isToday = isSameDay(new Date(day), trackerState.data.selectedDay)}
				{@const _isFuture = isFuture(day)}

				<div class="min-w-[100px] sm:min-w-[120px]">
					<button
						id={isToday ? 'today-button' : undefined}
						class="bg-brand-rose font-lexend button_active flex h-[50px] w-full items-center justify-center gap-1 rounded-lg border-2 border-black text-sm font-normal sm:text-base"
						class:today={isToday}
						disabled={_isFuture}
						class:opacity_05={_isFuture}
						onclick={() => updateSelectedDay(day)}
					>
						{Helpers.getRelativeDate(day)}
					</button>
				</div>
			{/each}
		</div>

		<div>
			<button class="shadow_button shadow_button_sm" onclick={handleScrollRight}>
				<Play />
			</button>
		</div>
	</div>
</div>

<style>
	.opacity_05 {
		opacity: 0.4;
		cursor: not-allowed;
	}
	.middle_container {
		transition: all 0.3s linear;
		scroll-behavior: smooth;
	}

	.today {
		background-color: #c2e08a !important;
	}
</style>
