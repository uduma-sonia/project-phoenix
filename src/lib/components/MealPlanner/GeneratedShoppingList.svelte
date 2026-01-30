<script lang="ts">
	import { closeGeneratedShoppingListtModal, modalsState } from '$lib/state/modal.svelte';
	import ModalWrapper from '../Common/ModalWrapper.svelte';
	import MealsUtils from './Utilities/utils';
	import BasicButton from '../Common/Form/BasicButton.svelte';
	import SelectShoppingList from './Utilities/SelectShoppingList.svelte';
	import GeneratedListItem from '../Shopping/Utilities/GeneratedListItem.svelte';

	const { user, mealsList } = $props();

	let isLoading = $state(false);
	let showList = $state(false);

	let generatedList = $derived(MealsUtils.generateShoppingList(mealsList));

	function toggleList() {
		showList = !showList;
	}

	function removeItem(name?: string) {
		if (name) {
			generatedList = generatedList?.filter((item) => item?.name !== name);
		}
	}

	function handleUpdate(value: string) {
		console.log(value);
	}
</script>

<ModalWrapper
	isOpen={modalsState.data.isOpenGeneratedShoppingList}
	onClose={closeGeneratedShoppingListtModal}
	label={'Generate shopping list'}
	maxWidth="max-w-[500px]"
	helperText={"Shopping list generated from this week's meal plan"}
>
	<div class="p-4">
		{#if showList}
			<SelectShoppingList {user} {generatedList} {toggleList} />
		{:else}
			<div>
				<div>
					{#each generatedList as list, index (index)}
						<GeneratedListItem {handleUpdate} {list} {isLoading} {removeItem} />
					{/each}
				</div>

				<div class="mt-8 flex items-center justify-end gap-5">
					<BasicButton label="Cancel" variant="error" action={closeGeneratedShoppingListtModal} />
					<BasicButton label="Next" {isLoading} variant="primary" action={toggleList} />
				</div>
			</div>
		{/if}
	</div>
</ModalWrapper>
