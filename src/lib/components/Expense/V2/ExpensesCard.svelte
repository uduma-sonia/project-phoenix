<script lang="ts">
	import Tag from '$lib/components/Common/Tag.svelte';
	import Helpers from '$lib/utils/helpers';
	import { CircleCheck, TriangleAlert } from '@lucide/svelte';
	import type { TxnCardSortedItem } from '../../../../types/transaction';
	import ExpenseUtils from '../Utilities/utils';
	import CategoryDetails from './CategoryDetails.svelte';

	let {
		expense,
		currency,
		showTopExpensesTag,
		openedCategoryId,
		toggleCategory,
		start,
		end,
		budgetAlertThreshold = 0
	}: {
		expense: TxnCardSortedItem;
		currency: string;
		showTopExpensesTag: boolean;
		openedCategoryId?: string;
		start?: any;
		end?: any;
		budgetAlertThreshold?: number;
		toggleCategory: (categoryId: string) => void;
	} = $props();

	let budget: any = $derived(Helpers.getCurrency(Number(expense?.budgetAmount || 0), currency));
	let amount: any = $derived(Helpers.getCurrency(Number(expense?.amount || 0), currency));
	let isOpened: any = $derived(expense?.id === openedCategoryId);
	let usedPercentage = $derived(Helpers.getPercentage(expense?.amount, expense?.budgetAmount));
	// let _usedPercentage = $derived(usedPercentage >= 100 ? 100 : 0);
	let isBudgetMode = $derived(Boolean(expense?.budgetAmount));

	// $effect(() => console.log(expense));
</script>

<div class="baseTxn relative h-auto w-full rounded-2xl border-2" class:openedExpense={isOpened}>
	<div
		class="snippetContainer flex items-center justify-between gap-4 p-3"
		class:openedSnippetContainer={isOpened}
	>
		<div class="flex flex-1 items-center justify-between gap-2">
			<div>
				<p class="font-suez mb-0.5 text-lg font-medium md:text-xl">{expense.name}</p>
				<div class="font-lexend mb-0.5 flex items-center gap-2 text-sm font-normal md:text-sm">
					<strong> Spent: </strong>
					{amount}

					<div class="font-lexend text-10 flex items-center gap-1 font-normal">
						{ExpenseUtils.budgetText(usedPercentage, budgetAlertThreshold)}
						{#if usedPercentage > budgetAlertThreshold}
							<TriangleAlert color="#e7000b" size="14px" />
						{:else}
							<CircleCheck size="14px" color="#222" />
						{/if}
					</div>
				</div>
				<div class="font-lexend mb-0.5 flex items-center gap-2 text-sm font-normal md:text-sm">
					<strong> Budget: </strong>
					{budget}
				</div>

				<div class="mt-2 flex items-center gap-2">
					{#if expense?.count}
						<Tag variant="biloba" text={`x ${expense?.count}`} />
					{/if}

					{#if isBudgetMode}
						<div
							class="relative isolate flex h-[24px] w-40 items-center justify-center overflow-hidden rounded-lg border bg-white"
						>
							<div
								class="bg-primary-biloba-900 absolute top-0 left-0 z-10 h-full"
								style="width: {usedPercentage}%; transition: width 0.4s linear;"
							></div>

							<p
								class="font-lexend-deca text-brand-light relative z-20 text-[10px] font-bold mix-blend-difference"
							>
								{usedPercentage}%
							</p>
						</div>
					{/if}

					{#if showTopExpensesTag}
						<p
							class="font-lexend bg-primary-orange inline-block rounded-lg border-2 border-black px-2 py-0.5 text-[10px] font-normal text-white"
						>
							Top {Helpers.capitalizeFirstLetter(expense.type)}
						</p>
					{/if}
				</div>
			</div>
		</div>

		<div class="min-w-max">
			<button
				aria-label={isOpened ? 'Close category' : 'Open category'}
				aria-expanded={isOpened}
				onclick={() => toggleCategory(expense.id)}
				class="flex aspect-square w-8 flex-col items-center justify-center gap-0.5 rounded-full border-2 border-black bg-black"
			>
				<div
					class:rotate-45={isOpened}
					class:translate-y-[2.5px]={isOpened}
					class="h-[2px] w-3 -translate-y-[1.5px] rounded-full bg-white transition-all duration-300 ease-in-out"
				></div>

				<div
					class:-rotate-45={isOpened}
					class:-translate-y-[2.5px]={isOpened}
					class="h-[2px] w-3 rounded-full bg-white transition-all duration-300 ease-in-out"
				></div>
			</button>
		</div>
	</div>

	{#if isOpened}
		<CategoryDetails {expense} {currency} {start} {end} {openedCategoryId} />
	{/if}
</div>

<style>
	.baseTxn {
		background-color: var(--color-primary-biloba-400);
	}

	.openedExpense {
		background-color: var(--color-primary-olive);
	}

	.snippetContainer {
		color: #000000;
	}

	.openedSnippetContainer {
		color: #111111;
	}
</style>
