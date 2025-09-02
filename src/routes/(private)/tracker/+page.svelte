<script>
	import View from '$lib/components/Habit/View.svelte';
	import { UserRequest } from '$lib/requests';
	import { queryKeys } from '$lib/utils/queryKeys';
	import { createQuery } from '@tanstack/svelte-query';

	const userQuery = createQuery({
		queryKey: queryKeys.getCurrentUser,
		queryFn: () => UserRequest.getCurrentUser()
	});

	let user = $derived($userQuery?.data?.data?.user);

	let innerHeight = $state(typeof window !== 'undefined' ? window.innerHeight : 0);

	if (typeof window !== 'undefined') {
		window.addEventListener('resize', () => {
			innerHeight = window.innerHeight;
		});
	}
</script>

<div class="bg-brand-light" style="min-height: {innerHeight}px;">
	<View {user} />
</div>
