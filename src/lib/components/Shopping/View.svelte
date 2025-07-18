<script>
	import TopSection from '../Common/TopSection.svelte';
	import StandardListModal from './StandardListModal.svelte';
	import Search from './Utilities/Search.svelte';
	import ShoppingCard from './Utilities/ShoppingCard.svelte';
	import { closeModal, modalsState, openModal } from '$lib/state/modal.svelte';
</script>

<div class="mx-auto w-full max-w-[1000px] overflow-x-hidden pb-64">
	<TopSection />

	<div class="flex items-center justify-between gap-4 px-3">
		<Search />

		<div>
			<button class="shadow_button" onclick={openModal}> Standard list </button>
		</div>
	</div>

	<div class="mt-14 grid grid-cols-2 gap-6 px-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
		<ShoppingCard />
		<ShoppingCard />
		<ShoppingCard />
		<ShoppingCard />
		<ShoppingCard />
	</div>
</div>

<StandardListModal onClose={closeModal} isOpen={modalsState.data.isOpen} />
