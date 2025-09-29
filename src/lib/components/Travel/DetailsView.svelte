<script lang="ts">
	import { Check, SquarePen, Trash, UserRoundPlus, List } from '@lucide/svelte';
	import BackComponent from '../Common/BackComponent.svelte';
	import DetailsTopSection from './Utilities/DetailsTopSection.svelte';
	import GroupTab from './Utilities/GroupTab.svelte';
	import Budget from './Utilities/Budget.svelte';
	import Calendar from './Utilities/Calendar.svelte';
	import type { Trip } from '../../../types/trip';
	import { closeModal, modalsState, openModal, openTripDeleteModal } from '$lib/state/modal.svelte';
	import { handleSelectTrip } from '$lib/state/trip.svelte';
	import InviteModal from './InviteModal.svelte';
	import { UserRequest } from '$lib/requests';
	import { queryKeys } from '$lib/utils/queryKeys';
	import { createQuery } from '@tanstack/svelte-query';
	import HamburgerDropdown from '../Common/HamburgerDropdown.svelte';

	let { trip }: { trip: Trip } = $props();

	let userQuery = createQuery({
		queryKey: queryKeys.getCurrentUser,
		queryFn: () => UserRequest.getCurrentUser()
	});
	let user = $derived($userQuery?.data?.data?.user);

	function deleteTrip() {
		openTripDeleteModal();
		handleSelectTrip(trip);
	}

	const moreOptions = [
		{
			label: 'Edit',
			icon: SquarePen,
			link: `/travel/${trip._id}/edit`
		},
		{
			label: 'Packing list',
			icon: List
			// action: openInsightsModal
		},
		{
			label: 'Trip done',
			icon: Check
			// action: openInsightsModal
		},

		{
			label: 'Delete',
			icon: Trash,
			iconColor: 'red',
			action: deleteTrip
		}
	];
</script>

<div class="pb-20">
	<div class="my-6 justify-between gap-3 px-3 md:flex">
		<BackComponent backLink="/travel" title={trip.name} />

		<div class="mt-6 flex flex-1 items-center gap-4 md:mt-0 md:justify-end">
			<!-- <div>
				<button class="shadow_button shadow_button_thin shadow_button_with_icon">
					<Check size="20px" />
				</button>
			</div> -->

			<div>
				<button
					class="shadow_button shadow_button_thin shadow_button_with_icon"
					onclick={openModal}
				>
					<UserRoundPlus size="20px" />

					Invite
				</button>
			</div>

			<div>
				<HamburgerDropdown variant="solid" options={moreOptions} />
			</div>
		</div>
	</div>

	<div class="items-start gap-4 px-3 sm:flex">
		<div class="mb-14 w-full sm:w-1/2">
			<DetailsTopSection {trip} />

			<div class="sm:hidden">
				<div class="mt-4">
					<Budget {trip} />
				</div>
			</div>

			<GroupTab />
		</div>

		<div class="w-full sm:w-1/2">
			<div class="hidden sm:block">
				<Budget {trip} />
			</div>
			<Calendar {trip} />
		</div>
	</div>
</div>

{#if user?._id}
	<InviteModal onClose={closeModal} isOpen={modalsState.data.isOpen} {user} />
{/if}
