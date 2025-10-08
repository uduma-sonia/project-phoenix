<script lang="ts">
	import StandardListModal from './StandardListModal.svelte';
	import ShoppingCard from './Utilities/ShoppingCard.svelte';
	import { closeModal, modalsState, openModal } from '$lib/state/modal.svelte';
	import { createQuery } from '@tanstack/svelte-query';
	import { queryKeys } from '$lib/utils/queryKeys';
	import { shoppingRequest } from '$lib/requests';
	import HabitSearch from '../Habit/Utilities/HabitSearch.svelte';
	import LoaderError from '../Common/LoaderError.svelte';
	import EmptyState from '../Common/EmptyState.svelte';
	import { onMount } from 'svelte';
	import ShoppingUtils from './Utilities/utils';

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

	let isLoading = $derived($boardsQuery?.isLoading);
	let isError = $derived($boardsQuery?.isError);
	let hasBoards = $derived((boardsList ?? []).length > 0);

	// Fallback for really slow networks - 3G, etcs, to improve the UX.
	// TODO: REFACTOR
	let hasMount = $state(false);

	onMount(() => {
		hasMount = true;
	});
</script>

<div class="pt-5 pb-24">
	<div class="flex items-center justify-between gap-4 px-3">
		<HabitSearch placeholder="Search board" bind:searchQuery />
		<div>
			<button class="shadow_button" onclick={openModal}> Standard list </button>
		</div>
	</div>

	<LoaderError {isLoading} error={isError} />

	{#if !isLoading}
		{#if hasBoards}
			<div class="mt-14 grid grid-cols-2 gap-3 px-3 sm:grid-cols-3 sm:gap-6 md:grid-cols-4">
				{#each ShoppingUtils.sortByDone(boardsList) as board, index (index)}
					<ShoppingCard {board} />
				{/each}
			</div>
		{:else if !isError}
			{#if hasMount}
				<EmptyState
					buttonText="Create Board"
					heading="Never forget milk again!"
					text="Add items as you think of them"
					link="/shopping/create"
				/>
			{:else}
				<LoaderError isLoading={true} />
			{/if}
		{/if}
	{/if}

	<!-- {#if !$boardsQuery?.isLoading}
		{#if boardsList?.length > 0}
			<div class="mt-14 grid grid-cols-2 gap-3 px-3 sm:grid-cols-3 sm:gap-6 md:grid-cols-4">
				{#each sortByDone(boardsList) as board, index (index)}
					<ShoppingCard {board} />
				{/each}
			</div>
		{:else}
			<EmptyState
				buttonText="Create Board"
				heading="Never forget milk again!"
				text="Add items as you think of them"
				link="/shopping/create"
			/>

			text="Create a shopping list so you never forget the essentials"
		{/if}
	{/if} -->
</div>

<StandardListModal onClose={closeModal} isOpen={modalsState.data.isOpen} />
