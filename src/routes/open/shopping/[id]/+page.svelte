<script lang="ts">
	import { page } from '$app/state';
	import AppLayout from '$lib/components/Common/AppLayout.svelte';
	import OpenDetailsView from '$lib/components/Shopping/OpenDetailsView.svelte';
	import { ShoppingRequest } from '$lib/requests';
	import { queryKeys } from '$lib/utils/queryKeys';
	import { createQuery } from '@tanstack/svelte-query';

	let boardId = page.params.id;

	let boardItemsQuery = createQuery({
		queryKey: queryKeys.getOpenBoardItems(boardId),
		queryFn: () => ShoppingRequest.getOpenBoardItems(boardId)
	});
</script>

<AppLayout withName={false}>
	<OpenDetailsView {boardItemsQuery} />
</AppLayout>
