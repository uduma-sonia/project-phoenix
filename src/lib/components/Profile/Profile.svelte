<script lang="ts">
	import { Play, LogOutIcon, MoveLeft } from '@lucide/svelte';
	import ModalWrapper from '../Common/ModalWrapper.svelte';
	import { useQueryClient } from '@tanstack/svelte-query';
	import Helpers from '$lib/utils/helpers';
	import { goto } from '$app/navigation';
	import { closeProfile } from '$lib/state/modal.svelte';
	import { AUTH_TOKEN, PAGE_REDIRECTED_FROM_KEY, profileLinks } from '$lib/constants/global';
	import Views from './Views.svelte';
	import useCurrentUser from '$lib/hooks/useCurrentUser';

	let { onClose, isOpen } = $props();

	const queryClient = useQueryClient();
	let userQuery = useCurrentUser();

	let currentView = $state('profile');
	let showView = $state(false);

	let user = $derived($userQuery?.data?.data?.user);

	function changeView(params: string) {
		currentView = params;
	}

	async function handleLogout() {
		queryClient.clear();
		Helpers.deleteCookie(AUTH_TOKEN);
		sessionStorage.removeItem(PAGE_REDIRECTED_FROM_KEY);
		closeProfile();
		goto('/login');
	}
</script>

<ModalWrapper
	{onClose}
	{isOpen}
	maxWidth="max-w-[500px] md:max-w-[1000px]"
	label="Account settings"
>
	<div class="flex items-stretch gap-2 p-4 pb-10 md:pb-20">
		{#if !showView}
			<div class="block w-full md:hidden md:w-1/2 md:border-r-2 md:pr-4">
				<div class="space-y-3">
					{#each profileLinks as item, index (index)}
						<button
							class="shadow_button rfjnjc flex items-center justify-between"
							onclick={() => {
								changeView(item.id);
								showView = !showView;
							}}
						>
							{item.label}

							{#if currentView === item.id}
								<Play />
							{/if}
						</button>
					{/each}
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
		{/if}

		<div class="hidden w-full md:block md:w-1/2 md:border-r-2 md:pr-4">
			<div class="space-y-3">
				{#each profileLinks as item, index (index)}
					<button
						class="shadow_button rfjnjc flex items-center justify-between"
						onclick={() => changeView(item.id)}
					>
						{item.label}

						{#if currentView === item.id}
							<Play />
						{/if}
					</button>
				{/each}
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

		{#if showView}
			<div class="block w-full md:hidden">
				<Views {user} {currentView} />

				<div class="mt-8 flex justify-end">
					<button
						onclick={() => (showView = !showView)}
						class="flex h-10 w-10 items-center justify-center rounded-full border"
					>
						<MoveLeft />
					</button>
				</div>
			</div>
		{/if}

		<div class="hidden w-1/2 md:block">
			<Views {user} {currentView} />
		</div>
	</div>
</ModalWrapper>

<style>
	.rfjnjc {
		background-color: white !important;
		box-shadow: 1px 1px black !important;
	}
</style>
