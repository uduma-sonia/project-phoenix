<script>
	import BasicButton from '../Common/BasicButton.svelte';
</script>

<div>
	<p class="mb-4 text-lg">Security</p>

	<div class="mb-6 space-y-4">
		<div>
			<label for="currentPassword" class="mb-2">Current password</label>
			<input
				type="password"
				id="currentPassword"
				name="currentPassword"
				required
				class="h-[50px] w-full rounded-lg border-2 border-black px-3 outline-none"
			/>
		</div>
		<div>
			<label for="newPassword" class="mb-2">New password</label>
			<input
				type="password"
				id="newPassword"
				name="newPassword"
				required
				class="h-[50px] w-full rounded-lg border-2 border-black px-3 outline-none"
			/>
		</div>
	</div>

	<BasicButton label="Submit" />
</div>
