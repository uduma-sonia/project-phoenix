<script lang="ts">
	import { onMount } from 'svelte';

	type Props = {
		src: string;
		className?: string;
		alt?: string;
		noImgClassName?: string;
		noImageText?: string;
		fadeIn?: boolean;
		withLoadingAnimation?: boolean;
		fetchpriority?: 'high' | 'low' | 'auto';
	};

	let {
		src,
		className,
		alt = '',
		fadeIn = true,
		withLoadingAnimation = false,
		noImgClassName,
		noImageText,
		fetchpriority = 'auto'
	}: Props = $props();

	let hasLoaded = $state(false);
	let hasError = $state(false);

	// onMount(() => {
	// 	const img = new Image();
	// 	img.src = src;

	// 	img.onload = () => {
	// 		hasLoaded = true;
	// 	};

	// 	img.onerror = () => {
	// 		hasError = true;
	// 	};
	// });

	let loaded = $state(false);
	let failed = $state(false);
	let loading = $state(true);

	$effect(() => {
		const img = new Image();
		img.src = src;
		loading = true;

		img.onload = () => {
			loading = false;
			loaded = true;
		};
		img.onerror = () => {
			loading = false;
			failed = true;
		};
	});
</script>

<!-- {#if hasLoaded && !hasError}
	<img
		{fetchpriority}
		{src}
		{alt}
		class={className}
		class:fade_in={fadeIn}
		class:opacity_0={fadeIn}
	/>
{/if}

{#if !hasLoaded && hasError}
	<p class="font-lexend text-10 text-center font-light text-black">This image cannot be loaded</p>
{/if}

{#if withLoadingAnimation}
	{#if !hasLoaded && !hasError}
		<div class="flex h-full w-full items-center justify-center">
			<span class="spinner_white border-2 border-black"></span>
		</div>
	{/if}
{/if}
 -->

{#if loaded}
	<img
		{src}
		{fetchpriority}
		{alt}
		class="border {className}"
		class:fade_in={fadeIn}
		class:opacity_0={fadeIn}
	/>
{:else if failed}
	{#if noImageText}
		<p class="font-lexend text-8 text-brand-grey-text text-center {noImgClassName}">
			{noImageText}
		</p>
	{:else}
		<img src="/images/no_image.svg" class="opacity-80 {noImgClassName}" {alt} />
	{/if}
{:else if loading}
	<div class="flex h-full w-full items-center justify-center">
		<span class="spinner_white border-2 border-black"></span>
	</div>
{/if}

<style>
	.opacity_0 {
		opacity: 0;
	}
</style>
