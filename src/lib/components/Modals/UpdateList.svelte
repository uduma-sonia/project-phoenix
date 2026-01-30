<script lang="ts">
	import { ShoppingRequest } from '$lib/requests';
	import { closeCreateListModal, closeUpdateListModal, modalsState } from '$lib/state/modal.svelte';
	import { addToast } from '$lib/store/toast';
	import BasicButton from '../Common/Form/BasicButton.svelte';
	import ModalWrapper from '../Common/ModalWrapper.svelte';
	import BasicInputField from '../Common/Form/BasicInputField.svelte';
	import { ShoppingStatus } from '../../../types/shopping';
	import { page } from '$app/state';
	import { queryKeys } from '$lib/utils/queryKeys';
	import { useQueryClient } from '@tanstack/svelte-query';

	let { boardDetails } = $props();

	let isSubmitting = $state(false);
	let boardName = $state(boardDetails?.name);

	let queryClient = useQueryClient();

	async function handleSubmit(e: any) {
		e.preventDefault();

		try {
			isSubmitting = true;

			const payload = {
				name: boardName,
				status: ShoppingStatus.PENDING
			};

			const result = await ShoppingRequest.updateBoard(page.params.id, payload);

			if (result) {
				addToast('List Updated', 'success', { imgLink: '/images/confetti.svg' });
				closeUpdateListModal();
				queryClient.invalidateQueries({ queryKey: queryKeys.getBoard(page.params.id) });
			}
		} catch (error: any) {
			addToast(error?.message, 'error');
		} finally {
			isSubmitting = false;
		}
	}
</script>

<ModalWrapper
	isOpen={modalsState.data.isOpenUpdateList}
	onClose={closeUpdateListModal}
	label={'Update Shopping List'}
>
	<div class="p-4">
		<form onsubmit={handleSubmit}>
			<div class="mb-10 space-y-4">
				<BasicInputField
					type="text"
					id="boardName"
					name="boardName"
					bind:value={boardName}
					required
					label="Name"
					placeholder="eg., General shopping, Skincare list, etc"
				/>
			</div>

			<div class="mt-8 flex items-center justify-end gap-5">
				<BasicButton label="Cancel" variant="error" action={closeCreateListModal} />
				<BasicButton label="Update" isLoading={isSubmitting} variant="primary" type="submit" />
			</div>
		</form>
	</div>
</ModalWrapper>
