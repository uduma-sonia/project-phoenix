<script lang="ts">
	import BreakdownRowItem from './BreakdownRowItem.svelte';

	let { breakdownList } = $props();
</script>

<div class="">
	<div class="mb-4 flex items-center justify-between gap-4">
		<p class="text-lg font-medium md:text-xl">Spending Breakdown</p>
	</div>
</div>

<div class="retro_wrapper">
	<div class="retro_wrapper_inner_ejf">
		<table class="w-full border-collapse">
			<tbody>
				{#if breakdownList}
					{#each breakdownList as item, index (index)}
						<BreakdownRowItem {item} />
					{/each}
				{/if}
			</tbody>
		</table>
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
