<script lang="ts">
	// @ts-nocheck
	import Helpers from '$lib/utils/helpers';

	let { data, handleEdit, handleUpdate } = $props();

	let itemName = $state(data?.name);
	let quantity = $state(data?.quantity || '');
	let unit = $state(data?.unit);
	let price = $state(data?.price || '');

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
	<input
		type="text"
		bind:value={itemName}
		class="h-[40px] w-full border-b border-b-[#393838] px-3 outline-none"
		placeholder="Name"
	/>
	<input
		inputmode="numeric"
		bind:value={quantity}
		class="h-[40px] w-full border-b border-b-[#393838] px-3 outline-none"
		placeholder="Quantity"
	/>
	<input
		bind:value={unit}
		class="h-[40px] w-full border-b border-b-[#393838] px-3 outline-none"
		type="text"
		placeholder="Units eg. cartons, packets"
	/>
	<input
		type="number"
		inputmode="numeric"
		bind:value={price}
		class="h-[40px] w-full border-b border-b-[#393838] px-3 outline-none"
		placeholder="Price"
	/>
</div>
