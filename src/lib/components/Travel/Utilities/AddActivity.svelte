<script lang="ts">
	import { page } from '$app/state';
	import BasicButton from '$lib/components/Common/Form/BasicButton.svelte';
	import InputField from '$lib/components/Common/Form/InputField.svelte';
	import ModalWrapper from '$lib/components/Common/ModalWrapper.svelte';
	import TrackerUtils from '$lib/components/Habit/Utilities/utils';
	import { TripRequest } from '$lib/requests';
	import { closeCreateActivityModal, modalsState } from '$lib/state/modal.svelte';
	import { addToast } from '$lib/store/toast';
	import Helpers from '$lib/utils/helpers';
	import { queryKeys } from '$lib/utils/queryKeys';
	import { useQueryClient } from '@tanstack/svelte-query';
	import { eachDayOfInterval, format } from 'date-fns';

	let { groupList, trip } = $props();
	const queryClient = useQueryClient();

	let isLoading = $state(false);
	let actvityName = $state('');
	let instagramLink = $state('');
	let websiteLink = $state('');
	let otherLink = $state('');
	let menuLink = $state('');
	let mobile = $state('');
	let note = $state('');
	let selectedDay: Date | null = $state(null);

	let selectedGroup: { name: string; _id: string } = $state({ name: '', _id: '' });

	let _eachDayOfInterval = $derived(
		eachDayOfInterval({
			start: new Date(trip?.start),
			end: new Date(trip?.end)
		})
	);

	function selectGroup(group: { name: string; _id: string }) {
		if (selectedGroup?._id === group?._id) {
			selectedGroup = { name: '', _id: '' };
		} else {
			selectedGroup = group;
		}
	}

	function selectDay(day: Date) {
		selectedDay = day;
		// selectedDay = TrackerUtils.getISODate(day)
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
				otherLink: otherLink,
				day: selectedDay ? TrackerUtils.getISODate(selectedDay) : '',
				note: note
			};

			Helpers.removeEmptyFields(payload);

			const result = await TripRequest.createTripActivity(payload);

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
				closeCreateActivityModal();
			}
		} catch (error: any) {
			addToast(error?.message || 'An error occured', 'error');
		} finally {
			isLoading = false;
		}
	}
</script>

<ModalWrapper
	label="Add activity"
	isOpen={modalsState.data.isOpenCreateActivity}
	onClose={closeCreateActivityModal}
>
	<div class="p-4">
		<div>
			<InputField bind:value={actvityName} id="actvityName" placeholder="Activity Name" />
			<InputField bind:value={instagramLink} id="instagramLink" placeholder="Instagram link" />
			<InputField bind:value={websiteLink} id="websiteLink" placeholder="Website link" />
			<InputField bind:value={menuLink} id="menuLink" placeholder="Menu link" />
			<InputField bind:value={otherLink} id="otherLink" placeholder="Other link" />
			<InputField bind:value={mobile} id="mobile" type="tel" placeholder="Mobile" />
			<InputField bind:value={note} id="note" placeholder="Short note" />

			{#if groupList?.length > 0}
				<div class="no-scrollbar flex flex-nowrap items-center gap-3 overflow-x-auto pt-4">
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

		<div class="mt-6">
			<p class="font-lexend text-sm">Select day for activity</p>

			{#if _eachDayOfInterval?.length > 0}
				<div class="mt-4 flex flex-wrap gap-2">
					{#each _eachDayOfInterval as day, index (index)}
						{@const isSelected = selectedDay
							? TrackerUtils.getISODate(selectedDay) === TrackerUtils.getISODate(day)
							: false}

						<button
							class:selected={isSelected}
							class="font-lexend hover:bg-brand-rose inline-block rounded-md border bg-white px-4 py-1 text-[11px] font-light text-black capitalize"
							onclick={() => selectDay(day)}
						>
							{format(day, 'MMM dd')}
						</button>
					{/each}
				</div>
			{/if}
		</div>

		<div class="mt-8 flex items-center justify-end gap-5">
			<BasicButton label="Cancel" variant="error" action={closeCreateActivityModal} />
			<BasicButton label="Add" {isLoading} variant="primary" action={handleSubmit} />
		</div>
	</div>
</ModalWrapper>

<style>
	.selected {
		background-color: #dcbec5 !important;
	}
</style>
