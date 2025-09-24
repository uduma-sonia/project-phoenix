<script lang="ts">
	import Doughnut from '$lib/components/Common/Doughnut.svelte';
	import { trackerState } from '$lib/state/tracker.svelte';
	import Helpers from '$lib/utils/helpers';
	import TrackerUtils from './utils';

	let { details } = $props();

	let _date = $derived(
		trackerState?.data?.trackerDetails?.logDetails?.updatedAt || details?.startDate
	);
</script>

<div class="relative mt-4 flex h-[200px] items-center justify-center sm:h-[270px]">
	<!-- <div class="absolute top-0 right-0">
		<Doughnut
			percentage={TrackerUtils.getDayProgressPercent()}
			size={20}
			innerBgColor="transparent"
			progressColor={'#db7760'}
		/>
	</div> -->
	<div class="w-full text-center">
		<p class="font-lexend text-4xl font-semibold">
			{TrackerUtils.renderStreakCountdown(TrackerUtils.calculateStreakTime(_date))}

			<small class="text-base font-medium">
				{TrackerUtils.renderStreakCountdownSuffix(TrackerUtils.calculateStreakTime(_date))}
			</small>
		</p>

		<p class="font-lexend text-13 mt-4 font-light">
			Started:

			{#if _date}
				{Helpers.getRelativeDate(_date, 'PP')}
			{/if}
		</p>
	</div>
</div>
