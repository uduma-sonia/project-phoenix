<script>
	import CreateTracker from '$lib/components/Habit/CreateTracker.svelte';
	import { queryKeys } from '$lib/utils/queryKeys';
	import { UserRequest } from '$lib/requests';
	import { createQuery } from '@tanstack/svelte-query';

	const userQuery = createQuery({
		queryKey: queryKeys.getCurrentUser,
		queryFn: () => UserRequest.getCurrentUser()
	});

	let user = $derived($userQuery?.data?.data?.user);
</script>

<div class="bg-brand-light min-h-screen">
	<CreateTracker {user} />
</div>
