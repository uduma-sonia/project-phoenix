<script lang="ts">
	let { handleItemAdd, boardId } = $props();
	let itemName = $state('');
</script>

<div class="relative z-10 w-full gap-3 rounded-lg border-2 bg-white p-3">
	<form
		class="flex items-center gap-4"
		onsubmit={(e) => {
			e.preventDefault();
			handleItemAdd(itemName, boardId);
			itemName = '';
		}}
	>
		<input
			type="text"
			bind:value={itemName}
			class="h-[50px] w-full border-b border-b-[#393838] outline-none"
			placeholder="Type and enter"
		/>
	</form>
</div>
