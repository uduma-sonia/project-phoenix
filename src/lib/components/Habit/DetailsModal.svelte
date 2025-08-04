<script lang="ts">
	import { trackerState } from '$lib/state/tracker.svelte';
	import ModalWrapper from '../Common/ModalWrapper.svelte';

	let { onClose, isOpen } = $props();

	let details = $derived(trackerState.data.trackerDetails);

	$effect(() => console.log($state.snapshot(trackerState.data.trackerDetails)));
</script>

<ModalWrapper {onClose} {isOpen} maxWidth="max-w-[1000px]">
	<div class="flex items-center gap-2">
		<div>
			{#if details?.icon}
				<img src={details.icon} alt="walk icon" class="h-5" />
			{/if}
		</div>
		<p class="font-lexend text-lg sm:text-xl">{details?.name}</p>
	</div>
</ModalWrapper>
