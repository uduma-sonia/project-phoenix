<script lang="ts">
	let { name, iconUrl } = $props();
</script>

<div class="flex items-center gap-1.5">
	{#if iconUrl}
		<div>
			<img src={iconUrl} class="h-6 min-w-8" alt={name} />
		</div>
	{/if}

	<p class="font-lexend text-lg sm:text-xl">
		{name}
	</p>
</div>
