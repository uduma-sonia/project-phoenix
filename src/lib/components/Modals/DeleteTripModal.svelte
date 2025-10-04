<script lang="ts">
	import { tripRequest } from '$lib/requests';
	import { closeTripDeleteModal, modalsState } from '$lib/state/modal.svelte';
	import { addToast } from '$lib/store/toast';
	import { useQueryClient } from '@tanstack/svelte-query';
	import BasicButton from '../Common/Form/BasicButton.svelte';
	import ModalWrapper from '../Common/ModalWrapper.svelte';
	import { queryKeys } from '$lib/utils/queryKeys';
	import { goto } from '$app/navigation';
	import { selectedTrip } from '$lib/state/trip.svelte';

	const queryClient = useQueryClient();

	let isLoading = $state(false);

	async function handleDelete(id: string) {
		try {
			isLoading = true;
			await tripRequest.deleteTrip(id);
			addToast('Trip deleted', 'success');
			queryClient.invalidateQueries({ queryKey: queryKeys.getTrip });
			closeTripDeleteModal();
			goto('/travel');
		} catch (error: any) {
			addToast(error?.message || 'An error occured', 'error');
		} finally {
			isLoading = false;
		}
	}
</script>

<ModalWrapper
	isOpen={modalsState.data.isOpenTripDeleteModal}
	onClose={closeTripDeleteModal}
	label={`Delete trip`}
>
	<div class="p-4">
		<p class="font-lexend text-center">Do you want to delete this trip?</p>

		<p class="font-lexend text-center text-sm font-light">{selectedTrip?.data?.name}</p>

		<div class="mt-8 flex items-center justify-end gap-5">
			<BasicButton label="Cancel" variant="error" action={closeTripDeleteModal} />
			<BasicButton
				label="Delete"
				{isLoading}
				variant="primary"
				action={() => handleDelete(selectedTrip?.data?._id as string)}
			/>
		</div>
	</div>
</ModalWrapper>
