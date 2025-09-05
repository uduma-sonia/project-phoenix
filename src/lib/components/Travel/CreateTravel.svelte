<script lang="ts">
	import BackComponent from '../Common/BackComponent.svelte';
	import BasicInputField from '../Common/BasicInputField.svelte';
	import InputField from '../Common/InputField.svelte';
	let isSubmitting = $state(false);
</script>

<div>
	<div class="mx-auto w-full px-4 md:max-w-[500px]">
		<BackComponent backLink="/travel" />
	</div>

	<div class="mt-4 flex items-center justify-center px-4 pb-52">
		<div class="login_form_wrapper w-full md:max-w-[500px]">
			<form class="login_form h-full rounded-3xl border-2 bg-white">
				<div class="pb-3">
					<p class="font-suez text-2xl">Create Trip</p>
				</div>

				<hr />

				<div class="mb-10 space-y-4 pt-5">
					<BasicInputField label="Name" />
					<BasicInputField label="Country" />
					<BasicInputField label="City" />
					<BasicInputField label="Budget" />
					<!-- add a date range picker -->
				</div>

				<div>
					<button class="shadow_button" type="submit">
						{#if isSubmitting}
							<div class="spinner_white border-2 border-black"></div>
						{:else}
							Save
						{/if}
					</button>
				</div>
			</form>
		</div>
	</div>
</div>
