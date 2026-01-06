<script lang="ts">
	import HamburgerDropdown from '$lib/components/Common/HamburgerDropdown.svelte';
	import { currencies } from '$lib/constants/currency';
	import Helpers from '$lib/utils/helpers';
	import { SquarePen, Trash2 } from '@lucide/svelte';
	import { format } from 'date-fns';
	import { TransactionType, type Transaction } from '../../../../types/transaction';

	let { txn, handleDelete }: { txn: Transaction; handleDelete: (id: string) => void } = $props();

	const getCurrency: any = Helpers.transformObjectToList(currencies[0])?.find(
		(item) => item.id === 'NGN'
	);

	function _handleDelete() {
		handleDelete(txn?._id);
	}
</script>

<div class="flex h-14 min-w-[600px] items-stretch">
	<div class="font-lexend flex h-full flex-1 flex-col justify-center border-b border-gray-300 pr-3">
		<p class="text-[15px]">{txn?.categoryName}</p>
	</div>

	<div class="font-lexend flex h-full flex-1 flex-col justify-center border-b border-gray-300 pr-3">
		<div class="font-lexend">
			<p class="text-11 md:text-13 font-light">{txn?.description || '-'}</p>
		</div>
	</div>

	<div class="font-lexend flex h-full w-fit flex-col justify-center border-b border-gray-300 pr-3">
		<p class="text-xs font-light text-gray-600">
			{#if txn?.date}
				{format(new Date(txn.date), 'PP')}
			{/if}
		</p>
	</div>

	<div class="font-lexend flex h-full flex-1 flex-col justify-center border-b border-gray-300">
		<div class="flex items-center justify-end gap-3">
			<div>
				<p
					class="font-lexend text-sm"
					class:text-brand-error={txn.type === TransactionType.EXPENSE}
					class:text-brand-green={txn.type === TransactionType.INCOME}
				>
					{#if txn.type === TransactionType.EXPENSE}
						-
					{:else}
						+
					{/if}{Helpers.currencyFormatter({
						currency: getCurrency?.details?.code,
						minimumFractionDigits: getCurrency?.details.rounding,
						maximumFractionDigits: getCurrency?.details?.decimal_digits
					}).format(txn.amount)}
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
							iconColor: 'red',
							action: _handleDelete
						}
					]}
				/>
			</div>
		</div>
	</div>
</div>
