<script lang="ts">
	import { TripRequest } from '$lib/requests';
	import { queryKeys } from '$lib/utils/queryKeys';
	import { createQuery } from '@tanstack/svelte-query';
	import HabitSearch from '../Habit/Utilities/HabitSearch.svelte';
	import TravelCard from './Utilities/TravelCard.svelte';
	import LoaderError from '../Common/LoaderError.svelte';
	import { openPackingModal } from '$lib/state/modal.svelte';
	import EmptyState from '../Common/EmptyState.svelte';
	import { onMount } from 'svelte';

	let searchQuery = $state('');

	let tripQuery = createQuery({
		queryKey: queryKeys.getTrip,
		queryFn: () => TripRequest.getTrips()
	});

	let tripsList = $derived($tripQuery?.data?.data?.travel);

	let filteredTripsList = $derived(
		tripsList?.filter((item: any) => item.name.toUpperCase().includes(searchQuery?.toUpperCase()))
	);
	let isLoading = $derived($tripQuery?.isLoading);
	let isError = $derived($tripQuery?.isError);
	let hasTrips = $derived((filteredTripsList ?? []).length > 0);

	let hasMount = $state(false);

	onMount(() => {
		hasMount = true;
	});
</script>

<div class="pb-24">
	<p class="font-lexend mb-4 px-3 text-xs font-normal text-wrap">
		Plan your next trip, day-by-day schedule, group planning, budget
	</p>

	<div class="flex items-center justify-between gap-4 px-3">
		<HabitSearch bind:searchQuery placeholder="Search trips" />

		<div>
			<button class="shadow_button" onclick={openPackingModal}> Packing list </button>
		</div>
	</div>

	<LoaderError {isLoading} error={isError} />

	{#if !isLoading && !isError}
		{#if hasTrips}
			<div class="mt-14 grid grid-cols-2 gap-3 px-3 sm:grid-cols-3 sm:gap-6 md:grid-cols-4">
				{#if !$tripQuery?.isLoading && filteredTripsList?.length > 0}
					{#each filteredTripsList as trip, index (index)}
						<TravelCard {trip} />
					{/each}
				{/if}
			</div>
		{:else if !isError}
			{#if hasMount}
				<EmptyState
					buttonText="Plan Trip"
					heading="No trips planned"
					text="Plan your next trip. Create a trip and pack like a pro"
					link="/travel/create"
				/>
			{:else}
				<LoaderError isLoading={true} />
			{/if}
		{/if}
	{/if}
</div>
