<script lang="ts">
	import BasicInputField from '../Common/Form/BasicInputField.svelte';
	import TextArea from '../Common/Form/TextArea.svelte';
	import { FeedbackRequest } from '$lib/requests';
	import { addToast } from '$lib/store/toast';

	let subject = $derived('');
	let message = $derived('');
	let isLoading = $state(false);

	async function onSubmit() {
		try {
			isLoading = true;

			const result = await FeedbackRequest.sendFeedback({ isAnonymous: false, message, subject });

			message = '';
			subject = '';
			if (result) {
				addToast('You will hear back from us within 24 hours', 'success');
			}
		} catch (error: any) {
			addToast(error?.message || 'An error occured', 'error');
		} finally {
			isLoading = false;
		}
	}
</script>

<div>
	<p class="mb-4 text-lg">Help</p>

	<p class="font-lexend mb-4 flex items-center gap-1">
		Email us:

		<a
			href="mailto:berylhive@gmail.com"
			class="font-lexend block text-sm font-light underline-offset-2 hover:underline"
		>
			berylhive@gmail.com
		</a>
	</p>

	<div>
		<div class="mb-2 space-y-4">
			<BasicInputField label="Subject" bind:value={subject} />
			<TextArea rows={5} label="Message" bind:value={message} />
		</div>

		<div class="mt-6">
			<button onclick={onSubmit} class="shadow_button" type="submit">
				{#if isLoading}
					<div class="spinner_white border-2 border-black"></div>
				{:else}
					Send Message
				{/if}
			</button>
		</div>
	</div>
</div>
