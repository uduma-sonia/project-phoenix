<script lang="ts">
	import { page } from '$app/state';
	import AppLayout from '$lib/components/Common/AppLayout.svelte';
	import LoaderError from '$lib/components/Common/LoaderError.svelte';
	import SEO from '$lib/components/Common/SEO.svelte';
	import EditBoard from '$lib/components/Shopping/EditBoard.svelte';
	import { shoppingRequest } from '$lib/requests';
	import { queryKeys } from '$lib/utils/queryKeys';
	import { createQuery } from '@tanstack/svelte-query';

	let boardId = page.params.id;

	const boardQuery = createQuery({
		queryKey: queryKeys.getBoard(boardId),
		queryFn: () => shoppingRequest.getBoard(boardId)
	});

	let boardDetails = $derived($boardQuery?.data?.data?.board);
</script>

<AppLayout withName={false}>
	<SEO title={boardDetails?.name || 'Shopping'} />
	<LoaderError
		isLoading={$boardQuery?.isLoading}
		error={$boardQuery?.isError}
		errorText={$boardQuery?.error?.message}
	/>

	{#if !$boardQuery?.isLoading && boardDetails}
		<EditBoard {boardDetails} />
	{/if}
</AppLayout>
