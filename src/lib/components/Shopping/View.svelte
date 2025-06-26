<script>
	import TopSection from '../Common/TopSection.svelte';
	import StandardListModal from './StandardListModal.svelte';
	import Search from './Utilities/Search.svelte';
	import ShoppingCard from './Utilities/ShoppingCard.svelte';

	let showStandardList = $state(false);

	const handleShowList = () => {
		showStandardList = true;
	};
	const handleCloseList = () => {
		showStandardList = false;
	};
</script>

<div class="mx-auto w-full max-w-[1000px] pb-64">
	<TopSection />

	<div class="flex items-center justify-between gap-4">
		<Search />

		<div>
			<button class="shadow_button" onclick={handleShowList}> Standard list </button>
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

{#if showStandardList}
	<StandardListModal {handleCloseList} />
{/if}
