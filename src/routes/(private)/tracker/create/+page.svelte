<script>
	import CreateTracker from '$lib/components/Habit/CreateTracker.svelte';
	import AppLayout from '$lib/components/Common/AppLayout.svelte';
	import Seo from '$lib/components/Common/SEO.svelte';
	import useCurrentUser from '$lib/hooks/useCurrentUser';

	let userQuery = useCurrentUser();
	let user = $derived($userQuery?.data?.data?.user);
</script>

<AppLayout withName={false}>
	<Seo title="Create Tracker" />
	<CreateTracker {user} />
</AppLayout>
