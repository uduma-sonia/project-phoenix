<script lang="ts">
	import TextButton from '$lib/components/Common/Form/TextButton.svelte';
	import { TriangleAlert } from '@lucide/svelte';
</script>

<div class="px-3">
	<div
		class="font-lexend text-10 border-brand-error relative flex max-w-lg items-center gap-4 rounded-xl border px-3 py-2 font-normal md:text-xs"
	>
		<div class="pulsing">
			<TriangleAlert color="#e7000b" size="30px" />
		</div>

		<p>
			You're approaching your main budget limit for the month. You've spent 0.0% of your main budget
			- N800,000 already. Keep an eye on your expenses.
		</p>

		<div class="absolute right-3 bottom-2">
			<TextButton label="Close" />
		</div>
	</div>
</div>
