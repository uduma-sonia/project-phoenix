<script lang="ts">
	import { page } from '$app/state';
	import InputField from '$lib/components/Common/Form/InputField.svelte';
	import { ShoppingRequest } from '$lib/requests';
	import { addToast } from '$lib/store/toast';
	import Helpers from '$lib/utils/helpers';
	import { queryKeys } from '$lib/utils/queryKeys';
	import { Trash, Check } from '@lucide/svelte';
	import { useQueryClient } from '@tanstack/svelte-query';

	let { data, handleEdit, handleUpdate } = $props();

	const queryClient = useQueryClient();

	let itemName = $state(data?.name);
	let quantity = $state(JSON.stringify(data?.quantity) || '');
	let unit = $state(data?.unit);
	let price = $state(JSON.stringify(data?.price) || '');
	let isDeleting = $state(false);
	let boardId = page.params.id;

	function handleClickOutside() {
		const payload = {
			name: itemName,
			quantity: Number(quantity),
			unit,
			price: Number(price)
		};

		handleUpdate(data?._id, payload);
		handleEdit('');
	}

	async function handleItemDelete(id: string) {
		try {
			isDeleting = true;

			const result = await ShoppingRequest.deleteItem(id);

			if (result) {
				queryClient.invalidateQueries({ queryKey: queryKeys.getBoardItems(boardId, '') });
			}
		} catch (error: any) {
			addToast(error?.message || 'An error occured', 'error');
		} finally {
			isDeleting = false;
		}
	}
</script>

<div class="p-3" use:Helpers.clickOutsidev2={handleClickOutside}>
	<InputField bind:value={itemName} label="Name" />
	<InputField bind:value={quantity} label="Quantity" type="number" />
	<InputField bind:value={unit} label="Units eg. cartons, packets" />
	<InputField bind:value={price} label="Price" type="number" />

	<div class="flex items-center justify-end gap-4 pt-4">
		<button onclick={() => handleItemDelete(data?._id)} class="flex items-center justify-center">
			{#if isDeleting}
				<div class="spinner_white_sm border-2 border-black"></div>
			{:else}
				<Trash color="red" size="20px" />
			{/if}
		</button>
		<button
			class="bg-brand-green flex aspect-square w-6 items-center justify-center rounded-full shadow-md"
			onclick={() => handleClickOutside()}
		>
			<Check size="20px" color="#fff" />
		</button>
	</div>
</div>
