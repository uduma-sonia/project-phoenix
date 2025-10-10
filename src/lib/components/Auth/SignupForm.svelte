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
			addToast(error?.message || 'An error occured', 'error');
		} finally {
			isSubmitting = false;
		}
	}
</script>

<div class="flex h-full items-center justify-center px-4">
	<div class="fixed top-0 mx-auto w-full max-w-[1000px] px-4 pt-4">
		<a href="/" class="flex items-center gap-2">
			<div>
				<img src="/images/laniva_logo_rounded.png" class="aspect-square w-10" alt="laniva logo" />
			</div>

			<h1 class="font-dela-gothic-one text-xl sm:text-2xl">Laniva</h1>
		</a>
	</div>
	<form
		class="login_form_wrapper w-full md:max-w-[400px]"
		onsubmit={handleSubmit}
		bind:this={formElement}
	>
		<div class="login_form h-full rounded-3xl border-2 bg-white p-4">
			<div class="pb-3">
				<p class="font-suez text-3xl">Signup</p>
			</div>

			<hr />

			<div class="mb-10 space-y-5 pt-5">
				<div>
					<label for="username" class="mb-2">Username</label>
					<input
						type="text"
						id="username"
						name="username"
						autocomplete="username"
						bind:value={username}
						class="h-[50px] w-full rounded-lg border-2 border-black px-3 outline-none"
					/>
				</div>
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
					<label for="password" class="mb-2">Password</label>
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
</div>
