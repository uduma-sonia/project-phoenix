<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/state';
	import { AuthRequest } from '$lib/requests';
	import { addToast } from '$lib/store/toast';
	import BasicInputField from '../Common/Form/BasicInputField.svelte';
	import AuthLayout from './AuthLayout.svelte';

	let formElement = $state();
	let password = $state('');
	let isSubmitting = $state(false);
	let id = $derived(page.url.searchParams.get('id'));
	let token = $derived(page.url.searchParams.get('token'));

	async function handleSubmit(e: any) {
		e.preventDefault();
		try {
			isSubmitting = true;

			const result = await AuthRequest.resetPassword(
				{ password },
				{ id: id as string, token: token as string }
			);

			password = '';
			if (result) {
				addToast('Password reset successful', 'success');
				goto('/login');
			}
		} catch (error: any) {
			addToast(error?.message || 'An error occured', 'error');
		} finally {
			isSubmitting = false;
		}
	}
</script>

<AuthLayout>
	<form
		onsubmit={handleSubmit}
		bind:this={formElement}
		class="login_form h-full rounded-3xl border-2 bg-white p-4"
	>
		<div class="pb-3">
			<p class="font-suez text-3xl">Reset Password</p>
		</div>

		<hr />

		<div class="mb-10 space-y-5 pt-5">
			<BasicInputField
				label="New Password"
				bind:value={password}
				type="password"
				id="password"
				name="password"
				autocomplete="password"
			/>
		</div>

		<div>
			<button class="shadow_button" type="submit">
				{#if isSubmitting}
					<div class="spinner_white border-2 border-black"></div>
				{:else}
					Continue
				{/if}
			</button>
		</div>
	</form>
</AuthLayout>
