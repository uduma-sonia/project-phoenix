<script lang="ts">
	import { goto } from '$app/navigation';
	import { ShoppingRequest } from '$lib/requests';
	import { addToast } from '$lib/store/toast';
	import { ShoppingStatus } from '../../../types/shopping';
	import BackComponent from '../Common/BackComponent.svelte';
	import BasicButton from '../Common/Form/BasicButton.svelte';
	import BasicInputField from '../Common/Form/BasicInputField.svelte';

	let { user } = $props();

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
				goto('/shopping');
			}
		} catch (error: any) {
			addToast(error?.message, 'error');
		} finally {
			isSubmitting = false;
		}
	}
</script>

<div>
	<div class="mx-auto w-full md:max-w-[600px]">
		<BackComponent backLink="/shopping" />
	</div>

	<div class="mt-4 flex items-center justify-center px-4 pb-52">
		<div class="login_form_wrapper w-full md:max-w-[600px]">
			<form class="login_form h-full rounded-3xl border-2 bg-white" onsubmit={handleSubmit}>
				<div class="pb-3">
					<p class="font-suez text-2xl">Create List</p>
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

				<div>
					<BasicButton label="Save" type="submit" isLoading={isSubmitting} />
				</div>
			</form>
		</div>
	</div>
</div>
