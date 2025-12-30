<script lang="ts">
	import { currencies } from '$lib/constants/currency';
	import Helpers from '$lib/utils/helpers';

	let { trip } = $props();

	function getBudget() {
		const getCurrency: any = Helpers.transformObjectToList(currencies[0])?.find(
			(item) => item.id === trip.currency
		);

		console.log(getCurrency);

		let amount = '-';
		if (getCurrency?.details) {
			amount = Helpers.currencyFormatter({
				currency: getCurrency?.details?.code,
				minimumFractionDigits: getCurrency?.details.rounding,
				maximumFractionDigits: getCurrency?.details?.decimal_digits
			}).format(Number(trip?.budget) || 0);
		}
		return amount;
	}
</script>

<div class="flex gap-4">
	<div class="w-full">
		<div class="retro_wrapper">
			<div class="retro_wrapper_inner">
				<p class="font-lexend mb-2 text-sm font-light">Budget</p>
				<p class="font-lexend text-base font-normal md:text-xl">
					{getBudget()}
				</p>
			</div>
		</div>
	</div>
</div>
