<script lang="ts">
	import { RecipeRequest } from '$lib/requests';
	import { closeRecipeGroupModal, modalsState } from '$lib/state/modal.svelte';
	import { addToast } from '$lib/store/toast';
	import BasicButton from '../Common/Form/BasicButton.svelte';
	import ModalWrapper from '../Common/ModalWrapper.svelte';
	import { queryKeys } from '$lib/utils/queryKeys';
	import BasicInputField from '../Common/Form/BasicInputField.svelte';
	import RecipeGroupItem from './Utilities/RecipeGroupItem.svelte';
	import { useQueryClient } from '@tanstack/svelte-query';

	let { groupList } = $props();
	const queryClient = useQueryClient();

	let isLoading = $state(false);
	let groupName = $state('');

	async function handleAdd() {
		if (!groupName) return false;
		try {
			isLoading = true;
			const payload = {
				name: groupName
			};

			groupName = '';
			const result = await RecipeRequest.createRecipeGroup(payload);

			if (result) {
				queryClient.invalidateQueries({
					queryKey: queryKeys.getRecipeGroups
				});
			}
		} catch (error: any) {
			addToast(error?.message || 'An error occured', 'error');
		} finally {
			isLoading = false;
		}
	}

	async function handleUpdate(id: string, name: string) {
		try {
			isLoading = true;
			const payload = {
				name: name
			};

			await RecipeRequest.updateRecipGroup(id, payload);
			queryClient.invalidateQueries({
				queryKey: queryKeys.getRecipeGroups
			});
		} catch (error: any) {
			addToast(error?.message || 'An error occured', 'error');
		} finally {
			isLoading = false;
		}
	}

	async function handleItemDelete(id: string) {
		try {
			const result = await RecipeRequest.deleteRecipeGroup(id);

			if (result) {
				queryClient.invalidateQueries({ queryKey: queryKeys.getRecipeGroups });
			}
		} catch (error: any) {
			addToast(error?.message || 'An error occured', 'error');
		}
	}
</script>

<ModalWrapper
	isOpen={modalsState.data.isOpenRecipeGroup}
	onClose={closeRecipeGroupModal}
	label={`Manage recipe groups`}
>
	<div class="p-4">
		<div class="space-y-4">
			{#each groupList as group, index (index)}
				<RecipeGroupItem {handleUpdate} item={group} {handleItemDelete} />
			{/each}
		</div>

		<div class="mt-10">
			<BasicInputField bind:value={groupName} placeholder="New category" />

			<div class="mt-4">
				<BasicButton label="Add New" {isLoading} variant="primary" action={handleAdd} />
			</div>
		</div>
	</div>
</ModalWrapper>
