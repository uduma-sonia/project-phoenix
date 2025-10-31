<script lang="ts">
	import { Plus } from '@lucide/svelte';
	import Tooltip from './Tooltip.svelte';

	let { link, tooltipText }: { link: string; tooltipText?: string } = $props();
</script>

<div
	class="fixed bottom-14 left-1/2 z-50 flex w-full max-w-[1000px] -translate-x-1/2 items-center justify-end px-4 pb-8 md:bottom-0"
>
	<Tooltip text={tooltipText || ''}>
		<a href={link} class="block">
			<button class="create_button shadow_button">
				<Plus />
			</button>
		</a>
	</Tooltip>
</div>

<!-- <div class="slide_in_up fixed bottom-20 left-1/2 -translate-x-1/2 md:bottom-5"> -->
