<script lang="ts">
	import { UserRequest } from '$lib/requests';
	import { addToast } from '$lib/store/toast';
	import { queryKeys } from '$lib/utils/queryKeys';
	import Avatar from '../Common/Avatar.svelte';
	import { useQueryClient } from '@tanstack/svelte-query';

	let { user } = $props();

	let username = $derived(user?.username);
	let email = $derived(user?.email);
	let isLoading = $state(false);
	const queryClient = useQueryClient();

	async function onSubmit() {
		try {
			isLoading = true;

			const result = await UserRequest.updateUser(user?._id, { username, email });

			if (result) {
				queryClient.invalidateQueries({ queryKey: queryKeys.getCurrentUser });
			}
		} catch (error: any) {
			addToast(error || 'An error occured', 'error');
		} finally {
			isLoading = false;
		}
	}
</script>

<div>
	<p class="mb-4 text-lg">Profile</p>

	<div class="mt-0">
		<Avatar src={user?.avatar} />
		<div class="mt-7 mb-6 space-y-4">
			<div>
				<label for="email" class="mb-2">Username</label>
				<input
					bind:value={username}
					type="email"
					id="email"
					name="email"
					required
					autocomplete="email"
					class="h-[50px] w-full rounded-lg border-2 border-black px-3 outline-none"
				/>
			</div>
			<div>
				<label for="email" class="mb-2">Email</label>
				<input
					bind:value={email}
					type="email"
					id="email"
					name="email"
					required
					autocomplete="email"
					class="h-[50px] w-full rounded-lg border-2 border-black px-3 outline-none"
				/>
			</div>
		</div>

		<div>
			<button class="shadow_button" type="submit" onclick={onSubmit}>
				{#if isLoading}
					<div class="spinner_white border-2 border-black"></div>
				{:else}
					Continue
				{/if}
			</button>
		</div>
	</div>
</div>
