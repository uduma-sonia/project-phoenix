<script lang="ts">
	import { PackingRequest } from '$lib/requests';
	import { closePackingModal, modalsState } from '$lib/state/modal.svelte';
	import { queryKeys } from '$lib/utils/queryKeys';
	import { createQuery, useQueryClient } from '@tanstack/svelte-query';
	import ModalWrapper from '../Common/ModalWrapper.svelte';
	import PackingCategoryTab from './Utilities/PackingCategoryTab.svelte';
	import PackingItem from './Utilities/PackingItem.svelte';
	import { addToast } from '$lib/store/toast';
	import AddPackingItem from './Utilities/AddPackingItem.svelte';

	const queryClient = useQueryClient();

	let currentTab = $state('All');
	let isDeletingId = $state('');
	let isAdding = $state(false);
	let selectItem: string[] = $state([]);

	function toggleItem(item: string) {
		if (selectItem.includes(item)) {
			selectItem = selectItem.filter((i) => i !== item);
		} else {
			selectItem = [...selectItem, item];
		}
	}

	function handleChangeTab(tab: string) {
		currentTab = tab;
	}

	const groupQuery = createQuery({
		queryKey: queryKeys.getPackingItems,
		queryFn: () => PackingRequest.getPackingItems()
	});

	let groupList = $derived($groupQuery?.data?.data?.packingItems);

	async function handleItemAdd(value: string) {
		try {
			isAdding = true;

			const payload = {
				name: value,
				categories: []
			};

			const result = await PackingRequest.createItem(payload);

			if (result) {
				queryClient.invalidateQueries({ queryKey: queryKeys.getPackingItems });
			}
		} catch (error: any) {
			addToast(error?.message || 'An error occured', 'error');
		} finally {
			isAdding = false;
		}
	}

	async function handleItemDelete(id: string) {
		try {
			isDeletingId = id;

			const result = await PackingRequest.deleteItem(id);

			if (result) {
				queryClient.invalidateQueries({ queryKey: queryKeys.getPackingItems });
			}
		} catch (error: any) {
			addToast(error?.message || 'An error occured', 'error');
		} finally {
			isDeletingId = '';
		}
	}
	async function handleUpdateItem(id: string, itemName: string) {
		try {
			const result = await PackingRequest.updateItem(id, { name: itemName });

			if (result) {
				queryClient.invalidateQueries({ queryKey: queryKeys.getPackingItems });
			}
		} catch (error: any) {
			addToast(error?.message || 'An error occured', 'error');
		}
	}
</script>

<ModalWrapper
	isOpen={modalsState.data.isOpenPacking}
	onClose={closePackingModal}
	label="Packing list"
	maxWidth="max-w-[600px]"
>
	<div class="p-4">
		<PackingCategoryTab {handleChangeTab} {currentTab} />

		<div class="mt-8">
			<div class="space-y-3">
				{#each groupList as item, index (index)}
					{@const isSelected = selectItem.includes(item._id)}
					{@const isDeleting = Boolean(isDeletingId === item._id)}
					<PackingItem
						{isDeleting}
						{isSelected}
						{toggleItem}
						{item}
						{handleItemDelete}
						{handleUpdateItem}
					/>
				{/each}
			</div>

			<AddPackingItem {handleItemAdd} isSubmitting={isAdding} />
		</div>
	</div>
</ModalWrapper>
