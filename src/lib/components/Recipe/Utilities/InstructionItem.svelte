<script lang="ts">
	import { Check } from '@lucide/svelte';

	let { name = '', step = '' } = $props();
</script>

<div>
	<p class="font-medium">Step {step}</p>

	<div>
		<p class="font-lexend font-light">{name}</p>
	</div>
</div>
