<script lang="ts">
	import { Check } from '@lucide/svelte';

	let { name = '' } = $props();
</script>

<div class="flex items-center gap-2">
	<div>
		<button
			class="button_active relative flex h-5 w-5 items-center justify-center rounded-md border p-0"
			aria-label="Checklist"
		>
			<Check size="22px" />
		</button>
	</div>

	<div class="flex-1">
		<p class="font-lexend font-light">{name}</p>
	</div>
</div>
