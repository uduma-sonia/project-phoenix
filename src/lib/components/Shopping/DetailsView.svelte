<script lang="ts">
	import { Check, List, Plus, SquarePen, Trash } from '@lucide/svelte';
	import ListItem from './Utilities/ListItem.svelte';
	import Search from './Utilities/Search.svelte';
	import InviteModal from './InviteModal.svelte';
	import {
		closeModal,
		modalsState,
		openBoardDeleteModal,
		openModal
	} from '$lib/state/modal.svelte';
	import BackComponent from '../Common/BackComponent.svelte';
	import { addToast } from '$lib/store/toast';
	import { shoppingRequest } from '$lib/requests';
	import { queryKeys } from '$lib/utils/queryKeys';
	import { useQueryClient } from '@tanstack/svelte-query';
	import { page } from '$app/state';
	import StandardListItem from './Utilities/StandardListItem.svelte';
	import Seo from '../Common/SEO.svelte';
	import LoaderError from '../Common/LoaderError.svelte';
	import { goto } from '$app/navigation';
	import HamburgerDropdown from '../Common/HamburgerDropdown.svelte';
	import { handleSelectBoard } from '$lib/state/shopping.svelte';
	import Helpers from '$lib/utils/helpers';
	import fetchBoardMembers from '$lib/hooks/fetchBoardMembers';
	import { Permissions } from '../../../types/shopping';
	import fetchSingleUser from '$lib/hooks/fetchSingleUser';

	let { boardItemsQuery, boardQuery, user, standardItemsQuery } = $props();

	let boardId = page.params.id;

	let queryClient = useQueryClient();
	let membersQuery = fetchBoardMembers(boardId);

	let itemName = $state('');
	let isLoading = $state(false);
	let searchQuery = $state('');
	let showStandardList = $state(false);
	let canEditId = $state('');
	let isAdding = $state(false);

	let itemsList = $derived($boardItemsQuery?.data?.data?.shoppingItems);
	let boardDetails = $derived($boardQuery?.data?.data?.board);
	let standardList = $derived($standardItemsQuery?.data?.data?.shoppingItems);
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

	let completedLength = $derived(filteredItems?.filter((item: any) => item.done));

	function findName(name: string, arr: any[]) {
		const _find = arr?.find((item) => item?.name == name);
		return !_find;
	}

	function handleEdit(id: string) {
		canEditId = id;
	}

	function toggleShowStandardList() {
		showStandardList = !showStandardList;
	}

	function deleteTrip() {
		openBoardDeleteModal();
		handleSelectBoard(boardDetails);
	}

	function getTotal() {
		const pricesList = filteredItems?.map((item: { price: number }) => item.price);
		const sum = Helpers.sumArray(pricesList);
		return sum ? `${boardDetails?.currency}${sum.toLocaleString()}` : '';
	}
	let _total = $derived(getTotal());

	async function handleItemAdd(boardId: string, value?: string) {
		try {
			isAdding = true;
			const payload = {
				name: value || itemName,
				quantity: 0,
				unit: '',
				done: false,
				boardId,
				price: 0,
				ownerId: user?._id
			};

			itemName = '';
			const result = await shoppingRequest.createItem(payload);

			if (result) {
				queryClient.invalidateQueries({ queryKey: queryKeys.getBoardItems(boardId, '') });
			}
		} catch (error: any) {
			addToast(error?.message || 'An error occured', 'error');
		} finally {
			isAdding = false;
		}
	}

	async function handleUpdateItem(itemId: string, _done: boolean) {
		try {
			isLoading = true;

			const payload = {
				done: _done,
				ownerId: user._id
			};

			const result = await shoppingRequest.updateItem(itemId, payload);

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

			const result = await shoppingRequest.updateItem(itemId, payload);

			if (result) {
				queryClient.invalidateQueries({ queryKey: queryKeys.getBoardItems(boardId, '') });
			}
		} catch (error: any) {
			addToast(error?.message || 'An error occured', 'error');
		} finally {
			isLoading = false;
		}
	}

	async function handleShoppingDone() {
		try {
			const result = await shoppingRequest.shoppingDone(page.params.id);

			if (result) {
				queryClient.invalidateQueries({ queryKey: queryKeys.getAllBoards });
				goto('/shopping');
			}
		} catch (error: any) {
			addToast(error?.message || 'An error occured', 'error');
		}
	}

	const moreOptions = $derived([
		{
			label: 'Edit',
			icon: SquarePen,
			link: `/shopping/${boardDetails?._id}/edit`
		},
		{
			label: 'Standard list',
			icon: List,
			action: toggleShowStandardList
		},
		{
			label: 'Shopping done',
			icon: Check,
			action: handleShoppingDone
		},
		{
			label: 'Delete board',
			icon: Trash,
			iconColor: 'red',
			action: deleteTrip
		}
	]);
</script>

<Seo title={boardDetails?.name} />

<div class="pb-20">
	<div class="my-6 justify-between px-3 md:flex">
		<BackComponent title={boardDetails?.name} backLink="/shopping" />

		<div class="mt-6 flex flex-1 items-center justify-end gap-4 md:mt-0">
			<div>
				<button
					class="shadow_button shadow_button_thin shadow_button_with_icon"
					onclick={openModal}
				>
					<img src="/images/users.svg" class="w-7" alt="" />
				</button>
			</div>
			{#if _permission === Permissions.OWNER || _permission === Permissions.CAN_EDIT}
				<div>
					<HamburgerDropdown variant="solid" options={moreOptions} />
				</div>
			{/if}
		</div>
	</div>

	<div class="flex items-center gap-6 px-3">
		<Search bind:value={searchQuery} placeholder="Search board" />

		<div>
			<p class="font-lexend text-sm">
				{completedLength?.length || 0} / {filteredItems?.length || '0'}
			</p>
		</div>
	</div>

	<div class="mt-14 grid grid-cols-1 gap-10 px-3 md:grid-cols-2">
		<div>
			<LoaderError isLoading={$boardItemsQuery?.isLoading} error={$boardItemsQuery?.isError} />

			{#if !$boardItemsQuery?.isLoading}
				<div>
					<div class="mb- space-y-2">
						{#each sortByDone(filteredItems) as items, index (index)}
							<ListItem
								currency={boardDetails?.currency}
								{handleUpdate}
								{canEditId}
								data={items}
								{handleUpdateItem}
								{handleEdit}
								canEdit={_permission === Permissions.OWNER || _permission === Permissions.CAN_EDIT}
							/>
						{/each}
					</div>

					{#if _total}
						<div class="mt-4 flex items-center justify-between px-1">
							<p class="font-lexend font-medium">Total</p>

							<p class="font-lexend text-right font-light">
								{_total}
							</p>
						</div>
					{/if}

					{#if _permission === Permissions.OWNER || _permission === Permissions.CAN_EDIT}
						<div class="relative z-10 mt-8 w-full gap-3 rounded-lg border-2 bg-white p-3">
							<form
								class="flex items-center gap-4"
								onsubmit={(e) => {
									e.preventDefault();
									handleItemAdd(boardId);
								}}
							>
								<input
									type="text"
									bind:value={itemName}
									class="h-[50px] w-full border-b border-b-[#393838] outline-none"
									placeholder="Type and enter"
								/>
							</form>
						</div>

						<div class="mt-4 flex justify-center">
							<button class="create_button_sm shadow_button" onclick={() => handleItemAdd(boardId)}>
								{#if isAdding}
									<div class="spinner_white border-2 border-black"></div>
								{:else}
									<Plus size="26px" />
								{/if}
							</button>
						</div>
					{/if}
				</div>
			{/if}
		</div>

		{#if showStandardList && standardList?.length > 0}
			<div class="h-fit rounded-lg border-2 bg-white p-2">
				{#each standardList as item, index (index)}
					{@const hasBeenAdded = findName(item.name, itemsList)}

					{#if hasBeenAdded}
						<StandardListItem
							{boardId}
							handleAddToList={handleItemAdd}
							showSettings={false}
							{item}
						/>
					{/if}
				{/each}
			</div>
		{/if}
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
