<script lang="ts">
	import StandardListItem from './Utilities/StandardListItem.svelte';
	import AddStandardItem from './Utilities/AddStandardItem.svelte';
	import ModalWrapper from '../Common/ModalWrapper.svelte';
	import { page } from '$app/state';
	import { shoppingRequest } from '$lib/requests';
	import { queryKeys } from '$lib/utils/queryKeys';
	import { createQuery, useQueryClient } from '@tanstack/svelte-query';
	import { addToast } from '$lib/store/toast';

	let { onClose, isOpen } = $props();
	const queryClient = useQueryClient();

	let boardId = page.params.id;
	let isLoading = $state(false);

	async function handleItemAdd(value: string) {
		try {
			isLoading = true;

			const payload = {
				name: value,
				quantity: 0,
				unit: '',
				done: false,
				boardId: '',
				price: 0
			};

			const result = await shoppingRequest.createItem(payload);

			if (result) {
				queryClient.invalidateQueries({ queryKey: queryKeys.getStandardItems(boardId) });
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
				queryClient.invalidateQueries({ queryKey: queryKeys.getStandardItems(boardId) });
			}
		} catch (error: any) {
			addToast(error?.error || 'An error occured', 'error');
		} finally {
			isLoading = false;
		}
	}

	const boardItemsQuery = createQuery({
		queryKey: queryKeys.getStandardItems(boardId),
		queryFn: () => shoppingRequest.getStandardItems(boardId)
	});

	let standardList = $derived($boardItemsQuery?.data?.data?.shoppingItems);
</script>

<ModalWrapper {onClose} {isOpen} label="Standard list">
	<div>
		<div class="mt-6 p-4">
			{#each standardList as item, index (index)}
				<StandardListItem {handleItemDelete} data={item} showSettings={true} />
			{/each}

			<div class="mt-6">
				<AddStandardItem isSubmitting={isLoading} {handleItemAdd} />
			</div>
		</div>
	</div>
</ModalWrapper>
