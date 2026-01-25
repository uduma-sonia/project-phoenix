<script lang="ts">
	import { page } from '$app/state';
	import AppLayout from '$lib/components/Common/AppLayout.svelte';
	import DeleteBoardModal from '$lib/components/Modals/DeleteBoardModal.svelte';
	import DetailsView from '$lib/components/Shopping/DetailsView.svelte';
	import fetchBoardMembers from '$lib/hooks/fetchBoardMembers';
	import useCurrentUser from '$lib/hooks/useCurrentUser';
	import { ShoppingRequest } from '$lib/requests';
	import Helpers from '$lib/utils/helpers';
	import { queryKeys } from '$lib/utils/queryKeys';
	import { createQuery } from '@tanstack/svelte-query';

	let boardId = page.params.id;

	let userQuery = useCurrentUser();

	let boardQuery = createQuery({
		queryKey: queryKeys.getBoard(boardId),
		queryFn: () => ShoppingRequest.getBoard(boardId)
	});
	let membersQuery = fetchBoardMembers(boardId);

	let standardItemsQuery = createQuery({
		queryKey: queryKeys.getStandardItems,
		queryFn: () => ShoppingRequest.getStandardItems('')
	});

	let user = $derived($userQuery?.data?.data?.user);
	let boardDetails = $derived($boardQuery?.data?.data?.board);

	let _permission = $derived(
		Helpers.getPermission($membersQuery?.data?.data?.members?.members, user, boardDetails?.ownerId)
	);
</script>

<AppLayout withName={false}>
	<DetailsView {boardQuery} {user} {standardItemsQuery} {_permission} />
</AppLayout>

<DeleteBoardModal />
