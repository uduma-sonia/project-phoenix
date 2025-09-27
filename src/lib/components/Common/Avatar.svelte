<script lang="ts">
	let {
		src,
		height = '64px',
		width = '64px'
	}: { src?: string; height?: string; width?: string } = $props();
</script>

<div class="rounded-lg border-2 sm:h-20 sm:w-20" style="height: {height}; width: {width};">
	{#if src}
		<img alt="avatar" {src} />
	{/if}
</div>
