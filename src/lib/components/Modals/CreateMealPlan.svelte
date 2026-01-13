<script lang="ts">
	import { MealRequest } from '$lib/requests';
	import { closeCreateMealPlanModal, modalsState, selectedMealPlan } from '$lib/state/modal.svelte';
	import { addToast } from '$lib/store/toast';
	import { useQueryClient } from '@tanstack/svelte-query';
	import BasicButton from '../Common/Form/BasicButton.svelte';
	import ModalWrapper from '../Common/ModalWrapper.svelte';
	import { queryKeys } from '$lib/utils/queryKeys';
	import BasicInputField from '../Common/Form/BasicInputField.svelte';

	const queryClient = useQueryClient();

	let isLoading = $state(false);
	let planName = $derived(selectedMealPlan?.data?.value || '');
	let description = $derived(selectedMealPlan?.data?.description);

	async function handleCreate(e: any) {
		e.preventDefault();
		try {
			isLoading = true;
			await MealRequest.createMealPlan({ name: planName as string, description, isPrivate: true });
			addToast('Meal plan created', 'success', { imgLink: '/images/confetti.svg' });
			queryClient.invalidateQueries({ queryKey: queryKeys.getMealPlans });
			closeCreateMealPlanModal();
		} catch (error: any) {
			addToast(error?.message || 'An error occured', 'error');
		} finally {
			isLoading = false;
		}
	}

	async function handleUpdate(e: any) {
		e.preventDefault();

		if (selectedMealPlan?.data) {
			try {
				isLoading = true;
				await MealRequest.updateMealPlan(selectedMealPlan?.data?.id, {
					name: planName as string,
					description,
					isPrivate: true
				});
				addToast('Meal plan updated', 'success');
				queryClient.invalidateQueries({ queryKey: queryKeys.getMealPlans });
				closeCreateMealPlanModal();
				window.location.reload();
			} catch (error: any) {
				addToast(error?.message || 'An error occured', 'error');
			} finally {
				isLoading = false;
			}
		}
	}
</script>

<ModalWrapper
	isOpen={modalsState.data.isOpenCreateMealPlan}
	onClose={closeCreateMealPlanModal}
	label={selectedMealPlan?.data?.isEditing ? 'Update meal plan' : `Create meal plan`}
>
	<div class="p-4">
		<form
			onsubmit={(e) => {
				if (selectedMealPlan?.data?.isEditing) {
					handleUpdate(e);
				} else {
					handleCreate(e);
				}
			}}
		>
			<div class="mb-10 space-y-4">
				<BasicInputField
					type="text"
					id="planName"
					name="planName"
					bind:value={planName}
					required
					label="Name"
				/>
				<BasicInputField
					type="text"
					id="description"
					name="description"
					bind:value={description}
					label="description"
				/>
			</div>

			<div class="flex items-center justify-end gap-4">
				<div>
					<BasicButton
						className="shadow_button_thin"
						label={selectedMealPlan?.data?.isEditing ? 'Update' : 'Create'}
						type="submit"
						{isLoading}
					/>
				</div>
			</div>
		</form>
	</div>
</ModalWrapper>
