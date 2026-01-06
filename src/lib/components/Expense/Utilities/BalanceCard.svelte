<script lang="ts">
	import { currencies } from '$lib/constants/currency';
	import Helpers from '$lib/utils/helpers';

	let { title, value, balanceClass }: { title: string; value: number; balanceClass?: string } =
		$props();

	const getCurrency: any = Helpers.transformObjectToList(currencies[0])?.find(
		(item) => item.id === 'NGN'
	);
</script>

<div class="min-w-[280px] flex-1">
	<div class="retro_wrapper">
		<div class="retro_wrapper_inner_iwjd">
			<div class="flex h-20 flex-col justify-center">
				<p class="font-lexend mb-2 text-xs font-light opacity-70 md:text-sm">{title}</p>
				<p class="font-lexend text-lg font-normal md:text-xl {balanceClass}">
					{Helpers.currencyFormatter({
						currency: getCurrency?.details?.code,
						minimumFractionDigits: getCurrency?.details.rounding,
						maximumFractionDigits: getCurrency?.details?.decimal_digits
					}).format(value)}
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
