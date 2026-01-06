<script lang="ts">
	import HamburgerDropdown from '$lib/components/Common/HamburgerDropdown.svelte';
	import { currencies } from '$lib/constants/currency';
	import Helpers from '$lib/utils/helpers';
	import { SquarePen, Trash2 } from '@lucide/svelte';
	import { format } from 'date-fns';
	import type { Transaction } from '../../../../types/transaction';

	let { txn }: { txn: Transaction } = $props();

	const getCurrency: any = Helpers.transformObjectToList(currencies[0])?.find(
		(item) => item.id === 'NGN'
	);
</script>

<div class="flex h-16 items-stretch">
	<div class="font-lexend flex h-full w-1/3 flex-col justify-center border-b border-gray-300">
		<p class="text-[15px]">{txn?.categoryName}</p>

		<p class="text-xs font-light text-gray-600">
			{#if txn?.date}
				{format(new Date(txn.date), 'PP')}
			{/if}
		</p>
	</div>
	<div class="font-lexend flex h-full w-1/3 flex-col justify-center border-b border-gray-300">
		<div class="font-lexend">
			<p class="text-13 font-light">{txn?.description || '-'}</p>
		</div>
	</div>
	<div class="font-lexend flex h-full w-1/3 flex-col justify-center border-b border-gray-300">
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
	</div>
</div>
