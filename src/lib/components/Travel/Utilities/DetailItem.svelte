<script lang="ts">
	let { value, children }: { value: string; children?: any } = $props();
</script>

<div class="flex items-center gap-3">
	{#if children}
		<div class="w-6">
			{@render children?.()}
			<!-- <img src="/images/location.svg" class="w-6" alt="" /> -->
		</div>
	{/if}
	<p class="font-lexend text-sm font-light">{value}</p>
</div>
