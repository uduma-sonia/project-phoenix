<script lang="ts">
	import Tooltip from '$lib/components/Common/Tooltip.svelte';
	import { statsRequest } from '$lib/requests';
	import { queryKeys } from '$lib/utils/queryKeys';
	import { Eye, Heart } from '@lucide/svelte';
	import { createQuery } from '@tanstack/svelte-query';

	let { ref, saveTotal } = $props();

	const statsQuery = createQuery({
		queryKey: queryKeys.getStat(ref),
		queryFn: () => statsRequest.getStat(ref),
		enabled: !!ref
	});

	let stat = $derived($statsQuery?.data?.data);
</script>

<div class="flex items-center gap-4">
	<Tooltip text="Views" position="bottom">
		<p class="font-lexend-deca flex items-center gap-1 text-sm font-light">
			<Eye size="16px" strokeWidth="2px" />
			{stat?.count || '0'}
		</p>
	</Tooltip>
	<Tooltip text="Saves" position="bottom">
		<p class="font-lexend-deca flex items-center gap-1 text-sm font-light">
			<Heart fill="black" size="16px" strokeWidth="2px" />
			{saveTotal}
		</p>
	</Tooltip>
</div>
