<script lang="ts">
	import { onMount } from 'svelte';

	// Props interface
	interface Props {
		percentage: number;
		size?: number;
		animationDuration?: number;
		innerBgColor?: string;
		progressColor?: string;
		fontSize?: string;
		withAnimation?: boolean;
		chartText?: string;
		showText?: boolean;
		innerText?: string | number;
	}

	let {
		percentage,
		size = 50,
		animationDuration = 1000,
		innerBgColor = 'white',
		progressColor = '#2b731d',
		fontSize = '10px',
		withAnimation = true,
		chartText = '',
		showText = true,
		innerText
	}: Props = $props();

	let currentPercentage = $state(0);

	const rotateValue = $derived((currentPercentage || percentage) * 3.6);
	const _size = $derived(`${size}px`);

	function animateProgress() {
		if (!withAnimation) {
			currentPercentage = percentage;
			return;
		}

		let start: number;
		const animate = (timestamp: number) => {
			if (!start) start = timestamp;
			const elapsed = timestamp - start;

			const progress = Math.min(elapsed / animationDuration, 1);
			const newPercentage = Math.round(progress * percentage);

			currentPercentage = newPercentage;

			if (progress < 1) {
				requestAnimationFrame(animate);
			}
		};

		requestAnimationFrame(animate);
	}

	onMount(() => {
		animateProgress();
	});

	$effect(() => {
		animateProgress();
	});
</script>

<div class="circular-progress-container" style="width: {_size}; height: {_size};">
	<div
		class="progress-ring"
		style="
			width: {_size}; 
			height: {_size};
			background: conic-gradient(
				{progressColor} {rotateValue}deg,
				{progressColor}20 {rotateValue}deg
			);
		"
	>
		<div class="inner-circle" style="background-color: {innerBgColor};">
			{#if innerText}
				<div class="chart-text" style="font-size: {fontSize};">
					{innerText}
				</div>
			{/if}
		</div>
	</div>
</div>

<style>
	.circular-progress-container {
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.progress-ring {
		position: relative;
		border-radius: 50%;
		transition: background 0.3s ease-in-out;
	}

	.inner-circle {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		width: 80%;
		height: 80%;
		border-radius: 50%;
		display: flex;
		justify-content: center;
		align-items: center;
		box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.1);
	}
</style>
