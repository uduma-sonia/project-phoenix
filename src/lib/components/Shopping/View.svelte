<script lang="ts">
	import StandardListModal from './StandardListModal.svelte';
	import ShoppingCard from './Utilities/ShoppingCard.svelte';
	import { closeModal, modalsState, openModal } from '$lib/state/modal.svelte';
	import { createQuery } from '@tanstack/svelte-query';
	import { queryKeys } from '$lib/utils/queryKeys';
	import { shoppingRequest, UserRequest } from '$lib/requests';
	import HabitSearch from '../Habit/Utilities/HabitSearch.svelte';
	import LoaderError from '../Common/LoaderError.svelte';

	const userQuery = createQuery({
		queryKey: queryKeys.getCurrentUser,
		queryFn: () => UserRequest.getCurrentUser()
	});

	let user = $derived($userQuery?.data?.data?.user);
	let searchQuery = $state('');

	const boardsQuery = $derived(
		createQuery({
			queryKey: queryKeys.getAllBoards,
			queryFn: () => shoppingRequest.getAllBoards(user._id)
		})
	);

	let boardsList = $derived(
		$boardsQuery?.data?.data?.boards?.filter((item: any) =>
			item.name.toUpperCase().includes(searchQuery?.toUpperCase())
		)
	);
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
			{#each boardsList as board, index (index)}
				<ShoppingCard {board} />
			{/each}
		</div>
	{/if}
</div>

<StandardListModal onClose={closeModal} isOpen={modalsState.data.isOpen} />
