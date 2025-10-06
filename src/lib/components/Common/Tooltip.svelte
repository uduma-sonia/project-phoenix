<script lang="ts">
	let { text, children } = $props();
</script>

<div class="tooltip">
	{@render children()}
	{#if text}
		<span class="tooltiptext">{text}</span>
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
		right: 110%;
		top: 50%;
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
		transform: translateY(-50%);
		transition: all 0.2s linear;
	}

	.tooltip:hover .tooltiptext {
		visibility: visible;
	}
</style>
