<script lang="ts">
	import { Plus } from '@lucide/svelte';
	import Tooltip from './Tooltip.svelte';

	let { link, tooltipText, action }: { link: string; tooltipText?: string; action?: () => void } =
		$props();
</script>

<div
	class="fixed bottom-14 left-1/2 z-50 flex w-full max-w-[1000px] -translate-x-1/2 items-center justify-end px-4 pb-8 md:bottom-0"
>
	<Tooltip text={tooltipText || ''}>
		{#if link}
			<a href={link} class="block">
				<button class="create_button shadow_button">
					<Plus />
				</button>
			</a>
		{:else}
			<button onclick={() => action?.()} class="create_button shadow_button">
				<Plus />
			</button>
		{/if}
	</Tooltip>
</div>
