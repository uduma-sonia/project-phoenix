<script lang="ts">
	import { Play } from '@lucide/svelte';

	let { totalPages, nextPage, prevPage, currentPage = $bindable(1) } = $props();
</script>

<div class="flex h-full items-center justify-center gap-5">
	<div>
		<button class="shadow_button shadow_button_sm shadow_button_thin" onclick={prevPage}>
			<span class="block rotate-180">
				<Play />
			</span>
		</button>
	</div>

	<div>
		<p>
			{currentPage} of {totalPages}
		</p>
	</div>

	<div>
		<button onclick={nextPage} class="shadow_button shadow_button_sm shadow_button_thin">
			<Play />
		</button>
	</div>
</div>
