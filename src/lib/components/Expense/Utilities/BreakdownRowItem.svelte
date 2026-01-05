<script lang="ts">
	import { currencies } from '$lib/constants/currency';
	import Helpers from '$lib/utils/helpers';

	let {} = $props();

	const getCurrency: any = Helpers.transformObjectToList(currencies[0])?.find(
		(item) => item.id === 'NGN'
	);
</script>

<tr>
	<td class="font-lexend border-b border-gray-300 py-3">
		<p class="text-[15px]">Food delivery</p>

		<p class="text-xs font-light text-gray-600">2</p>
	</td>
	<td class="font-lexend border-b border-gray-300">
		<div class="flex items-center justify-end gap-3">
			<div>
				<p class="font-lexend text-sm">
					{Helpers.currencyFormatter({
						currency: getCurrency?.details?.code,
						minimumFractionDigits: getCurrency?.details.rounding,
						maximumFractionDigits: getCurrency?.details?.decimal_digits
					}).format(1000)}
				</p>
			</div>
		</div>
	</td>
</tr>
