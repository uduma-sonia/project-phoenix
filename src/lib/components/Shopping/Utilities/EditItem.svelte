<script lang="ts">
	// @ts-nocheck
	import InputField from '$lib/components/Common/InputField.svelte';
	import Helpers from '$lib/utils/helpers';

	let { data, handleEdit, handleUpdate } = $props();

	let itemName = $state(data?.name);
	let quantity = $state(JSON.stringify(data?.quantity) || '');
	let unit = $state(data?.unit);
	let price = $state(JSON.stringify(data?.price) || '');

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
</script>

<div class="p-3" use:Helpers.clickOutside onclick_outside={handleClickOutside}>
	<InputField bind:value={itemName} label="Name" />
	<InputField bind:value={quantity} label="Quantity" type="number" />
	<InputField bind:value={unit} label="Units eg. cartons, packets" />
	<InputField bind:value={price} label="Price" type="number" />
</div>
