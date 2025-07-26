<script>
	import View from '$lib/components/Habit/View.svelte';
	import { queryKeys } from '$lib/utils/queryKeys';
	import { TrackerRequest } from '$lib/requests';
	import { createQuery } from '@tanstack/svelte-query';
</script>

<div class="bg-brand-light min-h-screen">
	<View />
</div>
