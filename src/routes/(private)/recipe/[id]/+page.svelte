<script lang="ts">
	import AppLayout from '$lib/components/Common/AppLayout.svelte';
	import DeleteModal from '$lib/components/Modals/DeleteModal.svelte';
	import DetailsView from '$lib/components/Recipe/DetailsView.svelte';
	import { AUTH_TOKEN } from '$lib/constants/global';
	import useCurrentUser from '$lib/hooks/useCurrentUser';
	import Helpers from '$lib/utils/helpers';

	const token = $derived(Helpers.getCookie(AUTH_TOKEN));

	let userQuery = $derived(useCurrentUser(Boolean(token)));
	let user = $derived($userQuery?.data?.data?.user);
</script>

<AppLayout withName={false}>
	<DetailsView {user} />
</AppLayout>

<DeleteModal label="Recipe" />
