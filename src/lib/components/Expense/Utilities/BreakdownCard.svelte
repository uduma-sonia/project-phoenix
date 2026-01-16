<script lang="ts">
	import Helpers from '$lib/utils/helpers';
	import ExpenseUtils from './utils';
	import TextButton from '$lib/components/Common/Form/TextButton.svelte';
	import { openAddBudgetModal } from '$lib/state/modal.svelte';

	let { item, getCurrency, transactionCategoriesList } = $props();

	let budgetInfo = $derived(
		ExpenseUtils.getCategoryBudgetInfo(transactionCategoriesList, item?.categoryId)
	);
	let usedPercentage = $derived(Helpers.getPercentage(item?.totalAmount, budgetInfo?.budgetAmount));
</script>

<div class="retro_wrapper">
	<div class="retro_wrapper_inner_iwjd">
		<div class="flex items-center justify-between">
			<h5 class="font-lexend text-base font-normal">{item?.categoryName}</h5>

			<div>
				<div>
					<p
						class="font-lexend text-10 font-light"
						class:text-brand-error={usedPercentage > 70}
						class:text-brand-green={usedPercentage < 70}
					>
						{ExpenseUtils.budgetText(usedPercentage)}
					</p>
				</div>
			</div>
		</div>

		<div class="mt-10">
			<div class="font-lexend text-13 flex items-center justify-between gap-2 font-light">
				<p>
					{#if getCurrency?.id}
						{Helpers.currencyFormatter({
							currency: getCurrency?.details?.code,
							minimumFractionDigits: getCurrency?.details.rounding,
							maximumFractionDigits: getCurrency?.details?.decimal_digits
						}).format(item?.totalAmount)}
					{/if}
				</p>
				<p>
					{#if getCurrency?.id && budgetInfo?.budgetAmount}
						{Helpers.currencyFormatter({
							currency: getCurrency?.details?.code,
							minimumFractionDigits: getCurrency?.details.rounding,
							maximumFractionDigits: getCurrency?.details?.decimal_digits
						}).format(budgetInfo?.budgetAmount)}
					{/if}
				</p>
			</div>
			<div class="relative mt-1 h-1.5 overflow-hidden rounded-lg border border-gray-400">
				<div
					class="absolute top-0 z-20 h-full rounded-2xl"
					style="width: {usedPercentage}%;"
					class:green_jdc={usedPercentage <= 70}
					class:red_kjd={usedPercentage > 70}
				></div>

				<div
					class="font-lexend text-11 absolute -bottom-5 font-light"
					style="left: {usedPercentage}%;"
				>
					{usedPercentage || 0}%
				</div>
			</div>
		</div>

		<div class="mt-10 flex items-center justify-between">
			<div>
				<TextButton
					className="set_budget"
					action={() => openAddBudgetModal(budgetInfo)}
					label="Budget"
				/>
			</div>
			<p class="font-lexend text-right text-xs font-light">
				{item?.count} transaction{Helpers.returnS(item?.count)}
			</p>
		</div>
	</div>
</div>

<style>
	:global(.set_budget) {
		font-size: 14px;
	}
	.retro_wrapper_inner_iwjd {
		position: relative;
		z-index: 10;
		width: 100%;
		border-radius: 8px;
		border: 2px solid black;
		background-color: #fff;
		padding: 16px;
	}

	.green_jdc {
		background-color: #1eb564;
	}
	.red_kjd {
		background-color: #e7000b;
	}
</style>
