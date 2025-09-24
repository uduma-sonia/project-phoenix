<script lang="ts">
	import { trackerState } from '$lib/state/tracker.svelte';
	import ModalWrapper from '../Common/ModalWrapper.svelte';
	import Build from './Utilities/Build.svelte';
	import Quit from './Utilities/Quit.svelte';

	let { onClose, isOpen } = $props();

	let details = $derived(trackerState.data.trackerDetails);
</script>

<ModalWrapper {onClose} {isOpen} maxWidth="max-w-[1000px]" label={details?.name} height="90vh">
	{#if trackerState?.data?.trackerDetails?.type == 'BUILD'}
		<Build />
	{/if}

	{#if trackerState?.data?.trackerDetails?.type == 'QUIT'}
		<Quit />
	{/if}
</ModalWrapper>
