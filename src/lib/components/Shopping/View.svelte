<script>
	import TopSection from '../Common/TopSection.svelte';
	import StandardListModal from './StandardListModal.svelte';
	import Search from './Utilities/Search.svelte';
	import ShoppingCard from './Utilities/ShoppingCard.svelte';
	import { closeModal, modalsState, openModal } from '$lib/state/modal.svelte';
</script>

<div class="mx-auto w-full max-w-[1000px] pb-64">
	<TopSection />

	<div class="flex items-center justify-between gap-4">
		<Search />

		<div>
			<button class="shadow_button" onclick={openModal}> Standard list </button>
		</div>
	</div>

	<div class="mt-14 grid grid-cols-5 gap-6">
		<ShoppingCard />
		<ShoppingCard />
		<ShoppingCard />
		<ShoppingCard />
		<ShoppingCard />
	</div>
</div>

<StandardListModal onClose={closeModal} isOpen={modalsState.data.isOpen} />
