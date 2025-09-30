<script lang="ts">
	import { page } from '$app/state';
	import AppLayout from '$lib/components/Common/AppLayout.svelte';
	import DeleteBoardModal from '$lib/components/Modals/DeleteBoardModal.svelte';
	import DetailsView from '$lib/components/Shopping/DetailsView.svelte';
	import { shoppingRequest, UserRequest } from '$lib/requests';
	import { queryKeys } from '$lib/utils/queryKeys';
	import { createQuery } from '@tanstack/svelte-query';

	let boardId = page.params.id;

	let boardItemsQuery = createQuery({
		queryKey: queryKeys.getBoardItems(boardId, ''),
		queryFn: () => shoppingRequest.getBoardItems(boardId, '')
	});

	let userQuery = createQuery({
		queryKey: queryKeys.getCurrentUser,
		queryFn: () => UserRequest.getCurrentUser()
	});

	let boardQuery = createQuery({
		queryKey: queryKeys.getBoard(boardId),
		queryFn: () => shoppingRequest.getBoard(boardId)
	});

	let standardItemsQuery = createQuery({
		queryKey: queryKeys.getStandardItems,
		queryFn: () => shoppingRequest.getStandardItems('')
	});

	let user = $derived($userQuery?.data?.data?.user);
</script>

<AppLayout withName={false}>
	<DetailsView {boardItemsQuery} {boardQuery} {user} {standardItemsQuery} />
</AppLayout>

<DeleteBoardModal />
