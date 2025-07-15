<script>
	import { CalendarRange, Clock } from '@lucide/svelte';
</script>

<div class="retro_wrapper">
	<div class="relative z-10 w-full space-y-4 rounded-lg border-2 border-black bg-white p-4">
		<div class="flex items-center gap-4">
			<div class="w-8">
				<img src="/images/vacation.svg" class="w-8" alt="" />
			</div>
			<h2 class="font-lexend text-xl">Ghana trip 2025/2026</h2>
		</div>
		<div class="flex items-center gap-4">
			<div class="w-8">
				<img src="/images/location.svg" class="w-6" alt="" />
			</div>
			<p class="font-lexend font-light">Abuja, Nigeria</p>
		</div>
		<div class="flex items-center gap-4">
			<div class="w-8">
				<CalendarRange />
			</div>
			<p class="font-lexend font-light">15/05/2025 - 25/05/2025</p>
		</div>
		<div class="flex items-center gap-4">
			<div class="w-8">
				<Clock />
			</div>
			<p class="font-lexend font-light">in 2 days</p>
		</div>
		<div class="flex items-center gap-4">
			<p class="font-lexend text-sm font-light">Not started</p>
		</div>
	</div>
</div>
