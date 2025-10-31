<script lang="ts">
	import Profile from '../Profile/Profile.svelte';
	import { closeProfile, modalsState, openProfile } from '$lib/state/modal.svelte';
	import { Play } from '@lucide/svelte';
	import Avatar from './Avatar.svelte';
	import useCurrentUser from '$lib/hooks/useCurrentUser';

	let userQuery = useCurrentUser();
	let user = $derived($userQuery?.data?.data?.user);
</script>

<div class="inline- flex h-full items-center justify-between px-3 py-4">
	<div class="w-full">
		<button class="flex items-center gap-2" onclick={openProfile}>
			<Avatar src={user?.avatar} />
			<span>
				<Play />
			</span>

			<span class="relative text-left">
				<span class="font-suez text-xl sm:text-2xl">Hi {user?.username}</span>
			</span>
		</button>
	</div>
</div>

<Profile onClose={closeProfile} isOpen={modalsState.data.isOpenProfile} />
