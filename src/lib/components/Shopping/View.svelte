<script lang="ts">
	import TopSection from '../Common/TopSection.svelte';
	import StandardListModal from './StandardListModal.svelte';
	import Search from './Utilities/Search.svelte';
	import ShoppingCard from './Utilities/ShoppingCard.svelte';
	import { closeModal, modalsState, openModal } from '$lib/state/modal.svelte';
	import FloatingButton from '../Common/FloatingButton.svelte';
	import { createQuery } from '@tanstack/svelte-query';
	import { queryKeys } from '$lib/utils/queryKeys';
	import { shoppingRequest, UserRequest } from '$lib/requests';

	const userQuery = createQuery({
		queryKey: queryKeys.getCurrentUser,
		queryFn: () => UserRequest.getCurrentUser()
	});

	let user = $derived($userQuery?.data?.data?.user);

	const boardsQuery = createQuery({
		queryKey: queryKeys.getAllBoards,
		queryFn: () => shoppingRequest.getAllBoards(user._id)
	});

	let boardsList = $derived($boardsQuery?.data?.data?.boards);
</script>

<div class="mx-auto w-full max-w-[1000px] overflow-x-hidden pb-64">
	<TopSection />

	<div class="flex items-center justify-between gap-4 px-3">
		<Search />

		<div>
			<button class="shadow_button" onclick={openModal}> Standard list </button>
		</div>
	</div>

	<div class="mt-14 grid grid-cols-2 gap-6 px-3 sm:grid-cols-3 md:grid-cols-4">
		<!-- <div class="mt-14 grid grid-cols-2 gap-6 px-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5"> -->
		{#each boardsList as board, index (index)}
			<ShoppingCard {board} />
		{/each}
	</div>

	<FloatingButton link="/shopping/create" />
</div>

<StandardListModal onClose={closeModal} isOpen={modalsState.data.isOpen} />
