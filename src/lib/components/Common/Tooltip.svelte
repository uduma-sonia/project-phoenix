<script lang="ts">
	type Position = 'top' | 'bottom' | 'left' | 'right';

	let {
		text,
		children,
		position = 'left'
	}: { text: string; children: any; position?: Position } = $props();
</script>

<div class="tooltip">
	{@render children()}
	{#if text}
		<span class="tooltiptext {position}">{text}</span>
	{/if}
</div>

<style>
	.tooltip {
		position: relative;
		display: inline-block;
	}

	.tooltiptext {
		visibility: hidden;
		position: absolute;
		z-index: 1;
		background: #ffffff;
		color: black;
		padding: 4px 6px;
		border-radius: 6px;
		box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
		text-align: center;
		font-size: 11px;
		font-weight: 500;
		font-family: 'Montserrat Variable', sans-serif;
		border: 1px solid black;
		min-width: max-content;
		transition: all 0.2s linear;
	}

	.tooltiptext.left {
		right: 110%;
		top: 50%;
		transform: translateY(-50%);
	}

	.tooltiptext.right {
		left: 110%;
		top: 50%;
		transform: translateY(-50%);
	}

	.tooltiptext.top {
		bottom: 110%;
		left: 50%;
		transform: translateX(-50%);
	}

	.tooltiptext.bottom {
		top: 110%;
		left: 50%;
		transform: translateX(-50%);
	}

	.tooltip:hover .tooltiptext {
		visibility: visible;
		transition-delay: 300ms;
	}

	.tooltiptext {
		transition-delay: 0ms;
	}
</style>
