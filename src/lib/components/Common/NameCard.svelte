<script lang="ts">
	import Profile from '../Profile/Profile.svelte';

	import { closeProfile, modalsState, openProfile } from '$lib/state/modal.svelte';
</script>

<div class="flex h-full items-center justify-between py-4">
	<button class="flex items-center gap-4" onclick={openProfile}>
		<div class="h-16 w-16 rounded-lg border-2 sm:h-20 sm:w-20"></div>

		<p class="font-suez text-xl sm:text-2xl">Hi Sonia</p>
	</button>
</div>

<Profile onClose={closeProfile} isOpen={modalsState.data.isOpenProfile} />
