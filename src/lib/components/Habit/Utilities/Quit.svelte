<script lang="ts">
	import { trackerState } from '$lib/state/tracker.svelte';
	import HistoryItem from './HistoryItem.svelte';
	import StreakCard from './StreakCard.svelte';
	import { TrackerRequest } from '$lib/requests';
	import { queryKeys } from '$lib/utils/queryKeys';
	import { createQuery } from '@tanstack/svelte-query';

	let { details } = $props();

	let historyQuery = $derived(
		createQuery({
			queryKey: queryKeys.getTrackerHistory(trackerState.data.trackerDetails?._id as string),
			queryFn: () =>
				TrackerRequest.getTrackerHistory(trackerState.data.trackerDetails?._id as string)
		})
	);

	$effect(() => console.log($historyQuery?.data?.data));
</script>

<div class="rounded-lg bg-white px-4 pb-20">
	<div class="flex flex-col gap-4 sm:flex-row">
		<div class="w-full rounded-xl border-2 px-4 pb-4 sm:w-1/2">
			<StreakCard {details} />
		</div>

		<div class="w-full rounded-xl sm:w-1/2">
			<div class="">
				<h3 class="mb-4 text-lg">History</h3>

				<div class="space-y-3">
					<HistoryItem text="Last streak was 5 days" />
					<HistoryItem text="You stopped this streak" />
					<HistoryItem text="You started this streak for the first time" />
				</div>
			</div>
		</div>
	</div>
</div>
