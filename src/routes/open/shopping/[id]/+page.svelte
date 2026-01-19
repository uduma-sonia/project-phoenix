<script lang="ts">
	import { page } from '$app/state';
	import AppLayout from '$lib/components/Common/AppLayout.svelte';
	import OpenDetailsView from '$lib/components/Shopping/OpenDetailsView.svelte';
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

	let user = $derived($userQuery?.data?.data?.user);
</script>

<AppLayout withName={false}>
	<OpenDetailsView {boardItemsQuery} {boardQuery} {user} />
</AppLayout>
