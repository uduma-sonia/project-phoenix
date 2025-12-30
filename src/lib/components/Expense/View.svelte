<script lang="ts">
	// import { TripRequest } from '$lib/requests';
	// import { queryKeys } from '$lib/utils/queryKeys';
	// import { createQuery } from '@tanstack/svelte-query';
	// import HabitSearch from '../Habit/Utilities/HabitSearch.svelte';
	// import TravelCard from './Utilities/TravelCard.svelte';
	// import LoaderError from '../Common/LoaderError.svelte';
	// import { openPackingModal } from '$lib/state/modal.svelte';
	// import EmptyState from '../Common/EmptyState.svelte';
	// import { onMount } from 'svelte';

	// let searchQuery = $state('');

	// let tripQuery = createQuery({
	// 	queryKey: queryKeys.getTrip,
	// 	queryFn: () => TripRequest.getTrips()
	// });

	// let tripsList = $derived($tripQuery?.data?.data?.travel);

	// let filteredTripsList = $derived(
	// 	tripsList?.filter((item: any) => item.name.toUpperCase().includes(searchQuery?.toUpperCase()))
	// );
	// let isLoading = $derived($tripQuery?.isLoading);
	// let isError = $derived($tripQuery?.isError);
	// let hasTrips = $derived((filteredTripsList ?? []).length > 0);

	// let hasMount = $state(false);

	// onMount(() => {
	// 	hasMount = true;
	// });
</script>

<div class="pb-24">
	<p class="font-lexend mb-4 px-3 text-xs font-normal text-wrap">Transactions</p>
</div>
