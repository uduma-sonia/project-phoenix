<script lang="ts">
	import BasicButton from '$lib/components/Common/Form/BasicButton.svelte';
	import CreateList from '$lib/components/Modals/Utilities/CreateList.svelte';
	import { ShoppingRequest } from '$lib/requests';
	import { closeGeneratedShoppingListtModal } from '$lib/state/modal.svelte';
	import { addToast } from '$lib/store/toast';
	import { queryKeys } from '$lib/utils/queryKeys';
	import { createQuery } from '@tanstack/svelte-query';

	const { user, generatedList, toggleList } = $props();

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
		if (generatedList?.length) {
			try {
				isLoading = true;

				const payload = generatedList?.map((item: any) => {
					return {
						name: item?.name,
						quantity: 0,
						unit: '',
						done: false,
						boardId: id,
						price: 0,
						ownerId: user?._id
					};
				});

				// @ts-ignore
				await ShoppingRequest.createMultipleItems({ items: payload });

				addToast(`Shopping list saved`, 'success', { link: `/shopping/${id}`, linkName: listName });
				closeGeneratedShoppingListtModal();
			} catch (error: any) {
				addToast(error?.message || 'An error occured', 'error');
			} finally {
				isLoading = false;
			}
		}
	}
</script>

<div>
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
							Save to list
						{/if}
					</button>
				</div>
			{/each}
		</div>

		<div class="mt-8 flex items-center justify-end gap-5">
			<BasicButton label="Back" variant="error" action={toggleList} />
			<BasicButton
				label="Create New List"
				{isLoading}
				variant="primary"
				action={toggleCreateList}
			/>
		</div>
	{/if}
</div>
