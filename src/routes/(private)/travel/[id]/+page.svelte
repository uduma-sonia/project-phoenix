<script>
	import AppLayout from '$lib/components/Common/AppLayout.svelte';
	import DetailsView from '$lib/components/Travel/DetailsView.svelte';
	import { createQuery } from '@tanstack/svelte-query';
	import { tripRequest } from '$lib/requests';
	import { queryKeys } from '$lib/utils/queryKeys';
	import { page } from '$app/state';
	import SEO from '$lib/components/Common/SEO.svelte';
	import LoaderError from '$lib/components/Common/LoaderError.svelte';
	import DeleteTripModal from '$lib/components/Modals/DeleteTripModal.svelte';
	import PackingModal from '$lib/components/Modals/PackingModal.svelte';
	import AddActivity from '$lib/components/Travel/Utilities/AddActivity.svelte';

	let detailsQuery = createQuery({
		queryKey: queryKeys.getSingleTrip(page.params.id),
		queryFn: () => tripRequest.getSingleTrip(page.params.id)
	});

	let trip = $derived($detailsQuery?.data?.data?.travel);

	const groupQuery = createQuery({
		queryKey: queryKeys.getTripActivityGroups(page.params.id),
		queryFn: () => tripRequest.getTripActivityGroups(page.params.id)
	});

	let groupList = $derived($groupQuery?.data?.data?.travelGroup);
</script>

<AppLayout withName={false}>
	<SEO title={trip?.name || 'Travel'} />
	<LoaderError
		isLoading={$detailsQuery?.isLoading}
		error={$detailsQuery?.isError}
		errorText={$detailsQuery?.error?.message}
	/>

	{#if !$detailsQuery?.isLoading && trip}
		<DetailsView {trip} />
	{/if}
</AppLayout>

<DeleteTripModal />
<PackingModal />
<AddActivity {groupList} {trip} />
