<script lang="ts">
	import { statsRequest } from '$lib/requests';
	import { queryKeys } from '$lib/utils/queryKeys';
	import { createQuery } from '@tanstack/svelte-query';

	let { ref } = $props();

	const statsQuery = createQuery({
		queryKey: queryKeys.getStat(ref),
		queryFn: () => statsRequest.getStat(ref),
		enabled: !!ref
	});

	let stat = $derived($statsQuery?.data?.data);
</script>

<div>
	<p class="font-lexend-deca text-sm font-light">Read: {stat?.count || '0'} times</p>
</div>
