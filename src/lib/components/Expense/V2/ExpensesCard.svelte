<script lang="ts">
	import Tag from '$lib/components/Common/Tag.svelte';
	import Helpers from '$lib/utils/helpers';
	import type { TxnCardSortedItem } from '../../../../types/transaction';
	import CategoryDetails from './CategoryDetails.svelte';

	let {
		expense,
		currency,
		showTopExpensesTag,
		openedCategoryId,
		toggleCategory,
		start,
		end
	}: {
		expense: TxnCardSortedItem;
		currency: string;
		showTopExpensesTag: boolean;
		openedCategoryId?: string;
		start?: any;
		end?: any;
		toggleCategory: (categoryId: string) => void;
	} = $props();

	let budget: any = $derived(Helpers.getCurrency(Number(expense?.budgetAmount || 0), currency));
	let amount: any = $derived(Helpers.getCurrency(Number(expense?.amount || 0), currency));
	let isOpened: any = $derived(expense?.id === openedCategoryId);
</script>

<div class="baseTxn relative h-auto w-full rounded-2xl border-2" class:openedExpense={isOpened}>
	<div
		class="snippetContainer flex items-center justify-between gap-4 p-3"
		class:openedSnippetContainer={isOpened}
	>
		<div class="flex flex-1 items-center justify-between gap-2">
			<div>
				<p class="font-suez mb-0.5 text-base font-medium md:text-lg">{expense.name}</p>
				<div class="font-lexend mb-0.5 flex items-center gap-2 text-sm font-normal md:text-sm">
					Spent:
					{amount}

					{#if expense?.count}
						<Tag variant="biloba" text={`x ${expense?.count}`} />
					{/if}
				</div>
				<div class="font-lexend mb-0.5 flex items-center gap-1 text-xs font-light md:text-xs">
					Budget:
					{budget}
				</div>
			</div>

			{#if showTopExpensesTag}
				<p
					class="font-lexend bg-primary-pink-700 inline-block rounded-lg border-2 border-black px-2 py-0.5 text-[10px] font-normal text-white"
				>
					Top {Helpers.capitalizeFirstLetter(expense.type)}
				</p>
			{/if}
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
					class="h-[2px] w-4 -translate-y-[1.5px] rounded-full bg-white transition-all duration-300 ease-in-out"
				></div>

				<div
					class:-rotate-45={isOpened}
					class:-translate-y-[2.5px]={isOpened}
					class="h-[2px] w-4 rounded-full bg-white transition-all duration-300 ease-in-out"
				></div>
			</button>
		</div>
	</div>

	{#if isOpened}
		<CategoryDetails {currency} {start} {end} {openedCategoryId} />
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
