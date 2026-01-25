<script lang="ts">
	import { MoveLeft } from '@lucide/svelte';

	let { backLink, title }: { backLink: string; title?: string } = $props();
</script>

<div class="flex items-center gap-3">
	<a
		href={backLink}
		class="inline-flex aspect-square w-10 items-center rounded-lg hover:bg-[#e8ddc1]"
	>
		<MoveLeft />
	</a>

	{#if title}
		<span class="text-lg">{title}</span>
	{/if}
</div>
<!-- <div class="flex items-center gap-3 border">
	<a
		href={backLink}
		class="inline-flex aspect-square w-10 items-center justify-center rounded-full hover:bg-[#e8ddc1]"
	>
		<MoveLeft />
	</a>

	{#if title}
		<span class="text-lg">{title}</span>
	{/if}
</div> -->
