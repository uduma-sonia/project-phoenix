<script>
	import CreateTracker from '$lib/components/Habit/CreateTracker.svelte';
	import { queryKeys } from '$lib/utils/queryKeys';
	import { UserRequest } from '$lib/requests';
	import { createQuery } from '@tanstack/svelte-query';
	import AppLayout from '$lib/components/Common/AppLayout.svelte';

	const userQuery = createQuery({
		queryKey: queryKeys.getCurrentUser,
		queryFn: () => UserRequest.getCurrentUser()
	});

	let user = $derived($userQuery?.data?.data?.user);
</script>

<AppLayout withName={false}>
	<CreateTracker {user} />
</AppLayout>
