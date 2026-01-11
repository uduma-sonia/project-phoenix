<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/state';
	import { ShoppingRequest } from '$lib/requests';
	import { addToast } from '$lib/store/toast';
	import { ShoppingStatus } from '../../../types/shopping';
	import BackComponent from '../Common/BackComponent.svelte';
	import BasicInputField from '../Common/Form/BasicInputField.svelte';

	let { boardDetails } = $props();

	let isSubmitting = $state(false);
	let boardName = $state(boardDetails?.name);

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
				addToast('Board Updated', 'success', { imgLink: '/images/confetti.svg' });
				goto(`/shopping/${page.params.id}`);
			}
		} catch (error: any) {
			addToast(error?.message, 'error');
		} finally {
			isSubmitting = false;
		}
	}
</script>

<div>
	<div class="mx-auto w-full md:max-w-[500px]">
		<BackComponent backLink="/shopping" />
	</div>

	<div class="mt-4 flex items-center justify-center px-4 pb-52">
		<div class="login_form_wrapper w-full md:max-w-[500px]">
			<form class="login_form h-full rounded-3xl border-2 bg-white" onsubmit={handleSubmit}>
				<div class="pb-3">
					<p class="font-suez text-2xl">Update list</p>
				</div>

				<hr />

				<div class="mb-10 space-y-4 pt-5">
					<BasicInputField
						type="text"
						id="boardName"
						name="boardName"
						bind:value={boardName}
						required
						label="Name"
					/>
					<!-- <BasicInputField
						type="text"
						id="currency"
						name="currency"
						bind:value={currency}
						label="Currency"
					/> -->
				</div>

				<div>
					<button class="shadow_button" type="submit">
						{#if isSubmitting}
							<div class="spinner_white border-2 border-black"></div>
						{:else}
							Update
						{/if}
					</button>
				</div>
			</form>
		</div>
	</div>
</div>
