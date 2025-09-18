<script>
	import { page } from '$app/state';
	import AppLayout from '$lib/components/Common/AppLayout.svelte';
	import LoaderError from '$lib/components/Common/LoaderError.svelte';
	import Seo from '$lib/components/Common/SEO.svelte';
	import EditTracker from '$lib/components/Habit/EditTracker.svelte';
	import { TrackerRequest, UserRequest } from '$lib/requests';
	import { queryKeys } from '$lib/utils/queryKeys';
	import { createQuery } from '@tanstack/svelte-query';

	const userQuery = createQuery({
		queryKey: queryKeys.getCurrentUser,
		queryFn: () => UserRequest.getCurrentUser()
	});

	let user = $derived($userQuery?.data?.data?.user);

	const trackerQuery = createQuery({
		queryKey: queryKeys.getSingleHabit(page.params.id),
		queryFn: () => TrackerRequest.getSingleHabit(page.params.id)
	});

	let tracker = $derived($trackerQuery?.data?.data?.tracker);
</script>

<AppLayout withName={false}>
	<Seo title="Edit tracker" />

	<LoaderError isLoading={$trackerQuery?.isLoading} error={$trackerQuery?.isError} />

	{#if !$trackerQuery?.isLoading && !$trackerQuery?.isError && user?._id}
		<EditTracker {user} {tracker} />
	{/if}
</AppLayout>
