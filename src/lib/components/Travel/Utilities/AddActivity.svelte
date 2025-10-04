<script lang="ts">
	import { page } from '$app/state';
	import InputField from '$lib/components/Common/Form/InputField.svelte';
	import { tripRequest } from '$lib/requests';
	import { addToast } from '$lib/store/toast';
	import Helpers from '$lib/utils/helpers';
	import { queryKeys } from '$lib/utils/queryKeys';
	import { Plus } from '@lucide/svelte';
	import { useQueryClient } from '@tanstack/svelte-query';

	let { groupList } = $props();
	const queryClient = useQueryClient();

	let isLoading = $state(false);
	let actvityName = $state('');
	let instagramLink = $state('');
	let websiteLink = $state('');
	let otherLink = $state('');
	let menuLink = $state('');
	let mobile = $state('');
	// let note = $state('');

	let selectedGroup: { name: string; _id: string } = $state({ name: '', _id: '' });

	function selectGroup(group: { name: string; _id: string }) {
		if (selectedGroup?._id === group?._id) {
			selectedGroup = { name: '', _id: '' };
		} else {
			selectedGroup = group;
		}
	}

	async function handleSubmit() {
		try {
			isLoading = true;

			const payload = {
				tripId: page.params.id,
				name: actvityName,
				groupId: selectedGroup?._id,
				instagramLink: instagramLink,
				websiteLink: websiteLink,
				mobile: mobile,
				visited: false,
				menuLink: menuLink,
				otherLink: otherLink
				// note: note
				// day: ''
			};

			Helpers.removeEmptyFields(payload);

			const result = await tripRequest.createTripActivity(payload);

			if (result) {
				queryClient.invalidateQueries({
					queryKey: queryKeys.getTripActivities(page.params.id)
				});

				actvityName = '';
				instagramLink = '';
				websiteLink = '';
				otherLink = '';
				menuLink = '';
				mobile = '';
				addToast('Activity added', 'success');
			}
		} catch (error: any) {
			addToast(error?.message || 'An error occured', 'error');
		} finally {
			isLoading = false;
		}
	}
</script>

<div class="retro_wrapper">
	<div class="retro_wrapper_inner font-lexend">
		<div>
			<InputField bind:value={actvityName} id="actvityName" label="Activity Name" />
			<InputField bind:value={instagramLink} id="instagramLink" label="Instagram link" />
			<InputField bind:value={websiteLink} id="websiteLink" label="Website link" />
			<InputField bind:value={menuLink} id="menuLink" label="Menu link" />
			<InputField bind:value={otherLink} id="otherLink" label="Other link" />
			<InputField bind:value={mobile} id="mobile" type="tel" label="Mobile" />
			<!-- <InputField bind:value={note} id="note" type="text" label="Note" /> -->

			{#if groupList?.length > 0}
				<div class="flex items-center gap-3 pt-4">
					{#each groupList as group}
						{@const isSelected = selectedGroup?._id === group._id}
						<button
							class="font-lexend hover:bg-brand-rose inline-block rounded-md border bg-white px-4 py-2 text-[11px] font-light text-black capitalize"
							onclick={() => selectGroup(group)}
							class:selected={isSelected}
						>
							{group.name}
						</button>
					{/each}
				</div>
			{/if}
		</div>
	</div>
</div>

<div class="mt-4 flex justify-center">
	<button class="create_button_sm shadow_button" onclick={handleSubmit}>
		{#if isLoading}
			<div class="spinner_white border-2 border-black"></div>
		{:else}
			<Plus size="26px" />
		{/if}
	</button>
</div>

<style>
	.selected {
		background-color: #dcbec5 !important;
	}
</style>
