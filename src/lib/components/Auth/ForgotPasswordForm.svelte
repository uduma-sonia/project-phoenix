<script lang="ts">
	import { AuthRequest } from '$lib/requests';
	import { addToast } from '$lib/store/toast';
	import BasicInputField from '../Common/Form/BasicInputField.svelte';
	import AuthLayout from './AuthLayout.svelte';

	let formElement = $state();
	let email = $state('');
	let isSubmitting = $state(false);

	async function handleSubmit(e: any) {
		e.preventDefault();
		try {
			isSubmitting = true;

			const result = await AuthRequest.requestPasswordReset({
				email,
				requestUrl: window.location.origin
			});

			email = '';
			if (result) {
				addToast('Reset link sent to email', 'success');
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
			<p class="font-suez text-3xl">Forgot Password</p>
		</div>

		<hr />

		<div class="mb-10 space-y-5 pt-5">
			<BasicInputField
				label="Email Address"
				bind:value={email}
				type="email"
				id="email"
				name="email"
				autocomplete="email"
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

		<div class="mt-6 pb-4">
			<p class="font-lexend text-sm font-light">
				Don't have an account? <a href="/signup" class="font-medium underline">Sign up</a>
			</p>
		</div>
	</form>
</AuthLayout>
