<script lang="ts">
	import { ShoppingRequest } from '$lib/requests';
	import { closeCreateListModal, modalsState } from '$lib/state/modal.svelte';
	import { addToast } from '$lib/store/toast';
	import BasicButton from '../Common/Form/BasicButton.svelte';
	import ModalWrapper from '../Common/ModalWrapper.svelte';
	import BasicInputField from '../Common/Form/BasicInputField.svelte';
	import { ShoppingStatus } from '../../../types/shopping';
	import { goto } from '$app/navigation';

	let { user } = $props();

	let isSubmitting = $state(false);
	let boardName = $state('');

	async function handleSubmit(e: any) {
		e.preventDefault();

		try {
			isSubmitting = true;

			const payload = {
				name: boardName,
				ownerId: user?._id,
				status: ShoppingStatus.PENDING
			};

			const result = await ShoppingRequest.createBoard(payload);

			if (result) {
				addToast('List created', 'success', { imgLink: '/images/confetti.svg' });
				const listId = result.data._id;
				closeCreateListModal();
				goto(`/shopping/${listId}`);
			}
		} catch (error: any) {
			addToast(error?.message, 'error');
		} finally {
			isSubmitting = false;
		}
	}
</script>

<ModalWrapper
	isOpen={modalsState.data.isOpenCreateList}
	onClose={closeCreateListModal}
	label={'New Shopping List'}
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
				<BasicButton label="Create" isLoading={isSubmitting} variant="primary" type="submit" />
			</div>
		</form>
	</div>
</ModalWrapper>
