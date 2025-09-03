<script lang="ts">
	import StandardListItem from './Utilities/StandardListItem.svelte';
	import AddStandardItem from './Utilities/AddStandardItem.svelte';
	import ModalWrapper from '../Common/ModalWrapper.svelte';
	import { page } from '$app/state';
	import { shoppingRequest, UserRequest } from '$lib/requests';
	import { queryKeys } from '$lib/utils/queryKeys';
	import { createQuery, useQueryClient } from '@tanstack/svelte-query';
	import { addToast } from '$lib/store/toast';

	let { onClose, isOpen } = $props();
	const queryClient = useQueryClient();

	const userQuery = createQuery({
		queryKey: queryKeys.getCurrentUser,
		queryFn: () => UserRequest.getCurrentUser()
	});

	let user = $derived($userQuery?.data?.data?.user);

	let boardId = page.params.id;
	let isLoading = $state(false);

	async function handleItemAdd(value: string) {
		try {
			isLoading = true;

			// TODO: ADD OWNER ID TO BOARD ITEM PAYLOAD
			const payload = {
				name: value,
				quantity: 0,
				unit: '',
				done: false,
				boardId: '',
				price: 0,
				ownerId: user._id
			};

			const result = await shoppingRequest.createItem(payload);

			if (result) {
				queryClient.invalidateQueries({ queryKey: queryKeys.getStandardItems });
			}
		} catch (error: any) {
			addToast(error?.error || 'An error occured', 'error');
		} finally {
			isLoading = false;
		}
	}

	async function handleItemDelete(id: string) {
		try {
			isLoading = true;

			const result = await shoppingRequest.deleteItem(id);

			if (result) {
				queryClient.invalidateQueries({ queryKey: queryKeys.getStandardItems });
			}
		} catch (error: any) {
			addToast(error?.error || 'An error occured', 'error');
		} finally {
			isLoading = false;
		}
	}

	async function handleUpdateItem(itemId: string, name: string) {
		try {
			isLoading = true;

			const payload = {
				name: name,
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

	const standardItemsQuery = createQuery({
		queryKey: queryKeys.getStandardItems,
		queryFn: () => shoppingRequest.getStandardItems(user._id)
		// refetchInterval: 5000
	});

	let standardList = $derived($standardItemsQuery?.data?.data?.shoppingItems);
</script>

<ModalWrapper {onClose} {isOpen} label="Standard list">
	<div>
		<div class="p-4">
			{#each standardList as item, index (index)}
				{#key item?._id}
					<StandardListItem {handleUpdateItem} {handleItemDelete} {item} showSettings={true} />
				{/key}
			{/each}

			<div class="mt-6">
				<AddStandardItem isSubmitting={isLoading} {handleItemAdd} />
			</div>
		</div>
	</div>
</ModalWrapper>
