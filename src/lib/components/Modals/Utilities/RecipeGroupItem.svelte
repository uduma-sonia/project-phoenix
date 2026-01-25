<script lang="ts">
	import BasicInputField from '$lib/components/Common/Form/BasicInputField.svelte';

	let { item, handleItemDelete, handleUpdate } = $props();

	let groupName = $derived(item?.name);

	function handleUpdateItem() {
		handleUpdate?.(item._id, groupName);
	}
</script>

<div class="flex items-center gap-4">
	<div class="flex-1">
		<BasicInputField onblur={handleUpdateItem} bind:value={groupName} placeholder="Category name" />
	</div>

	<div class="w-fit">
		<button
			class="shadow_button_red shadow_button_thin text-13 text-brand-error"
			onclick={() => handleItemDelete(item?._id)}
		>
			Delete
		</button>
	</div>
</div>
