<script lang="ts">
	import { Search, X } from '@lucide/svelte';

	let { searchQuery = $bindable(), placeholder = 'Search', ...restProps } = $props();

	function clearField() {
		searchQuery = '';
	}
</script>

<div class="input_wrapper flex w-full rounded-xl border-2 bg-white">
	<div class="flex min-w-fit items-center px-2">
		<Search strokeWidth={3} color="#1eb564" />
	</div>
	<div class="flex-1">
		<input
			{placeholder}
			type="text"
			bind:value={searchQuery}
			class="relative z-10 h-[50px] w-full rounded-xl px-2 outline-none placeholder:font-light"
			{...restProps}
		/>
	</div>

	<div class={`absolute right-3 bottom-[14px] z-40`}>
		<button
			type="button"
			class="bg-brand-light flex h-6 w-6 items-center justify-center rounded-full border-[1.5px] border-gray-700"
			onclick={clearField}
		>
			<X size="14px" />
		</button>
	</div>
</div>

<style>
	.input_wrapper {
		position: relative;
	}
</style>
