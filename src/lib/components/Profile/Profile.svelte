<script lang="ts">
	import { Play, LogOutIcon } from '@lucide/svelte';
	import ModalWrapper from '../Common/ModalWrapper.svelte';
	import { createQuery, useQueryClient } from '@tanstack/svelte-query';
	import Helpers from '$lib/utils/helpers';
	import { goto } from '$app/navigation';
	import UserProfile from './UserProfile.svelte';
	import Security from './Security.svelte';
	import { UserRequest } from '$lib/requests';
	import { queryKeys } from '$lib/utils/queryKeys';
	import { closeProfile } from '$lib/state/modal.svelte';
	import Appearance from './Appearance.svelte';
	import { PAGE_REDIRECTED_FROM_KEY } from '$lib/constants/global';

	let { onClose, isOpen } = $props();

	let currentView = $state('profile');

	const queryClient = useQueryClient();

	const userQuery = createQuery({
		queryKey: queryKeys.getCurrentUser,
		queryFn: () => UserRequest.getCurrentUser()
	});

	let user = $derived($userQuery?.data?.data?.user);

	function changeView(params: string) {
		currentView = params;
	}

	const handleLogout = async () => {
		Helpers.deleteCookie('id');
		sessionStorage.removeItem(PAGE_REDIRECTED_FROM_KEY);
		closeProfile();
		goto('/login');
		queryClient.clear();
	};
</script>

<ModalWrapper {onClose} {isOpen} maxWidth="max-w-[500px] md:max-w-[800px]" label="Profile">
	<div class="flex items-stretch gap-2 p-4 pb-20">
		<div class="w-full md:w-1/2 md:border-r-2 md:pr-4">
			<div class="space-y-3">
				<button
					class="shadow_button rfjnjc flex items-center justify-between"
					onclick={() => changeView('profile')}
				>
					Profile

					{#if currentView === 'profile'}
						<Play />
					{/if}
				</button>
				<button
					class="shadow_button rfjnjc flex items-center justify-between"
					onclick={() => changeView('appearance')}
				>
					Appearance
					{#if currentView === 'appearance'}
						<Play />
					{/if}
				</button>
				<button
					class="shadow_button rfjnjc flex items-center justify-between"
					onclick={() => changeView('security')}
				>
					Security
					{#if currentView === 'security'}
						<Play />
					{/if}
				</button>
				<button class="shadow_button rfjnjc flex items-center justify-between">
					Subscription
				</button>
				<button class="shadow_button rfjnjc flex items-center justify-between"> Theme </button>
				<button class="shadow_button rfjnjc flex items-center justify-between"> Help </button>
			</div>
			<div class="mt-6">
				<button
					class="shadow_button_red rfjnjc flex items-center justify-between text-red-600"
					onclick={handleLogout}
				>
					Logout

					<LogOutIcon />
				</button>
			</div>
		</div>

		<div class="hidden w-1/2 md:block">
			{#if currentView == 'profile'}
				<UserProfile {user} />
			{/if}
			{#if currentView == 'appearance'}
				<Appearance {user} />
			{/if}
			{#if currentView == 'security'}
				<Security />
			{/if}
		</div>
	</div>
</ModalWrapper>

<style>
	.rfjnjc {
		background-color: white !important;
		box-shadow: 1px 1px black !important;
	}
</style>
