<script>
	import { queryKeys } from '$lib/utils/queryKeys';
	import { UserRequest } from '$lib/requests';
	import { createQuery } from '@tanstack/svelte-query';
	import CreateBoard from '$lib/components/Shopping/CreateBoard.svelte';

	const userQuery = createQuery({
		queryKey: queryKeys.getCurrentUser,
		queryFn: () => UserRequest.getCurrentUser()
	});

	let user = $derived($userQuery?.data?.data?.user);
</script>

<div class="bg-brand-light min-h-screen">
	{#if user?._id}
		<CreateBoard {user} />
	{/if}
</div>
