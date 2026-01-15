<script lang="ts">
	import Helpers from '$lib/utils/helpers';

	let {
		title,
		value,
		balanceClass,
		currency
	}: { title: string; value: number; balanceClass?: string; currency: any } = $props();
</script>

<div class="min-w-[280px] flex-1">
	<div class="retro_wrapper">
		<div class="retro_wrapper_inner_iwjd">
			<div class="flex h-16 flex-col justify-center">
				<p class="font-lexend mb-2 text-xs font-light opacity-70 md:text-sm">{title}</p>
				<p class="font-lexend text-lg font-normal md:text-xl {balanceClass}">
					{#if currency?.id}
						{Helpers.currencyFormatter({
							currency: currency?.details?.code,
							minimumFractionDigits: currency?.details.rounding,
							maximumFractionDigits: currency?.details?.decimal_digits
						}).format(value)}
					{/if}
				</p>
			</div>
		</div>
	</div>
</div>

<style>
	.retro_wrapper_inner_iwjd {
		position: relative;
		z-index: 10;
		width: 100%;
		border-radius: 8px;
		border: 2px solid black;
		background-color: #fff;
		padding: 16px;
	}
</style>
