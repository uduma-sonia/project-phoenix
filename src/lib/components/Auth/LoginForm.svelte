<script lang="ts">
	import { goto } from '$app/navigation';
	import { AUTH_TOKEN } from '$lib/constants/global';
	import { AuthRequest } from '$lib/requests';
	import { addToast } from '$lib/store/toast';
	import Helpers from '$lib/utils/helpers';

	let formElement = $state();
	let email = $state('');
	let username = $state('');
	let password = $state('');
	let isSubmitting = $state(false);

	async function handleSubmit(e: any) {
		e.preventDefault();
		try {
			isSubmitting = true;

			const result = await AuthRequest.register({ username, password, email, avatar: '' });

			if (result) {
				Helpers.setCookie(AUTH_TOKEN, result?.data?.token, 400000);
				goto('/tracker');
			}
		} catch (error: any) {
			addToast(error?.error || 'An error occured', 'error');
		} finally {
			isSubmitting = false;
		}
	}
</script>

<div class="flex h-full items-center justify-center px-4">
	<div class="login_form_wrapper w-full md:max-w-[400px]">
		<form
			onsubmit={handleSubmit}
			bind:this={formElement}
			class="login_form h-full rounded-3xl border-2 bg-white p-4"
		>
			<div class="pb-3">
				<p class="font-suez text-3xl">Login</p>
			</div>

			<hr />

			<div class="mb-10 space-y-5 pt-5">
				<div>
					<label for="email" class="mb-2">Email Address</label>
					<input
						bind:value={email}
						type="email"
						id="email"
						name="email"
						autocomplete="email"
						class="h-[50px] w-full rounded-lg border-2 border-black px-3 outline-none"
					/>
				</div>
				<div>
					<label for="email" class="mb-2">Password</label>
					<input
						type="password"
						bind:value={password}
						id="password"
						name="password"
						autocomplete="new-password"
						class="h-[50px] w-full rounded-lg border-2 border-black px-3 outline-none"
					/>
				</div>
			</div>

			<div>
				<button class="shadow_button"> Continue </button>
			</div>

			<div class="mt-6">
				<p class="font-lexend text-sm font-light">
					Don't have an account? <a href="/signup" class="font-medium underline">Sign up</a>
				</p>
			</div>
		</form>
	</div>
</div>
