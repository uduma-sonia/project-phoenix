<script lang="ts">
	import BasicInputField from '../Common/Form/BasicInputField.svelte';
	import TextArea from '../Common/Form/TextArea.svelte';
	import { FeedbackRequest } from '$lib/requests';
	import { addToast } from '$lib/store/toast';
	import { Check } from '@lucide/svelte';

	let subject = $derived('');
	let message = $derived('');
	let isLoading = $state(false);
	let isAnonymous = $state(false);

	async function onSubmit() {
		try {
			isLoading = true;

			const result = await FeedbackRequest.sendFeedback({ isAnonymous, message, subject });

			message = '';
			subject = '';
			if (result) {
				addToast('Your feedback has been received', 'success');
			}
		} catch (error: any) {
			addToast(error?.message || 'An error occured', 'error');
		} finally {
			isLoading = false;
		}
	}
</script>

<div>
	<p class="mb-4 text-lg">Feedback</p>

	<div>
		<div class="mb-2 space-y-4">
			<BasicInputField label="Subject" bind:value={subject} />

			<TextArea rows={5} label="Message" bind:value={message} />

			<div class="flex items-center gap-2">
				<button
					class="button_active relative flex h-7 w-7 items-center justify-center rounded-md border-2 p-0"
					aria-label="Checklist"
					type="button"
					onclick={() => (isAnonymous = !isAnonymous)}
				>
					{#if isAnonymous}
						<Check size="22px" />
					{/if}
				</button>

				<p class="font-lexend text-sm font-light">Anonymous</p>
			</div>
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
