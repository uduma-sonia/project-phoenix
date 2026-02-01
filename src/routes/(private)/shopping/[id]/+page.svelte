<script lang="ts">
	import { page } from '$app/state';
	import AppLayout from '$lib/components/Common/AppLayout.svelte';
	import DeleteBoardModal from '$lib/components/Modals/DeleteBoardModal.svelte';
	import DetailsView from '$lib/components/Shopping/DetailsView.svelte';
	import ShoppingUtils from '$lib/components/Shopping/Utilities/utils';
	import fetchBoardMembers from '$lib/hooks/fetchBoardMembers';
	import useCurrentUser from '$lib/hooks/useCurrentUser';
	import { ShoppingRequest } from '$lib/requests';
	import { queryKeys } from '$lib/utils/queryKeys';
	import { createQuery } from '@tanstack/svelte-query';
	import { Permissions } from '../../../../types/shopping';
	import LockedList from '$lib/components/Shopping/Utilities/LockedList.svelte';
	import LoaderError from '$lib/components/Common/LoaderError.svelte';

	let boardId = page.params.id;

	let userQuery = useCurrentUser();
	let membersQuery = fetchBoardMembers(boardId);
	let boardQuery = createQuery({
		queryKey: queryKeys.getBoard(boardId),
		queryFn: () => ShoppingRequest.getBoard(boardId)
	});
	let standardItemsQuery = createQuery({
		queryKey: queryKeys.getStandardItems,
		queryFn: () => ShoppingRequest.getStandardItems('')
	});

	let user = $derived($userQuery?.data?.data?.user);
	let boardDetails = $derived($boardQuery?.data?.data?.board);

	let _permission = $derived(
		ShoppingUtils.getPermission(
			$membersQuery?.data?.data?.members?.members,
			user,
			boardDetails?.ownerId
		)
	);
</script>

<AppLayout withName={false}>
	<LoaderError isLoading={$boardQuery?.isLoading} error={$boardQuery?.isError} />

	{#if !$boardQuery?.isLoading && !$membersQuery?.isLoading && !$userQuery?.isLoading}
		{#if _permission === Permissions.UNAUTHORIZED}
			<LockedList />
		{:else}
			<DetailsView {boardQuery} {user} {standardItemsQuery} {_permission} />
		{/if}
	{/if}
</AppLayout>

<DeleteBoardModal />
