<script lang="ts">
	import { Check, X } from '@lucide/svelte';

	let { insightsStrings } = $props();
</script>

{#if insightsStrings}
	<div class="font-lexend-deca flex h-full flex-col justify-center px-4 text-center">
		<h4 class="font-lexend mb-2 text-sm font-light">
			{@html insightsStrings.topCategoryText}
		</h4>

		{#if insightsStrings.isWithinIncome}
			<div
				class="bg-brand-lime mx-auto flex w-fit items-center gap-2 rounded-lg px-2 py-1 text-xs font-light"
			>
				{insightsStrings.spendingMeansText}

				<div class="bg-brand-green aspect-square w-fit rounded-full p-1">
					<Check size="14px" color="#ffffff" />
				</div>
			</div>
		{:else}
			<div
				class="bg-brand-logo mx-auto flex w-fit items-center gap-2 rounded-lg px-2 py-1 text-xs font-light"
			>
				{insightsStrings.spendingMeansText}

				<div class="bg-brand-error aspect-square w-fit rounded-full p-1">
					<X size="14px" color="#ffffff" />
				</div>
			</div>
		{/if}
	</div>
{/if}
