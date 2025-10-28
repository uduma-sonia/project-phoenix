<script lang="ts">
	import { RECIPE_COUNT_TRACKER } from '$lib/constants/global';
	import { StatsRequest } from '$lib/requests';
	import { onMount } from 'svelte';

	let { ref, section, type = 'view_count' } = $props();

	async function handleLogStat() {
		try {
			const payload = {
				count: 1,
				ref: ref,
				section: section,
				type: type
			};
			const result = await StatsRequest.logStat(payload);

			if (result) {
				sessionStorage.setItem(RECIPE_COUNT_TRACKER, 'marked');
			}
		} catch (error: any) {
			console.error(error?.message);
		}
	}

	onMount(() => {
		handleLogStat();
	});
</script>
