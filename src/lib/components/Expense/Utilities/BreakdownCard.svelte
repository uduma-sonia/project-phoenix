<script lang="ts">
	import Helpers from '$lib/utils/helpers';
	import { AlertTriangleIcon, Check } from '@lucide/svelte';
	import ExpenseUtils from './utils';

	let { item, getCurrency, transactionCategoriesList } = $props();

	let budgetInfo = $derived(
		ExpenseUtils.getCategoryBudgetInfo(transactionCategoriesList, item?.categoryId)
	);
	let usedPercentage = $derived(Helpers.getPercentage(item?.totalAmount, budgetInfo?.budgetAmount));
</script>

<div class="retro_wrapper">
	<div class="retro_wrapper_inner_iwjd">
		<div class="flex items-center justify-between">
			<h5 class="font-lexend text-base font-light">{item?.categoryName}</h5>

			<div>
				{#if usedPercentage > 70}
					<div class="flex items-center gap-1">
						<p class="font-lexend text-11 font-normal">You are over budget</p>

						<div class="text-brand-error">
							<AlertTriangleIcon size="12px" />
						</div>
					</div>
				{:else}
					<div class="bg-brand-green aspect-square w-fit rounded-full p-1">
						<Check size="12px" color="#ffffff" />
					</div>
				{/if}
			</div>
		</div>

		<div class="mt-6">
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

		<div class="mt-6">
			<p class="font-lexend text-right text-sm font-light">
				{item?.count} transaction{Helpers.returnS(item?.count)}
			</p>
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

	.green_jdc {
		background-color: #1eb564;
	}
	.red_kjd {
		background-color: #e7000b;
	}
</style>
