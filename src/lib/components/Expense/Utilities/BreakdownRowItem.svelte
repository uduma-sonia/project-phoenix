<script lang="ts">
	import { currencies } from '$lib/constants/currency';
	import Helpers from '$lib/utils/helpers';

	let { item } = $props();

	const getCurrency: any = Helpers.transformObjectToList(currencies[0])?.find(
		(item) => item.id === 'NGN'
	);
</script>

<tr>
	<td class="font-lexend border-b border-gray-300 py-2.5">
		<p class="text-[15px]">{item?.categoryName}</p>

		<p class="text-xs font-light text-gray-600">{item?.count} time{Helpers.returnS(item.count)}</p>
	</td>
	<td class="font-lexend border-b border-gray-300">
		<div class="flex items-center justify-end gap-3">
			<div>
				<p class="font-lexend text-sm">
					{Helpers.currencyFormatter({
						currency: getCurrency?.details?.code,
						minimumFractionDigits: getCurrency?.details.rounding,
						maximumFractionDigits: getCurrency?.details?.decimal_digits
					}).format(item?.totalAmount)}
				</p>
			</div>
		</div>
	</td>
</tr>
