<script lang="ts">
	import { format } from 'date-fns';
	import TimelineItem from './TimelineItem.svelte';

	let { activity } = $props();
</script>

<div class="mt-4">
	<div class="flex items-start gap-4">
		<div class="relative">
			<button
				class="font-lexend hover:bg-brand-rose relative z-20 inline-block w-[70px] rounded-md border bg-white px-2 py-2 text-[11px] font-light text-black capitalize sm:w-[85px]"
			>
				{#if activity?.day}
					{format(new Date(activity.day), 'PP')}
				{:else}
					No date
				{/if}
			</button>

			<div class="absolute top-1/2 -right-4 w-6 -translate-y-1/2 border opacity-70"></div>
		</div>

		<div class="flex-1">
			<div class="space-y-2">
				{#each activity.items as item, index (index)}
					<TimelineItem data={item} />
				{/each}
			</div>
		</div>
	</div>
</div>
