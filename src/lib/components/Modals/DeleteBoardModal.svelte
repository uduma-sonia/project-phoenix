<script lang="ts">
	import { shoppingRequest } from '$lib/requests';
	import { closeBoardDeleteModal, modalsState } from '$lib/state/modal.svelte';
	import { addToast } from '$lib/store/toast';
	import { useQueryClient } from '@tanstack/svelte-query';
	import BasicButton from '../Common/BasicButton.svelte';
	import ModalWrapper from '../Common/ModalWrapper.svelte';
	import { queryKeys } from '$lib/utils/queryKeys';
	import { goto } from '$app/navigation';
	import { selectedBoard } from '$lib/state/shopping.svelte';

	const queryClient = useQueryClient();

	let isLoading = $state(false);

	async function handleDelete(id: string) {
		try {
			isLoading = true;
			await shoppingRequest.deleteBoard(id);
			addToast('Board deleted', 'success');
			queryClient.invalidateQueries({ queryKey: queryKeys.getInvitedBoards });
			closeBoardDeleteModal();
			goto('/shopping');
		} catch (error: any) {
			addToast(error?.message || 'An error occured', 'error');
		} finally {
			isLoading = false;
		}
	}
</script>

<ModalWrapper
	isOpen={modalsState.data.isOpenBoardDeleteModal}
	onClose={closeBoardDeleteModal}
	label={`Delete board`}
>
	<div class="p-4">
		<p class="font-lexend text-center">Do you want to delete this board?</p>

		<p class="font-lexend text-center text-sm font-light">{selectedBoard?.data?.name}</p>

		<div class="mt-8 flex items-center justify-end gap-5">
			<BasicButton label="Cancel" variant="error" action={closeBoardDeleteModal} />
			<BasicButton
				label="Delete"
				{isLoading}
				variant="primary"
				action={() => handleDelete(selectedBoard?.data?._id as string)}
			/>
		</div>
	</div>
</ModalWrapper>
