<script lang="ts">
	import Tag from '$lib/components/Common/Tag.svelte';
	import Helpers from '$lib/utils/helpers';
	import { slide } from 'svelte/transition';
	import type { TxnCardSortedItem } from '../../../../types/transaction';
	import CategoryDetails from './CategoryDetails.svelte';
	import { cubicOut } from 'svelte/easing';

	let {
		expense,
		currency,
		showTopExpensesTag,
		index,
		openedCategoryId,
		toggleCategory
	}: {
		expense: TxnCardSortedItem;
		currency: string;
		showTopExpensesTag: boolean;
		index: number;
		openedCategoryId?: string;
		toggleCategory: (categoryId: string) => void;
	} = $props();

	let budget: any = $derived(Helpers.getCurrency(Number(expense?.budgetAmount || 0), currency));
	let amount: any = $derived(Helpers.getCurrency(Number(expense?.amount || 0), currency));
	let isOpened: any = $derived(expense?.id === openedCategoryId);
</script>

<div
	class="baseTxn slide_in_u relative h-auto w-full rounded-2xl border-2 opacity-0animation_delay_{index}"
	class:openedExpense={isOpened}
>
	{#if showTopExpensesTag}
		<div class="absolute -top-3 right-3 -rotate-3">
			<p
				class="font-lexend bg-primary-pink-700 inline-block rounded-lg border-2 border-black px-2 py-0.5 text-[10px] font-normal text-white"
			>
				Top {Helpers.capitalizeFirstLetter(expense.type)}
			</p>
		</div>
	{/if}

	<div
		class="snippetContainer flex items-center justify-between gap-4 p-3"
		class:openedSnippetContainer={isOpened}
	>
		<div>
			<p class="font-suez mb-0.5 text-base font-medium md:text-lg">{expense.name}</p>
			<div class="font-lexend mb-0.5 flex items-center gap-2 text-sm font-normal md:text-sm">
				Spent:
				{amount}

				{#if expense?.count}
					<Tag variant="biloba" text={`${expense?.count} time${Helpers.returnS(expense?.count)}`} />
				{/if}
			</div>
			<div class="font-lexend mb-0.5 flex items-center gap-1 text-xs font-light md:text-xs">
				Budget:
				{budget}
			</div>
		</div>

		<div>
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
		<div transition:slide={{ duration: 400, easing: cubicOut }}>
			<CategoryDetails {openedCategoryId} />
		</div>
	{/if}
</div>

<style>
	.baseTxn {
		background-color: var(--color-primary-biloba-400);
	}

	.openedExpense {
		background-color: var(--color-primary-biloba-800);
	}

	.snippetContainer {
		color: #000000;
	}

	.openedSnippetContainer {
		color: #ffffff;
	}
</style>
