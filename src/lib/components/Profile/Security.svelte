<script>
	import BasicButton from '../Common/Form/BasicButton.svelte';
	import BasicInputField from '../Common/Form/BasicInputField.svelte';
</script>

<div>
	<p class="mb-4 text-lg">Security</p>

	<div class="mb-6 space-y-4">
		<BasicInputField label="Current password" />
		<BasicInputField label="New password" />
	</div>

	<BasicButton label="Submit" />
</div>
