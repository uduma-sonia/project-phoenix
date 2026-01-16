<script lang="ts">
	import Helpers from '$lib/utils/helpers';

	let { item, getCurrency } = $props();
</script>

<tr>
	<td class="font-lexend border-b border-gray-300 py-2.5">
		<p class="text-[15px]">{item?.categoryName}</p>
	</td>

	<td class="font-lexend w-[100px] border-b border-gray-300 px-2 text-center">
		<p class="text-xs font-light text-gray-800">{item?.count}</p>
	</td>
	<td class="font-lexend border-b border-gray-300">
		<div class="flex items-center justify-end gap-3">
			<div>
				<p class="font-lexend text-sm">
					{#if getCurrency?.id}
						{Helpers.currencyFormatter({
							currency: getCurrency?.details?.code,
							minimumFractionDigits: getCurrency?.details.rounding,
							maximumFractionDigits: getCurrency?.details?.decimal_digits
						}).format(item?.totalAmount)}
					{/if}
				</p>
			</div>
		</div>
	</td>
</tr>
