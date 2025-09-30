<script lang="ts">
	import StandardListModal from './StandardListModal.svelte';
	import ShoppingCard from './Utilities/ShoppingCard.svelte';
	import { closeModal, modalsState, openModal } from '$lib/state/modal.svelte';
	import { createQuery } from '@tanstack/svelte-query';
	import { queryKeys } from '$lib/utils/queryKeys';
	import { shoppingRequest } from '$lib/requests';
	import HabitSearch from '../Habit/Utilities/HabitSearch.svelte';
	import LoaderError from '../Common/LoaderError.svelte';
	import { ShoppingStatus } from '../../../types/shopping';

	let searchQuery = $state('');

	const boardsQuery = createQuery({
		queryKey: queryKeys.getInvitedBoards,
		queryFn: () => shoppingRequest.getInvitedBoards()
	});

	let boardsList = $derived(
		$boardsQuery?.data?.data?.boards?.filter((item: any) =>
			item.name.toUpperCase().includes(searchQuery?.toUpperCase())
		)
	);

	function sortByDone(items: any[]) {
		return items?.sort((a, b) => {
			if (a.status === ShoppingStatus.DONE && b.status === ShoppingStatus.DONE) return 0;
			return a.status === ShoppingStatus.DONE ? 1 : -1;
		});

		// return items?.sort((a, b) => {
		// 	return new Date(b.updatedAt) - new Date(a.updatedAt);
		// });
	}
</script>

<div class="pt-5 pb-24">
	<div class="flex items-center justify-between gap-4 px-3">
		<HabitSearch placeholder="Search board" bind:searchQuery />
		<div>
			<button class="shadow_button" onclick={openModal}> Standard list </button>
		</div>
	</div>

	<LoaderError isLoading={$boardsQuery?.isLoading} error={$boardsQuery?.isError} />

	{#if boardsList?.length > 0}
		<div class="mt-14 grid grid-cols-2 gap-3 px-3 sm:grid-cols-3 sm:gap-6 md:grid-cols-4">
			{#each sortByDone(boardsList) as board, index (index)}
				<ShoppingCard {board} />
			{/each}
		</div>
	{/if}
</div>

<StandardListModal onClose={closeModal} isOpen={modalsState.data.isOpen} />
