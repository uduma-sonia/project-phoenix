<script lang="ts">
	import BasicButton from '$lib/components/Common/Form/BasicButton.svelte';
	import BasicInputField from '$lib/components/Common/Form/BasicInputField.svelte';
	import { ShoppingRequest } from '$lib/requests';
	import { addToast } from '$lib/store/toast';
	import { useQueryClient } from '@tanstack/svelte-query';
	import { ShoppingStatus } from '../../../../types/shopping';
	import { queryKeys } from '$lib/utils/queryKeys';

	let { user, toggleCreateList } = $props();

	const queryClient = useQueryClient();

	let isSubmitting = $state(false);
	let boardName = $state('');
	let currency = $state('');

	async function handleSubmit(e: any) {
		e.preventDefault();

		try {
			isSubmitting = true;

			const payload = {
				name: boardName,
				ownerId: user?._id,
				status: ShoppingStatus.PENDING,
				currency: currency
			};

			const result = await ShoppingRequest.createBoard(payload);

			if (result) {
				addToast('Board created', 'success', { imgLink: '/images/confetti.svg' });
				queryClient.invalidateQueries({
					queryKey: queryKeys.getInvitedBoards
				});
				toggleCreateList();
			}
		} catch (error: any) {
			addToast(error?.message, 'error');
		} finally {
			isSubmitting = false;
		}
	}
</script>

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
		<BasicInputField
			type="text"
			id="currency"
			name="currency"
			bind:value={currency}
			label="Currency"
		/>
	</div>

	<div class="flex items-center justify-between gap-4">
		<div>
			<BasicButton action={toggleCreateList} className="shadow_button_thin" label="Back" />
		</div>

		<div>
			<BasicButton
				className="shadow_button_thin"
				label="Create"
				type="submit"
				isLoading={isSubmitting}
			/>
		</div>
	</div>
</form>
