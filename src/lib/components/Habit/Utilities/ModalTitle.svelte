<script lang="ts">
	let { name, iconUrl } = $props();
</script>

<div class="flex items-center gap-1.5">
	<div>
		<img src={iconUrl} class="h-6 min-w-8" alt={name} />
	</div>

	<p class="font-lexend text-lg sm:text-xl">
		{name}
	</p>
</div>
