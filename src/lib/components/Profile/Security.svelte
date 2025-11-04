<script lang="ts">
	import { AuthRequest } from '$lib/requests';
	import { addToast } from '$lib/store/toast';
	import BasicButton from '../Common/Form/BasicButton.svelte';
	import BasicInputField from '../Common/Form/BasicInputField.svelte';

	let password = $state('');
	let newPassword = $state('');
	let isSubmitting = $state(false);

	async function handleSubmit() {
		try {
			isSubmitting = true;

			const result = await AuthRequest.changePassword({ currentPassword: password, newPassword });

			if (result) {
				addToast('Password updated', 'success');
				newPassword = '';
				password = '';
			}
		} catch (error: any) {
			addToast(error?.message || 'An error occured', 'error');
		} finally {
			isSubmitting = false;
		}
	}
</script>

<div>
	<p class="mb-4 text-lg">Security</p>

	<div class="mb-6 space-y-4">
		<BasicInputField
			label="Current password"
			type="password"
			bind:value={password}
			id="password"
			name="password"
			required
			autocomplete="new-password"
		/>
		<BasicInputField
			label="New password"
			type="password"
			bind:value={newPassword}
			id="newPassword"
			name="newPassword"
			required
			autocomplete="new-password"
		/>
	</div>

	<div>
		<BasicButton action={handleSubmit} isLoading={isSubmitting} type="submit" label="Continue" />
	</div>
</div>
