<script lang="ts">
	import { page } from '$app/state';
	import BasicInputField from '$lib/components/Common/Form/BasicInputField.svelte';
	import { tripRequest } from '$lib/requests';
	import { addToast } from '$lib/store/toast';
	import { queryKeys } from '$lib/utils/queryKeys';
	import { useQueryClient } from '@tanstack/svelte-query';

	let { toggleView } = $props();

	const queryClient = useQueryClient();

	let groupName = $state('');
	let isLoading = $state(false);

	async function handleSubmit(e: any) {
		e.preventDefault();
		if (!groupName) return false;
		try {
			isLoading = true;
			const payload = {
				name: groupName,
				tripId: page.params.id
			};

			groupName = '';

			const result = await tripRequest.createTripActivityGroup(payload);

			if (result) {
				queryClient.invalidateQueries({
					queryKey: queryKeys.getTripActivityGroups(page.params.id)
				});
				toggleView();
			}
		} catch (error: any) {
			addToast(error?.message || 'An error occured', 'error');
		} finally {
			isLoading = false;
		}
	}
</script>

<form class="flex items-center gap-4" onsubmit={handleSubmit}>
	<div>
		<BasicInputField autofocus={true} bind:value={groupName} placeholder="Group name" />
	</div>

	<div class="flex items-center gap-3">
		<button type="submit" class="shadow_button shadow_button_thin">
			{#if isLoading}
				<div class="spinner_white_sm border-2 border-black"></div>
			{:else}
				Save
			{/if}
		</button>
		<button
			onclick={toggleView}
			type="button"
			class="shadow_button shadow_button_red shadow_button_thin_red"
		>
			Cancel
		</button>
	</div>
</form>
