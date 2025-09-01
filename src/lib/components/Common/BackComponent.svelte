<script lang="ts">
	import { MoveLeft } from '@lucide/svelte';

	let { backLink, title }: { backLink: string; title?: string } = $props();
</script>

<div>
	<a href={backLink} class="inline-flex items-center gap-4">
		<MoveLeft />

		{#if title}
			<span class="text-lg">{title}</span>
		{/if}
	</a>
</div>
