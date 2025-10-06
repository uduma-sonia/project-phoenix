<script lang="ts">
	import { tripRequest } from '$lib/requests';
	import { queryKeys } from '$lib/utils/queryKeys';
	import { createQuery } from '@tanstack/svelte-query';
	import HabitSearch from '../Habit/Utilities/HabitSearch.svelte';
	import TravelCard from './Utilities/TravelCard.svelte';
	import LoaderError from '../Common/LoaderError.svelte';
	import { openPackingModal } from '$lib/state/modal.svelte';
	import EmptyState from '../Common/EmptyState.svelte';

	let searchQuery = $state('');

	let tripQuery = createQuery({
		queryKey: queryKeys.getTrip,
		queryFn: () => tripRequest.getTrips()
	});

	let tripsList = $derived($tripQuery?.data?.data?.travel);

	let filteredTripsList = $derived(
		tripsList?.filter((item: any) => item.name.toUpperCase().includes(searchQuery?.toUpperCase()))
	);
</script>

<div class="pt-5 pb-24">
	<div class="flex items-center justify-between gap-4 px-3">
		<HabitSearch bind:searchQuery placeholder="Search trips" />

		<div>
			<button class="shadow_button" onclick={openPackingModal}> Packing list </button>
		</div>
	</div>

	<LoaderError isLoading={$tripQuery?.isLoading} error={$tripQuery?.isError} />

	{#if !$tripQuery?.isLoading}
		{#if filteredTripsList?.length > 0}
			<div class="mt-14 grid grid-cols-2 gap-3 px-3 sm:grid-cols-3 sm:gap-6 md:grid-cols-4">
				{#if !$tripQuery?.isLoading && filteredTripsList?.length > 0}
					{#each filteredTripsList as trip, index (index)}
						<TravelCard {trip} />
					{/each}
				{/if}
			</div>
		{:else}
			<EmptyState
				buttonText="Plan Trip"
				heading="No trips planned"
				text="Plan your next trip. Create a trip and pack like a pro"
				link="/travel/create"
			/>
		{/if}
	{/if}
</div>
