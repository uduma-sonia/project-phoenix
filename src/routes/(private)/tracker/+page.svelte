<script>
	import View from '$lib/components/Habit/View.svelte';
	import { queryKeys } from '$lib/utils/queryKeys';
	import { TrackerRequest } from '$lib/requests';
	import { createQuery } from '@tanstack/svelte-query';

	const trackerQuery = createQuery({
		queryKey: queryKeys.getAllHabits,
		queryFn: () => TrackerRequest.getAllHabits()
	});

	let tracker = $derived($trackerQuery?.data?.data);

	$effect(() => console.log($trackerQuery?.data?.data?.trackers));
</script>

<div class="bg-brand-light min-h-screen">
	<View />
</div>
