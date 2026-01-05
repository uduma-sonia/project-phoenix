<script>
	import BreakdownRowItem from './BreakdownRowItem.svelte';
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
				<BreakdownRowItem />
				<BreakdownRowItem />
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
		padding: 16px;
	}
</style>
