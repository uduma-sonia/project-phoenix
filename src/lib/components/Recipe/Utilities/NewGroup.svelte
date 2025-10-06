<script lang="ts">
	import BasicInputField from '$lib/components/Common/Form/BasicInputField.svelte';
	import { recipeRequest } from '$lib/requests';
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
				name: groupName
			};

			groupName = '';
			const result = await recipeRequest.createRecipeGroup(payload);

			if (result) {
				queryClient.invalidateQueries({
					queryKey: queryKeys.getRecipeGroups
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

<form class="flex h-[56px] items-center gap-4" onsubmit={handleSubmit}>
	<div class="max-w-[400px] flex-1">
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
		<button type="button" class="shadow_button shadow_button_red shadow_button_thin_red">
			Cancel
		</button>
	</div>
</form>
