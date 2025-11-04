<script lang="ts">
	import { goto } from '$app/navigation';
	import { AUTH_TOKEN, PAGE_REDIRECTED_FROM_KEY } from '$lib/constants/global';
	import { AuthRequest } from '$lib/requests';
	import { addToast } from '$lib/store/toast';
	import Helpers from '$lib/utils/helpers';
	import BasicButton from '../Common/Form/BasicButton.svelte';
	import BasicInputField from '../Common/Form/BasicInputField.svelte';
	import AuthLayout from './AuthLayout.svelte';

	let formElement = $state();
	let email = $state('');
	let password = $state('');
	let isSubmitting = $state(false);

	async function handleSubmit(e: any) {
		e.preventDefault();

		try {
			isSubmitting = true;

			const result = await AuthRequest.login({ password, email });

			if (result) {
				Helpers.setCookie(AUTH_TOKEN, result?.data?.data?.data?.access_token, 4000000);
				const redirectUrl = sessionStorage.getItem(PAGE_REDIRECTED_FROM_KEY) || '';

				if (redirectUrl) {
					goto(redirectUrl);
					sessionStorage.removeItem(PAGE_REDIRECTED_FROM_KEY);
				} else {
					goto('/tracker');
				}
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
			<p class="font-suez text-3xl">Login</p>
		</div>

		<hr />

		<div class="mb-10 pt-5">
			<div class="space-y-5">
				<BasicInputField
					label="Email Address"
					bind:value={email}
					type="email"
					id="email"
					name="email"
					required
					autocomplete="email"
				/>
				<BasicInputField
					label="Password"
					type="password"
					bind:value={password}
					id="password"
					name="password"
					required
					autocomplete="new-password"
				/>
			</div>

			<p class="font-lexend mt-2 flex justify-end text-sm font-light">
				<a href="/forgot-password" class="font-medium underline">Forgot password?</a>
			</p>
		</div>

		<div>
			<BasicButton type="submit" label="Continue" />
		</div>

		<div class="mt-6 pb-4">
			<p class="font-lexend text-sm font-light">
				Don't have an account? <a href="/signup" class="font-medium underline">Sign up</a>
			</p>
		</div>
	</form>
</AuthLayout>
