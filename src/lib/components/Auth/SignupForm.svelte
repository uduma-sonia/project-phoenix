<script lang="ts">
	import { goto } from '$app/navigation';
	import { AUTH_TOKEN } from '$lib/constants/global';
	import { AuthRequest } from '$lib/requests';
	import { addToast } from '$lib/store/toast';
	import Helpers from '$lib/utils/helpers';
	import BasicInputField from '../Common/Form/BasicInputField.svelte';
	import AuthLayout from './AuthLayout.svelte';

	let email = $state('');
	let username = $state('');
	let password = $state('');
	let isSubmitting = $state(false);

	async function handleSubmit(e: any) {
		e.preventDefault();
		try {
			isSubmitting = true;

			const result = await AuthRequest.register({
				username,
				password,
				email,
				avatar: `https://robohash.org/${Helpers.generateRandomNumber(1, 10)}?set=${Helpers.generateRandomNumber(1, 5)}&size=200x200`
			});

			if (result) {
				Helpers.setCookie(AUTH_TOKEN, result?.data?.token, 400000);
				goto('/login');
			}
		} catch (error: any) {
			addToast(error?.data?.message || error?.message || 'An error occured', 'error');
		} finally {
			isSubmitting = false;
		}
	}
</script>

<AuthLayout>
	<form class="login_form_wrapper w-full md:max-w-[400px]" onsubmit={handleSubmit}>
		<div class="login_form h-full rounded-3xl border-2 bg-white p-4">
			<div class="pb-3">
				<p class="font-suez text-3xl">Signup</p>
			</div>

			<hr />

			<div class="mb-10 space-y-5 pt-5">
				<BasicInputField
					label="Username"
					bind:value={username}
					type="text"
					id="username"
					name="username"
					required
					autocomplete="username"
				/>
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

			<div>
				<button type="submit" class="shadow_button">
					{#if isSubmitting}
						<div class="spinner_white border-2 border-black"></div>
					{:else}
						Continue
					{/if}
				</button>
			</div>

			<div class="mt-6 pb-4">
				<p class="font-lexend text-sm font-light">
					Already have an account? <a href="/login" class="font-medium underline">Login</a>
				</p>
			</div>
		</div>
	</form>
</AuthLayout>
