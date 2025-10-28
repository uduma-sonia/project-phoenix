<script lang="ts">
	import { ShoppingRequest } from '$lib/requests';
	import { closeAddToListModal, modalsState } from '$lib/state/modal.svelte';
	import { addToast } from '$lib/store/toast';
	import { createQuery } from '@tanstack/svelte-query';
	import ModalWrapper from '../Common/ModalWrapper.svelte';
	import { queryKeys } from '$lib/utils/queryKeys';
	import { selectedRecipeList } from '$lib/state/recipe.svelte';

	const { user } = $props();

	let isLoading = $state(false);

	const boardsQuery = createQuery({
		queryKey: queryKeys.getInvitedBoards,
		queryFn: () => ShoppingRequest.getInvitedBoards()
	});

	let boardsList = $derived($boardsQuery?.data?.data?.boards);

	async function handleAdd(id: string, listName: string) {
		if (selectedRecipeList?.data?.length) {
			try {
				isLoading = true;

				const payload = $state.snapshot(
					selectedRecipeList.data?.map((item) => {
						return {
							name: item,
							quantity: 0,
							unit: '',
							done: false,
							boardId: id,
							price: 0,
							ownerId: user._id
						};
					})
				);

				await ShoppingRequest.createMultipleItems({ items: payload });

				addToast(`Items saved to`, 'success', { link: `/shopping/${id}`, linkName: listName });
				closeAddToListModal();
			} catch (error: any) {
				addToast(error?.message || 'An error occured', 'error');
			} finally {
				isLoading = false;
			}
		}
	}
</script>

<ModalWrapper
	isOpen={modalsState.data.isOpenAddToList}
	onClose={closeAddToListModal}
	label={`Add to list`}
	maxWidth="max-w-[400px]"
	helperText="Select board to add this list to"
>
	<div class="p-4">
		<div class="flex flex-col">
			{#each boardsList as list, index (index)}
				<button
					class="font-lexend border-b border-b-gray-300 px-1 py-2 text-left text-sm font-light"
					onclick={() => handleAdd(list._id, list.name)}
				>
					{list.name}
				</button>
			{/each}
		</div>
	</div>
</ModalWrapper>
