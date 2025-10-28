<script lang="ts">
	import { RecipeRequest } from '$lib/requests';
	import { closeDeleteModal, modalsState } from '$lib/state/modal.svelte';
	import { selectedRecipe } from '$lib/state/recipe.svelte';
	import { addToast } from '$lib/store/toast';
	import { useQueryClient } from '@tanstack/svelte-query';
	import BasicButton from '../Common/Form/BasicButton.svelte';
	import ModalWrapper from '../Common/ModalWrapper.svelte';
	import { queryKeys } from '$lib/utils/queryKeys';
	import { goto } from '$app/navigation';

	let { label = '' } = $props();
	const queryClient = useQueryClient();

	let isLoading = $state(false);

	async function handleDelete(id: string) {
		try {
			isLoading = true;
			await RecipeRequest.deleteRecipe(id);
			addToast('Recipe deleted', 'success');
			queryClient.invalidateQueries({ queryKey: queryKeys.getRecipes });
			closeDeleteModal();
			goto('/recipe');
		} catch (error: any) {
			addToast(error?.message || 'An error occured', 'error');
		} finally {
			isLoading = false;
		}
	}
</script>

<ModalWrapper
	isOpen={modalsState.data.isOpenDeleteModal}
	onClose={closeDeleteModal}
	label={`Delete ${label}`}
>
	<div class="p-4">
		<p class="font-lexend text-center">Do you want to delete this {label}</p>

		<p class="font-lexend text-center text-sm font-light">{selectedRecipe?.data?.name}</p>

		<div class="mt-8 flex items-center justify-end gap-5">
			<BasicButton label="Cancel" variant="error" action={closeDeleteModal} />
			<BasicButton
				label="Delete"
				{isLoading}
				variant="primary"
				action={() => handleDelete(selectedRecipe?.data?._id as string)}
			/>
		</div>
	</div>
</ModalWrapper>
