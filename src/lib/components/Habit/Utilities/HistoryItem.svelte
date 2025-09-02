<script lang="ts">
	let { text } = $props();
</script>

<div class="flex items-center gap-2">
	<div>
		<div class="h-3 w-3 bg-black"></div>
	</div>

	<div class="flex-1">
		<p class="font-lexend-deca text-sm font-light">{text}</p>
	</div>
</div>
