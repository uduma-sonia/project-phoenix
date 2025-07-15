<script>
	import { CalendarRange, Clock, UsersRound } from '@lucide/svelte';
	import DetailItem from './DetailItem.svelte';
</script>

<div class="retro_wrapper">
	<div class="retro_wrapper_inner">
		<div class="mb-3 flex items-center gap-4">
			<div class="w-8">
				<img src="/images/vacation.svg" class="w-8" alt="" />
			</div>
			<h2 class="font-lexend text-xl">Ghana trip 2025/2026</h2>
		</div>

		<div class="space-y-2">
			<DetailItem value="Abuja, Nigeria">
				<CalendarRange />
			</DetailItem>
			<DetailItem value="15/05/2025 - 25/05/2025">
				<img src="/images/location.svg" class="w-6" alt="" />
			</DetailItem>
			<DetailItem value="in 2 days">
				<Clock />
			</DetailItem>
			<DetailItem value="2">
				<UsersRound />
			</DetailItem>
			<DetailItem value="Not started"></DetailItem>
		</div>
	</div>
</div>
