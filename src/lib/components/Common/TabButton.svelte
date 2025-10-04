<script lang="ts">
	import type { Component } from 'svelte';

	type Props = {
		currentTab: string;
		name: string;
		changeTab: (name: string) => void;
		LeftIcon?: ConstructorOfATypedSvelteComponent | Component<any, any, any> | null | undefined;
	};

	let { currentTab, name, changeTab, LeftIcon }: Props = $props();
</script>

<div class="min-w-[100px] sm:min-w-[100px]">
	<button
		class="bg-brand-rose font-lexend button_active flex h-[50px] w-full min-w-max items-center justify-center gap-1 rounded-lg border-2 border-black px-3 text-sm font-normal sm:text-base"
		onclick={() => changeTab(name)}
		class:selected={currentTab === name}
	>
		{#if LeftIcon}
			<LeftIcon size="16px" strokeWidth="2px" />
		{/if}
		{name}
	</button>
</div>

<style>
	.selected {
		background-color: #c2e08a !important;
	}
</style>
