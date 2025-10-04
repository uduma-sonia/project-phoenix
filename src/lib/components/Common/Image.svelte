<script lang="ts">
	import { onMount } from 'svelte';

	let {
		src,
		className,
		alt = '',
		fadeIn = true
	}: { src: string; className?: string; alt?: string; fadeIn?: boolean } = $props();

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

{#if hasLoaded}
	<img {src} {alt} class={className} class:fade_in={fadeIn} class:opacity_0={fadeIn} />
{/if}

{#if !hasLoaded && hasError}
	<p class="font-lexend text-xs font-light text-white">This image cannot be loaded</p>
{/if}

<style>
	.opacity_0 {
		opacity: 0;
	}
</style>
