<script>
	import TimelineItem from './TimelineItem.svelte';
</script>

<div class="mt-4">
	<div class="flex items-start gap-4">
		<div class="relative">
			<button
				class="font-lexend hover:bg-brand-rose relative z-20 inline-block rounded-md border bg-white px-4 py-2 text-[11px] font-light text-black capitalize"
			>
				12th may
			</button>

			<div class="absolute top-1/2 -right-4 w-6 -translate-y-1/2 border"></div>
		</div>

		<div class="flex-1">
			<div class="space-y-2">
				<TimelineItem />
				<TimelineItem />
			</div>
		</div>
	</div>
</div>
