<script lang="ts">
	let {
		showSettings = false,
		data,
		handleItemDelete,
		handleAddToList,
		boardId
	}: {
		showSettings?: boolean;
		boardId?: string;
		data: { _id: string; name: string };
		handleItemDelete?: (id: string) => void;
		handleAddToList?: (boardId?: any, name?: string) => void;
	} = $props();
</script>

<div class="item_wrapper border-b border-b-gray-300">
	<div class="relative z-10 w-full gap-3 rounded-lg bg-white p-3">
		<div class="flex items-center gap-4">
			<div class="font-lexend flex-1 space-y-1 font-light">
				<div class="flex">
					<p>{data?.name}</p>
				</div>
			</div>

			{#if showSettings}
				<div class="flex items-center gap-4">
					<button class="text-sm hover:underline"> Edit </button>
					<button
						class="text-sm text-red-500 hover:underline"
						onclick={() => handleItemDelete?.(data?._id)}
						>Remove
					</button>
				</div>
			{:else}
				<div>
					<button
						class="text-sm hover:underline"
						onclick={() => handleAddToList?.(boardId, data?.name)}
					>
						Add to list
					</button>
				</div>
			{/if}
		</div>
	</div>
</div>
