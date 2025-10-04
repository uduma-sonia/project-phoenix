<script lang="ts">
	import { X } from '@lucide/svelte';

	let { searchQuery = $bindable(), placeholder = 'Search', ...restProps } = $props();

	function clearField() {
		searchQuery = '';
	}
</script>

<div class="flex max-w-[300px] flex-1 gap-3">
	<div class="max-w-[300px] flex-1">
		<div class="input_wrapper">
			<input
				{placeholder}
				type="text"
				bind:value={searchQuery}
				class="relative z-10 h-[50px] w-full max-w-[350px] rounded-lg border-2 border-black bg-white px-3 outline-none placeholder:font-light"
				{...restProps}
			/>

			<div class={`absolute right-3 bottom-[14px] z-40`}>
				<button
					type="button"
					class="bg-brand-light flex h-5 w-5 items-center justify-center rounded-full border border-gray-300"
					onclick={clearField}
				>
					<X size="14px" />
				</button>
			</div>
		</div>
	</div>
</div>

<style>
	.input_wrapper {
		position: relative;
	}

	.input_wrapper::before {
		content: '';
		position: absolute;
		top: 5px;
		left: 5px;
		right: 0;
		bottom: 0;
		border: 2px solid black;
		z-index: 1;
		border-radius: 8px;
		width: 100%;
		height: 100%;
	}
</style>
