<script lang="ts">
	import { AUTH_TOKEN } from '$lib/constants/global';
	import { AuthRequest } from '$lib/requests';
	import { addToast } from '$lib/store/toast';
	import Helpers from '$lib/utils/helpers';

	let formElement = $state();
	let email = $state('');
	let isSubmitting = $state(false);

	async function handleSubmit(e: any) {
		e.preventDefault();
		try {
			isSubmitting = true;

			const result = await AuthRequest.requestPasswordReset({ email });

			email = '';
			if (result) {
				Helpers.setCookie(AUTH_TOKEN, result?.data?.data?.access_token, 400000);
				addToast('Reset link sent to email', 'success');
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
				<img src="/images/laniva_logo_trans.png" class="aspect-square w-10" alt="laniva logo" />
			</div>

			<h1 class="font-dela-gothic-one text-xl sm:text-2xl">Laniva</h1>
		</a>
	</div>
	<div class="login_form_wrapper w-full md:max-w-[400px]">
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
	</div>
</div>
