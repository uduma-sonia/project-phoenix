<script lang="ts">
	import AppLayout from '$lib/components/Common/AppLayout.svelte';
	import { createQuery } from '@tanstack/svelte-query';
	import { tripRequest } from '$lib/requests';
	import { queryKeys } from '$lib/utils/queryKeys';
	import { page } from '$app/state';
	import SEO from '$lib/components/Common/SEO.svelte';
	import LoaderError from '$lib/components/Common/LoaderError.svelte';
	import DeleteTripModal from '$lib/components/Modals/DeleteTripModal.svelte';
	import EditTrip from '$lib/components/Travel/EditTrip.svelte';

	let detailsQuery = createQuery({
		queryKey: queryKeys.getSingleRecipe(page.params.id),
		queryFn: () => tripRequest.getSingleTrip(page.params.id)
	});

	let trip = $derived($detailsQuery?.data?.data?.travel);
</script>

<AppLayout withName={false}>
	<SEO title={trip?.name || 'Travel'} />
	<LoaderError
		isLoading={$detailsQuery?.isLoading}
		error={$detailsQuery?.isError}
		errorText={$detailsQuery?.error?.message}
	/>

	{#if !$detailsQuery?.isLoading && trip}
		<EditTrip {trip} />
	{/if}
</AppLayout>
