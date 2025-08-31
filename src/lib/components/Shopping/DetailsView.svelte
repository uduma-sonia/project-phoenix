<script lang="ts">
	import { UserRoundPlus } from '@lucide/svelte';
	import TopSection from '../Common/TopSection.svelte';
	import ListItem from './Utilities/ListItem.svelte';
	import AddItem from './Utilities/AddItem.svelte';
	import Search from './Utilities/Search.svelte';
	import InviteModal from './InviteModal.svelte';
	import { closeModal, modalsState, openModal } from '$lib/state/modal.svelte';
	import BackComponent from '../Common/BackComponent.svelte';
	import { addToast } from '$lib/store/toast';
	import { shoppingRequest } from '$lib/requests';
	import { queryKeys } from '$lib/utils/queryKeys';
	import { createQuery, useQueryClient } from '@tanstack/svelte-query';
	import { page } from '$app/state';
	import { ShoppingStatus } from '../../../types/shopping';

	let isLoading = $state(false);
	let searchQuery = $state('');

	const queryClient = useQueryClient();
	let boardId = page.params.id;

	const boardItemsQuery = createQuery({
		queryKey: queryKeys.getBoardItems(boardId),
		queryFn: () => shoppingRequest.getBoardItems(boardId)
	});

	const boardQuery = createQuery({
		queryKey: queryKeys.getBoard(boardId),
		queryFn: () => shoppingRequest.getBoard(boardId)
	});

	let itemsList = $derived($boardItemsQuery?.data?.data?.shoppingItems);
	let boardDetails = $derived($boardQuery?.data?.data?.board);

	async function handleItemAdd(value: string, boardId: string) {
		try {
			isLoading = true;

			const payload = {
				name: value,
				quantity: 0,
				unit: '',
				done: false,
				boardId,
				price: 0
			};

			const result = await shoppingRequest.createItem(payload);

			if (result) {
				queryClient.invalidateQueries({ queryKey: queryKeys.getBoardItems(boardId) });
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
				// name: value,
				// quantity: 0,
				// unit: '',
				done: _done
				// boardId,
				// price: 0
			};

			const result = await shoppingRequest.updateItem(itemId, payload);

			if (result) {
				queryClient.invalidateQueries({ queryKey: queryKeys.getBoardItems(boardId) });
			}
		} catch (error: any) {
			addToast(error?.error || 'An error occured', 'error');
		} finally {
			isLoading = false;
		}
	}

	async function handleDoneShopping() {
		try {
			isLoading = true;

			const payload = {
				status: ShoppingStatus.DONE
			};

			const result = await shoppingRequest.updateBoard(boardId, payload);

			if (result) {
				addToast('Shopping completed', 'success', '/images/confetti.svg');
				queryClient.invalidateQueries({ queryKey: queryKeys.getBoard(boardId) });
			}
		} catch (error: any) {
			addToast(error?.error || 'An error occured', 'error');
		} finally {
			isLoading = false;
		}
	}

	let filteredItems = $derived(
		itemsList?.filter((item: any) => item.name.toUpperCase().includes(searchQuery.toUpperCase()))
	);

	let completedLength = $derived(filteredItems?.filter((item: any) => item.done));
</script>

<div class="mx-auto w-full max-w-[1000px] overflow-x-hidden pb-64">
	<TopSection withName={false} />

	<div>
		<div class="my-6 justify-between px-3 md:flex">
			<BackComponent title={boardDetails?.name} backLink="/shopping" />

			<div class="mt-6 flex flex-1 items-center gap-4 md:mt-0 md:justify-end">
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
					<button class="shadow_button shadow_button_thin"> Add from standard </button>
				</div>
			</div>
		</div>

		<div class="flex items-center gap-6 px-3">
			<Search bind:value={searchQuery} />

			<div>
				<p class="font-lexend text-sm">
					{completedLength?.length || 0} / {filteredItems?.length || '0'}
				</p>
			</div>
		</div>

		<div class="mt-6 grid grid-cols-1 gap-10 px-3 md:grid-cols-2">
			<div>
				<div class="mb-6 space-y-2">
					{#each filteredItems as items, index (index)}
						<ListItem {boardId} data={items} {handleUpdateItem} />
					{/each}
				</div>

				<AddItem {boardId} {handleItemAdd} />

				<div class="mt-10">
					<button class="shadow_button" onclick={handleDoneShopping}> Shopping done </button>
				</div>
			</div>

			<!-- <div class="h-fit rounded-lg border-2 bg-white p-2">
				<StandardListItem />
				<StandardListItem />
				<StandardListItem />
			</div> -->
		</div>
	</div>
</div>

<InviteModal onClose={closeModal} isOpen={modalsState.data.isOpen} />
