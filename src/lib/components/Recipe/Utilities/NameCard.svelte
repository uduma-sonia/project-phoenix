<script lang="ts">
	import Avatar from '$lib/components/Common/Avatar.svelte';
	import { openProfile } from '$lib/state/modal.svelte';

	let { username = 'ss', avatar } = $props();
</script>

<div class="flex h-full items-center justify-between px-3 py-4">
	<button class="flex items-center gap-4" onclick={openProfile}>
		<Avatar src={avatar} />

		<p class="font-suez text-xl sm:text-2xl">{username}</p>
	</button>
</div>
