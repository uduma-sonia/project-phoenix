<script lang="ts">
	import { CalendarRange, UsersRound } from '@lucide/svelte';
	import DetailItem from './DetailItem.svelte';
	import { format } from 'date-fns';
	import type { Trip } from '../../../../types/trip';

	let { trip }: { trip: Trip } = $props();

	function getDateRange() {
		let _start = trip?.start ? format(new Date(trip.start), 'PP') : '';
		let _end = trip?.end ? format(new Date(trip.end), 'PP') : '';

		return `${_start} - ${_end}`;
	}
	function getLocation() {
		let city = trip?.city;
		let country = trip?.country;

		if (city && country) {
			return `${city}, ${country}`;
		} else if (city && !country) {
			return `${city}`;
		} else {
			return `${country}`;
		}
	}
</script>

<div class="retro_wrapper">
	<div class="retro_wrapper_inner">
		<div class="mb-3 flex items-center gap-4">
			<div class="w-8">
				<img src="/images/vacation.svg" class="w-8" alt="" />
			</div>
			<h2 class="font-lexend text-xl">{trip.name}</h2>
		</div>

		<div class="space-y-3">
			<DetailItem value={getLocation()}>
				<img src="/images/location.svg" class="w-5" alt="" />
			</DetailItem>
			<DetailItem value={getDateRange()}>
				<CalendarRange size="18px" />
			</DetailItem>
			<DetailItem value={'' + trip?.numOfPersons || '-'}>
				<UsersRound size="18px" />
			</DetailItem>
			<!-- <DetailItem value="in 2 days">
				<Clock />
			</DetailItem> -->
			<!-- 
			<DetailItem value="Not started"></DetailItem> -->
		</div>
	</div>
</div>
