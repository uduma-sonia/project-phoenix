<script lang="ts">
	import { MapPinHouse, Phone } from '@lucide/svelte';

	let {} = $props();
</script>

<div class="timeline_item_wrapper">
	<div class="relative z-10 w-full gap-3 rounded-lg border-2 border-black bg-white p-2">
		<p class="font-lexend mb-4 text-sm font-normal">Almira restaurant</p>

		<p class="font-lexend mb-1 flex items-center gap-1 text-sm font-light">
			<MapPinHouse size="12px" />
			mo 30 muhamad close wayse
		</p>

		<a class="font-lexend inline-flex items-center gap-1 text-sm font-light underline">
			<Phone size="14px" />
			08105616400
		</a>
	</div>
</div>

<style>
	.timeline_item_wrapper {
		position: relative;
		border-radius: 8px;
		transition: all 0.4s linear;
	}

	.timeline_item_wrapper::before {
		content: '';
		position: absolute;
		top: 1px;
		left: 1px;
		right: 0;
		bottom: 0;
		background-color: black;
		border: 2px solid black;
		z-index: 1;
		border-radius: 8px;
		width: 100%;
		height: 100%;
	}
</style>
