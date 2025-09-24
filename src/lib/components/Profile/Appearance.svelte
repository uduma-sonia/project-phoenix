<script lang="ts">
	import { avatarSets } from '$lib/constants/global';
	import { UserRequest } from '$lib/requests';
	import { addToast } from '$lib/store/toast';
	import { queryKeys } from '$lib/utils/queryKeys';
	import { useQueryClient } from '@tanstack/svelte-query';

	let { user } = $props();
	let isLoading = $state(false);
	const queryClient = useQueryClient();
	let debounceTimer: any = $state();

	async function onSubmit(url: string) {
		try {
			const result = await UserRequest.updateUser(user?._id, { avatar: url });

			if (result) {
				queryClient.invalidateQueries({ queryKey: queryKeys.getCurrentUser });
			}
		} catch (error: any) {
			addToast(error || 'An error occured', 'error');
		} finally {
			isLoading = false;
		}
	}

	async function handleSubmit(url: string) {
		clearTimeout(debounceTimer);

		debounceTimer = setTimeout(() => {
			onSubmit(url);
		}, 1000);
	}

	const getAvatars = avatarSets.map((item, index) => {
		return `https://robohash.org/${index + 4}?set=${item.id}&size=200x200`;
	});
</script>

<div>
	<p class="mb-4 text-lg">Appearance</p>

	<p class="font-lexend-deca text-sm font-light">Update avatar</p>

	<div class="no-scrollbar mt-4 flex flex-nowrap gap-3 overflow-x-auto">
		{#each getAvatars as item, index (index)}
			<button
				class="block aspect-square w-16 min-w-16 rounded-full bg-[#f3ecec]"
				onclick={() => handleSubmit(item)}
			>
				<img
					src={item}
					alt="robohash avatars"
					class="h-auto max-h-full w-auto max-w-full rounded-full text-xs"
				/>
			</button>
		{/each}
	</div>
</div>
