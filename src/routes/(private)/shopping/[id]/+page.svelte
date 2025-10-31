<script lang="ts">
	import { page } from '$app/state';
	import AppLayout from '$lib/components/Common/AppLayout.svelte';
	import DeleteBoardModal from '$lib/components/Modals/DeleteBoardModal.svelte';
	import DetailsView from '$lib/components/Shopping/DetailsView.svelte';
	import useCurrentUser from '$lib/hooks/useCurrentUser';
	import { ShoppingRequest } from '$lib/requests';
	import { queryKeys } from '$lib/utils/queryKeys';
	import { createQuery } from '@tanstack/svelte-query';

	let boardId = page.params.id;

	let userQuery = useCurrentUser();

	let boardItemsQuery = createQuery({
		queryKey: queryKeys.getBoardItems(boardId, ''),
		queryFn: () => ShoppingRequest.getBoardItems(boardId, '')
	});

	let boardQuery = createQuery({
		queryKey: queryKeys.getBoard(boardId),
		queryFn: () => ShoppingRequest.getBoard(boardId)
	});

	let standardItemsQuery = createQuery({
		queryKey: queryKeys.getStandardItems,
		queryFn: () => ShoppingRequest.getStandardItems('')
	});
	let user = $derived($userQuery?.data?.data?.user);
</script>

<AppLayout withName={false}>
	<DetailsView {boardItemsQuery} {boardQuery} {user} {standardItemsQuery} />
</AppLayout>

<DeleteBoardModal />
