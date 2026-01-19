<script lang="ts">
	import { ShoppingRequest } from '$lib/requests';
	import { closeAddToListModal, modalsState } from '$lib/state/modal.svelte';
	import { addToast } from '$lib/store/toast';
	import { createQuery } from '@tanstack/svelte-query';
	import ModalWrapper from '../Common/ModalWrapper.svelte';
	import { queryKeys } from '$lib/utils/queryKeys';
	import { selectedRecipeList } from '$lib/state/recipe.svelte';
	import BasicButton from '../Common/Form/BasicButton.svelte';
	import { Plus } from '@lucide/svelte';
	import CreateList from './Utilities/CreateList.svelte';

	const { user } = $props();

	let isLoading = $state(false);
	let showCreateList = $state(false);

	const boardsQuery = createQuery({
		queryKey: queryKeys.getInvitedBoards,
		queryFn: () => ShoppingRequest.getInvitedBoards()
	});

	let boardsList = $derived($boardsQuery?.data?.data?.boards);

	function toggleCreateList() {
		showCreateList = !showCreateList;
	}

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
	label={showCreateList ? 'Create list' : `Add to list`}
	maxWidth="max-w-[400px]"
	helperText={showCreateList ? '' : 'Select the shopping list the selected items to'}
>
	<div class="p-4">
		{#if showCreateList}
			<CreateList {toggleCreateList} {user} />
		{:else}
			<div>
				{#each boardsList as list, index (index)}
					<div class="flex items-center justify-between gap-4 border-b border-b-gray-300 px-1 py-2">
						<p class="font-lexend text-left text-sm font-light">
							{list.name}
						</p>

						<button
							class="text-brand-green text-sm hover:underline"
							onclick={() => handleAdd(list._id, list.name)}
						>
							{#if isLoading}
								<span class="spinner_white_sm border-2 border-black"></span>
							{:else}
								Save
							{/if}
						</button>
					</div>
				{/each}
			</div>

			<div class="mt-8 flex justify-end">
				<div class="w-fit">
					<BasicButton
						className="shadow_button_thin"
						LeftIcon={Plus}
						action={toggleCreateList}
						label="Create list"
					/>
				</div>
			</div>
		{/if}
	</div>
</ModalWrapper>
