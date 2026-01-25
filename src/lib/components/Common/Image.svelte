<script lang="ts">
	import { onMount } from 'svelte';

	type Props = {
		src: string;
		className?: string;
		alt?: string;
		fadeIn?: boolean;
		fetchpriority?: 'high' | 'low' | 'auto';
	};

	let { src, className, alt = '', fadeIn = true, fetchpriority }: Props = $props();

	let hasLoaded = $state(false);
	let hasError = $state(false);

	onMount(() => {
		const img = new Image();
		img.src = src;

		img.onload = () => {
			hasLoaded = true;
		};

		img.onerror = () => {
			hasError = true;
		};
	});
</script>

{#if hasLoaded && !hasError}
	<img
		{fetchpriority}
		{src}
		{alt}
		class={className}
		class:fade_in={fadeIn}
		class:opacity_0={fadeIn}
	/>
{/if}

{#if hasError}
	<p class="font-lexend text-center text-xs font-light text-black">This image cannot be loaded</p>
{/if}

{#if !hasLoaded && !hasError}
	<div class="flex h-full w-full items-center justify-center">
		<span class="spinner_white border-2 border-black"></span>
	</div>
{/if}

<style>
	.opacity_0 {
		opacity: 0;
	}
</style>
