<script lang="ts">
	import Profile from '../Profile/Profile.svelte';
	import { createQuery } from '@tanstack/svelte-query';
	import { closeProfile, modalsState, openProfile } from '$lib/state/modal.svelte';
	import { queryKeys } from '$lib/utils/queryKeys';
	import { UserRequest } from '$lib/requests';

	const userQuery = createQuery({
		queryKey: queryKeys.getCurrentUser,
		queryFn: () => UserRequest.getCurrentUser()
	});

	let user = $derived($userQuery?.data?.data?.user);
</script>

<div class="flex h-full items-center justify-between py-4">
	<button class="flex items-center gap-4" onclick={openProfile}>
		<div class="h-16 w-16 rounded-lg border-2 sm:h-20 sm:w-20"></div>

		<p class="font-suez text-xl sm:text-2xl">Hi {user?.username}</p>
	</button>
</div>

<Profile onClose={closeProfile} isOpen={modalsState.data.isOpenProfile} />
