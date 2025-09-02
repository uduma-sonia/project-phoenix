<script lang="ts">
	import { Plus } from '@lucide/svelte';

	let { link } = $props();
</script>

<div
	class="fixed bottom-0 left-1/2 z-50 flex w-full max-w-[1000px] -translate-x-1/2 items-center justify-end px-5 pb-8"
>
	<a href={link} class="block">
		<button class="create_button shadow_button">
			<Plus />
		</button>
	</a>
</div>
