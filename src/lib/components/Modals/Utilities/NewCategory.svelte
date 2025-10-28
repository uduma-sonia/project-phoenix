<script lang="ts">
	import BasicInputField from '$lib/components/Common/Form/BasicInputField.svelte';
	import { PackingRequest } from '$lib/requests';
	import { addToast } from '$lib/store/toast';
	import { queryKeys } from '$lib/utils/queryKeys';
	import { useQueryClient } from '@tanstack/svelte-query';

	let { toggleView } = $props();

	const queryClient = useQueryClient();

	let categoryName = $state('');
	let isLoading = $state(false);

	async function handleSubmit(e: any) {
		e.preventDefault();
		if (!categoryName) return false;
		try {
			isLoading = true;
			const payload = {
				name: categoryName
			};

			categoryName = '';
			const result = await PackingRequest.createCategory(payload);
			if (result) {
				queryClient.invalidateQueries({
					queryKey: queryKeys.getPackingCategories
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
		<BasicInputField autofocus={true} bind:value={categoryName} placeholder="Category name" />
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
			type="button"
			onclick={toggleView}
			class="shadow_button shadow_button_red shadow_button_thin_red"
		>
			Cancel
		</button>
	</div>
</form>
