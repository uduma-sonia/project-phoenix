<script lang="ts">
	import ListItem from './Utilities/ListItem.svelte';
	import InviteModal from './InviteModal.svelte';
	import { closeModal, modalsState } from '$lib/state/modal.svelte';
	import { addToast } from '$lib/store/toast';
	import { ShoppingRequest } from '$lib/requests';
	import { queryKeys } from '$lib/utils/queryKeys';
	import { useQueryClient } from '@tanstack/svelte-query';
	import { page } from '$app/state';
	import Seo from '../Common/SEO.svelte';
	import LoaderError from '../Common/LoaderError.svelte';
	// import { goto } from '$app/navigation';
	import Helpers from '$lib/utils/helpers';
	import fetchBoardMembers from '$lib/hooks/fetchBoardMembers';
	import fetchSingleUser from '$lib/hooks/fetchSingleUser';

	let { boardItemsQuery, boardQuery, user } = $props();

	let boardId = page.params.id;

	let queryClient = useQueryClient();
	let membersQuery = fetchBoardMembers(boardId);

	let isLoading = $state(false);
	let searchQuery = $state('');
	let canEditId = $state('');
	let isAdding = $state(false);

	let itemsList = $derived($boardItemsQuery?.data?.data?.shoppingItems);
	let boardDetails = $derived($boardQuery?.data?.data?.board);
	let _permission = $derived(
		Helpers.getPermission($membersQuery?.data?.data?.members?.members, user, boardDetails?.ownerId)
	);

	let ownerQuery = $derived(fetchSingleUser(boardDetails?.ownerId));
	let ownerDetails = $derived($ownerQuery?.data?.data?.user);

	function sortByDone(items: any[]) {
		return items?.sort((a, b) => {
			if (a.done === b.done) return 0;
			return a.done ? 1 : -1;
		});
	}

	let filteredItems = $derived(
		itemsList?.filter((item: any) => item.name.toUpperCase().includes(searchQuery.toUpperCase()))
	);

	function handleEdit(id: string) {
		canEditId = id;
	}

	let _total = $derived(
		Helpers.getAmountAndCurrency(
			Helpers.sumArray(filteredItems?.map((item: { price: number }) => item.price)),
			user
		)
	);

	async function handleUpdateItem(itemId: string, _done: boolean) {
		try {
			isLoading = true;

			const payload = {
				done: _done,
				ownerId: user._id
			};

			const result = await ShoppingRequest.updateItem(itemId, payload);

			if (result) {
				queryClient.invalidateQueries({ queryKey: queryKeys.getBoardItems(boardId, '') });
			}
		} catch (error: any) {
			addToast(error?.message || 'An error occured', 'error');
		} finally {
			isLoading = false;
		}
	}

	async function handleUpdate(itemId: string, payload: any) {
		try {
			isLoading = true;

			const result = await ShoppingRequest.updateItem(itemId, payload);

			if (result) {
				queryClient.invalidateQueries({ queryKey: queryKeys.getBoardItems(boardId, '') });
			}
		} catch (error: any) {
			addToast(error?.message || 'An error occured', 'error');
		} finally {
			isLoading = false;
		}
	}

	// async function handleShoppingDone() {
	// 	try {
	// 		const result = await ShoppingRequest.shoppingDone(page.params.id);

	// 		if (result) {
	// 			queryClient.invalidateQueries({ queryKey: queryKeys.getInvitedBoards });
	// 			goto('/shopping');
	// 		}
	// 	} catch (error: any) {
	// 		addToast(error?.message || 'An error occured', 'error');
	// 	}
	// }
</script>

<Seo title={boardDetails?.name} />

<div class="px-3 pb-20">
	<div>
		<p class="mt-10 text-center text-lg">
			{boardDetails?.name}
		</p>
	</div>

	<div class="mx-auto mt-4 max-w-lg">
		<div>
			<LoaderError isLoading={$boardItemsQuery?.isLoading} error={$boardItemsQuery?.isError} />

			{#if _total}
				<div class="mt-4 flex items-center justify-between px-1">
					<p class="font-lexend font-medium">Total amount</p>

					<p class="font-lexend text-right font-light">
						{_total}
					</p>
				</div>
			{/if}

			{#if !$boardItemsQuery?.isLoading}
				<div>
					<div class="mt-6 space-y-2">
						{#each sortByDone(filteredItems) as item, index (index)}
							<ListItem
								price={Helpers.getAmountAndCurrency(item?.price, user)}
								{handleUpdate}
								{canEditId}
								data={item}
								{handleUpdateItem}
								{handleEdit}
								canEdit={false}
								isOpenLink={true}
							/>
						{/each}
					</div>
				</div>
			{/if}
		</div>
	</div>
</div>

{#if user?._id}
	<InviteModal
		{ownerDetails}
		{_permission}
		onClose={closeModal}
		isOpen={modalsState.data.isOpen}
		{user}
	/>
{/if}
