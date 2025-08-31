<script lang="ts">
	import { MoveLeft } from '@lucide/svelte';

	let { backLink, title }: { backLink: string; title?: string } = $props();
</script>

<div class="flex items-center gap-4">
	<a href={backLink} class="block">
		<MoveLeft />
	</a>

	{#if title}
		<div>
			<p class="text-lg">{title}</p>
		</div>
	{/if}
</div>
