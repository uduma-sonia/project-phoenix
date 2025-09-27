<script lang="ts">
	import AppLayout from '$lib/components/Common/AppLayout.svelte';
	import DeleteRecipeModal from '$lib/components/Modals/DeleteRecipeModal.svelte';
	import DetailsView from '$lib/components/Recipe/DetailsView.svelte';
	import { AUTH_TOKEN } from '$lib/constants/global';
	import useCurrentUser from '$lib/hooks/useCurrentUser';
	import Helpers from '$lib/utils/helpers';

	const token = $derived(Helpers.getCookie(AUTH_TOKEN));

	let userQuery = $derived(useCurrentUser(Boolean(token)));
	let user = $derived($userQuery?.data?.data?.user);
</script>

<AppLayout withName={false}>
	<DetailsView {user} isLoggedIn={Boolean(token)} />
</AppLayout>

<DeleteRecipeModal label="Recipe" />
