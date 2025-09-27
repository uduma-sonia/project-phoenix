<script lang="ts">
	import { Check, Trash, UserRoundPlus } from '@lucide/svelte';
	import BackComponent from '../Common/BackComponent.svelte';
	import DetailsTopSection from './Utilities/DetailsTopSection.svelte';
	import GroupTab from './Utilities/GroupTab.svelte';
	import Budget from './Utilities/Budget.svelte';
	import Calendar from './Utilities/Calendar.svelte';
	import type { Trip } from '../../../types/trip';
	import { openTripDeleteModal } from '$lib/state/modal.svelte';
	import { handleSelectTrip } from '$lib/state/trip.svelte';

	let { trip }: { trip: Trip } = $props();
</script>

<div>
	<div class="my-6 flex justify-between gap-3 px-3">
		<BackComponent backLink="/travel" title={trip.name} />

		<div class="flex flex-1 items-center gap-4 md:mt-0 md:justify-end">
			<div>
				<button class="shadow_button shadow_button_thin shadow_button_with_icon">
					<Check size="20px" />
				</button>
			</div>

			<div>
				<button class="shadow_button shadow_button_thin shadow_button_with_icon">
					<UserRoundPlus size="20px" />

					Invite
				</button>
			</div>

			<div>
				<button
					class="shadow_button shadow_button_sm text-red-600"
					style="height: 40px"
					onclick={() => {
						openTripDeleteModal();
						handleSelectTrip(trip);
					}}
				>
					<Trash size="20px" />
				</button>
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
