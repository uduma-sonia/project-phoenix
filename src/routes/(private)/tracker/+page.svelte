<script>
	import AppLayout from '$lib/components/Common/AppLayout.svelte';
	import Seo from '$lib/components/Common/SEO.svelte';
	import View from '$lib/components/Habit/View.svelte';
	import { UserRequest } from '$lib/requests';
	import { queryKeys } from '$lib/utils/queryKeys';
	import { createQuery } from '@tanstack/svelte-query';

	const userQuery = createQuery({
		queryKey: queryKeys.getCurrentUser,
		queryFn: () => UserRequest.getCurrentUser()
	});

	let user = $derived($userQuery?.data?.data?.user);
</script>

<AppLayout floatingLink="/tracker/create" tooltipText="Create Tracker">
	<Seo title="Tracker" />
	<View {user} />
</AppLayout>

<!-- <BarChart title="Bar" xLabels={['mon', 'tue', 'wed']} yValues={[1, 2, 3, 4]} textColor="red" /> -->
