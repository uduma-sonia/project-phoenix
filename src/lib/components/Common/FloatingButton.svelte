<script lang="ts">
	import { Plus } from '@lucide/svelte';
	import Tooltip from './Tooltip.svelte';

	let { link, tooltipText }: { link: string; tooltipText?: string } = $props();
</script>

<div
	class="fixed bottom-0 left-1/2 z-50 flex w-full max-w-[1000px] -translate-x-1/2 items-center justify-end px-4 pb-8"
>
	<Tooltip text={tooltipText || ''}>
		<a href={link} class="block">
			<button class="create_button shadow_button">
				<Plus />
			</button>
		</a>
	</Tooltip>
</div>
