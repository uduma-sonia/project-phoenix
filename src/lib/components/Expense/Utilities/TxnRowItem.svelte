<script lang="ts">
	import HamburgerDropdown from '$lib/components/Common/HamburgerDropdown.svelte';
	import { currencies } from '$lib/constants/currency';
	import Helpers from '$lib/utils/helpers';
	import { SquarePen, Trash2 } from '@lucide/svelte';
	import { format } from 'date-fns';

	let {} = $props();

	const getCurrency: any = Helpers.transformObjectToList(currencies[0])?.find(
		(item) => item.id === 'NGN'
	);
</script>

<tr>
	<td class="font-lexend border-b border-gray-300 py-3">
		<p class="text-[15px]">POS - CASH</p>

		<p class="text-xs font-light text-gray-600">
			{format(new Date(), 'PP')}
		</p>
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

			<div>
				<HamburgerDropdown
					options={[
						{
							label: 'Edit',
							icon: SquarePen
						},
						{
							label: 'Delete',
							icon: Trash2,
							iconColor: 'red'
						}
					]}
				/>
			</div>
		</div>
	</td>
</tr>
