<script>
	import CreateBoard from '$lib/components/Shopping/CreateBoard.svelte';
	import AppLayout from '$lib/components/Common/AppLayout.svelte';
	import Seo from '$lib/components/Common/SEO.svelte';
	import useCurrentUser from '$lib/hooks/useCurrentUser';

	let userQuery = useCurrentUser();
	let user = $derived($userQuery?.data?.data?.user);
</script>

<AppLayout withName={false}>
	<Seo title="Create shopping board" />
	{#if user?._id}
		<CreateBoard {user} />
	{/if}
</AppLayout>
