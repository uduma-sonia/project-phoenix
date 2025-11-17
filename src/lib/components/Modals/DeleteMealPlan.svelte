<script lang="ts">
	import { MealRequest } from '$lib/requests';
	import { closeDeleteMealPlanModal, modalsState, selectedMealPlan } from '$lib/state/modal.svelte';
	import { addToast } from '$lib/store/toast';
	import { useQueryClient } from '@tanstack/svelte-query';
	import BasicButton from '../Common/Form/BasicButton.svelte';
	import ModalWrapper from '../Common/ModalWrapper.svelte';
	import { queryKeys } from '$lib/utils/queryKeys';

	const queryClient = useQueryClient();

	let isLoading = $state(false);

	async function handleDelete(id: string) {
		try {
			isLoading = true;
			await MealRequest.deleteMealPlan(id);
			addToast('Meal plan deleted', 'success');
			queryClient.invalidateQueries({ queryKey: queryKeys.getMealPlans });
			closeDeleteMealPlanModal();
			window.location.reload();
		} catch (error: any) {
			addToast(error?.message || 'An error occured', 'error');
		} finally {
			isLoading = false;
		}
	}
</script>

<ModalWrapper
	isOpen={modalsState.data.isDeleteMealPlan}
	onClose={closeDeleteMealPlanModal}
	label={`Delete meal plan`}
>
	<div class="p-4">
		<p class="font-lexend text-center">Do you want to delete this meal plan?</p>

		<p class="font-lexend text-center text-sm font-light">{selectedMealPlan?.data?.value}</p>

		<div class="mt-8 flex items-center justify-end gap-5">
			<BasicButton label="Cancel" variant="error" action={closeDeleteMealPlanModal} />
			<BasicButton
				label="Delete"
				{isLoading}
				variant="primary"
				action={() => handleDelete(selectedMealPlan?.data?.id as string)}
			/>
		</div>
	</div>
</ModalWrapper>
