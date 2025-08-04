<script lang="ts">
	import { trackerState } from '$lib/state/tracker.svelte';
	import ModalWrapper from '../Common/ModalWrapper.svelte';

	let { onClose, isOpen } = $props();

	$effect(() => console.log($state.snapshot(trackerState.data.trackerDetails)));
</script>

<ModalWrapper {onClose} {isOpen}>
	<div>
		<p class="font-lexend text-xl">Standard list</p>
	</div>
</ModalWrapper>
