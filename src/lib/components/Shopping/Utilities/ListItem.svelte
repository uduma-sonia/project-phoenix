<script lang="ts">
	import { Check } from '@lucide/svelte';

	let { data, handleUpdateItem, boardId } = $props();

	let qty = data?.quantity > 0 ? data?.quantity : '';
</script>

<div class="item_wrapper">
	<div class="relative z-10 w-full gap-3 rounded-lg border-2 border-black bg-white p-3">
		<div class="flex items-center gap-4">
			<div>
				<button
					class="button_active relative flex h-7 w-7 items-center justify-center rounded-md border-2 p-0"
					aria-label="Checklist"
					onclick={() => handleUpdateItem(data?._id, !data?.done)}
				>
					{#if data?.done}
						<Check size="22px" />
					{/if}
				</button>
			</div>

			<div class="font-lexend flex-1 space-y-1 font-light">
				<div class="flex">
					<p>{qty} {data?.name}</p>
				</div>
				{#if data?.price > 0}
					<p class="text-sm">{data?.currency}{data?.price.toLocaleString()}</p>
				{/if}
			</div>

			<div class="flex flex-col items-center gap-4">
				<!-- <button>
					<X color="#a30309" />
				</button> -->

				<!-- <button>
					<SquarePen size="20px" class="cursor-pointer" strokeWidth={2} color="#1eb564" />
				</button> -->
			</div>
		</div>
	</div>
</div>

<style>
	.item_wrapper {
		position: relative;
		border-radius: 8px;
		transition: all 0.4s linear;
	}

	.item_wrapper::before {
		content: '';
		position: absolute;
		top: 1px;
		left: 1px;
		right: 0;
		bottom: 0;
		background-color: black;
		border: 2px solid black;
		z-index: 1;
		border-radius: 8px;
		width: 100%;
		height: 100%;
	}
</style>
