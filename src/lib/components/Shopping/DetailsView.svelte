<script lang="ts">
	import { Plus, UserRoundPlus } from '@lucide/svelte';
	import ListItem from './Utilities/ListItem.svelte';
	import Search from './Utilities/Search.svelte';
	import InviteModal from './InviteModal.svelte';
	import { closeModal, modalsState, openModal } from '$lib/state/modal.svelte';
	import BackComponent from '../Common/BackComponent.svelte';
	import { addToast } from '$lib/store/toast';
	import { shoppingRequest, UserRequest } from '$lib/requests';
	import { queryKeys } from '$lib/utils/queryKeys';
	import { createQuery, useQueryClient } from '@tanstack/svelte-query';
	import { page } from '$app/state';
	import StandardListItem from './Utilities/StandardListItem.svelte';

	const queryClient = useQueryClient();
	let boardId = page.params.id;

	let itemName = $state('');
	let isLoading = $state(false);
	let searchQuery = $state('');
	let showStandardList = $state(false);
	let canEditId = $state('');

	const boardItemsQuery = createQuery({
		queryKey: queryKeys.getBoardItems(boardId, ''),
		queryFn: () => shoppingRequest.getBoardItems(boardId, '')
	});

	const userQuery = createQuery({
		queryKey: queryKeys.getCurrentUser,
		queryFn: () => UserRequest.getCurrentUser()
	});

	const boardQuery = createQuery({
		queryKey: queryKeys.getBoard(boardId),
		queryFn: () => shoppingRequest.getBoard(boardId)
	});

	const standardItemsQuery = createQuery({
		queryKey: queryKeys.getStandardItems,
		queryFn: () => shoppingRequest.getStandardItems('')
	});

	let itemsList = $derived($boardItemsQuery?.data?.data?.shoppingItems);
	let boardDetails = $derived($boardQuery?.data?.data?.board);
	let standardList = $derived($standardItemsQuery?.data?.data?.shoppingItems);
	let user = $derived($userQuery?.data?.data?.user);

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

	async function handleItemAdd(boardId: string, value?: string) {
		try {
			isLoading = true;

			const payload = {
				name: value || itemName,
				quantity: 0,
				unit: '',
				done: false,
				boardId,
				price: 0,
				ownerId: user?._id
			};

			const result = await shoppingRequest.createItem(payload);

			if (result) {
				itemName = '';
				queryClient.invalidateQueries({ queryKey: queryKeys.getBoardItems(boardId, '') });
			}
		} catch (error: any) {
			addToast(error?.error || 'An error occured', 'error');
		} finally {
			isLoading = false;
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
			addToast(error?.error || 'An error occured', 'error');
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
			addToast(error?.error || 'An error occured', 'error');
		} finally {
			isLoading = false;
		}
	}
</script>

<div>
	<div>
		<div class="my-6 justify-between px-3 md:flex">
			<BackComponent title={boardDetails?.name} backLink="/shopping" />

			<div class="mt-10 flex flex-1 items-center gap-4 md:mt-0 md:justify-end">
				<div>
					<button
						class="shadow_button shadow_button_thin shadow_button_with_icon"
						onclick={openModal}
					>
						<UserRoundPlus size="20px" />

						Invite
					</button>
				</div>
				<div>
					<button class="shadow_button shadow_button_thin" onclick={toggleShowStandardList}>
						{#if showStandardList}
							Hide standard list
						{:else}
							Show standard list
						{/if}
					</button>
				</div>
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
				<div class="mb-6 space-y-2">
					{#each sortByDone(filteredItems) as items, index (index)}
						<ListItem
							currency={boardDetails?.currency}
							{handleUpdate}
							{canEditId}
							data={items}
							{handleUpdateItem}
							{handleEdit}
						/>
					{/each}
				</div>

				<div class="relative z-10 w-full gap-3 rounded-lg border-2 bg-white p-3">
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
						<Plus size="16px" />
					</button>
				</div>
			</div>

			{#if showStandardList && standardList?.length > 0}
				<div class="h-fit rounded-lg border-2 bg-white p-2">
					<!-- <div class="hidden h-fit rounded-lg border-2 bg-white p-2 md:block"> -->
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
</div>

{#if user?._id}
	<InviteModal onClose={closeModal} isOpen={modalsState.data.isOpen} {user} />
{/if}
