<script lang="ts">
	import LoaderError from '$lib/components/Common/LoaderError.svelte';
	import { onMount } from 'svelte';
	import BreakdownRowItem from './BreakdownRowItem.svelte';
	import EmptyState from '$lib/components/Common/EmptyState.svelte';

	let { breakdownList, txnLoading, isError, user } = $props();

	let hasTxns = $derived((breakdownList ?? []).length > 0);
	let hasMount = $state(false);

	onMount(() => {
		hasMount = true;
	});
</script>

<div class="">
	<div class="mb-4 flex items-center justify-between gap-4">
		<p class="text-lg font-medium md:text-xl">Spending Breakdown</p>
	</div>
</div>

<div class="retro_wrapper">
	<div class="retro_wrapper_inner_ejf">
		<LoaderError height="300px" isLoading={txnLoading} error={isError} />

		{#if !txnLoading && !isError}
			{#if hasTxns}
				<table class="w-full border-collapse">
					<tbody>
						{#if breakdownList}
							{#each breakdownList as item, index (index)}
								<BreakdownRowItem {user} {item} />
							{/each}
						{/if}
					</tbody>
				</table>
			{:else if !isError}
				{#if hasMount}
					<EmptyState heading="No Breakdown yet" />
				{:else}
					<LoaderError height="300px" isLoading={true} />
				{/if}
			{/if}
		{/if}
	</div>
</div>

<style>
	.retro_wrapper_inner_ejf {
		position: relative;
		z-index: 10;
		width: 100%;
		border-radius: 8px;
		border: 2px solid black;
		background-color: #fff;
		padding: 0px 16px 0px;
	}
</style>
