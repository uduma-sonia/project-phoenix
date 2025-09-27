<script lang="ts">
	import { page } from '$app/state';
	import BasicInputField from '$lib/components/Common/BasicInputField.svelte';
	import { tripRequest } from '$lib/requests';
	import { addToast } from '$lib/store/toast';
	import { queryKeys } from '$lib/utils/queryKeys';
	import { useQueryClient } from '@tanstack/svelte-query';

	let { toggleView } = $props();

	let groupName = $state('');
	const queryClient = useQueryClient();

	let isLoading = $state(false);

	async function handleSubmit(e: any) {
		e.preventDefault();
		try {
			isLoading = true;
			const payload = {
				name: groupName,
				tripId: page.params.id
			};

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

<div class="flex items-center gap-4">
	<div>
		<BasicInputField bind:value={groupName} placeholder="New group" />
	</div>

	<div>
		<button onclick={handleSubmit} class="shadow_button shadow_button_thin"> Save </button>
	</div>
</div>
