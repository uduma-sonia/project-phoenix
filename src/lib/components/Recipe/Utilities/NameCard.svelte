<script lang="ts">
	import { openProfile } from '$lib/state/modal.svelte';

	let { username = 'ss' } = $props();
</script>

<div class="flex h-full items-center justify-between px-3 py-4">
	<button class="flex items-center gap-4" onclick={openProfile}>
		<div class="h-16 w-16 rounded-lg border-2 sm:h-20 sm:w-20"></div>

		<p class="font-suez text-xl sm:text-2xl">{username}</p>
	</button>
</div>
