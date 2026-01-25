<script lang="ts">
	import ListItem from './Utilities/ListItem.svelte';
	import { addToast } from '$lib/store/toast';
	import { ShoppingRequest } from '$lib/requests';
	import { queryKeys } from '$lib/utils/queryKeys';
	import { useQueryClient } from '@tanstack/svelte-query';
	import { page } from '$app/state';
	import Seo from '../Common/SEO.svelte';
	import LoaderError from '../Common/LoaderError.svelte';
	import Helpers from '$lib/utils/helpers';

	let { boardItemsQuery } = $props();

	let queryClient = useQueryClient();
	let boardId = page.params.id;

	let listName = $derived(page.url.searchParams.get('q') || '');
	let currency = $derived(page.url.searchParams.get('c') || '');

	let searchQuery = $state('');
	let canEditId = $state('');
	let itemsList = $derived($boardItemsQuery?.data?.data?.shoppingItems);

	let filteredItems = $derived(
		itemsList?.filter((item: any) => item.name.toUpperCase().includes(searchQuery.toUpperCase()))
	);
	let _total = $derived(
		Helpers.getAmountAndCurrency(
			Helpers.sumArray(filteredItems?.map((item: { price: number }) => item.price)),
			null,
			currency
		)
	);
	let completedLength = $derived(filteredItems?.filter((item: any) => item.done));

	function sortByDone(items: any[]) {
		return items?.sort((a, b) => {
			if (a.done === b.done) return 0;
			return a.done ? 1 : -1;
		});
	}

	async function handleCheckItem(itemId: string, _done: boolean) {
		try {
			const result = await ShoppingRequest.updateOpenItem(itemId, {
				done: _done
			});

			if (result) {
				queryClient.invalidateQueries({ queryKey: queryKeys.getOpenBoardItems(boardId) });
			}
		} catch (error: any) {
			addToast(error?.message || 'An error occured', 'error');
		}
	}
</script>

<Seo title={decodeURIComponent(listName)} />

<div class="px-3 pb-20">
	<div>
		<p class="mt-6 text-center text-xl">
			{decodeURIComponent(listName)}
		</p>
	</div>

	<div class="mx-auto mt-8 max-w-lg">
		<div>
			<LoaderError isLoading={$boardItemsQuery?.isLoading} error={$boardItemsQuery?.isError} />

			{#if _total}
				<div class="mt-4 flex items-center justify-between px-1">
					<p class="font-lexend font-medium">Total amount</p>

					<div class="flex items-center gap-2">
						<p class="font-lexend text-right font-light">
							{_total}
						</p>

						<p class="font-lexend text-sm font-extralight">
							{completedLength?.length || 0} / {filteredItems?.length || '0'}
						</p>
					</div>
				</div>
			{/if}

			{#if !$boardItemsQuery?.isLoading}
				<div>
					<div class="mt-6 space-y-2">
						{#each sortByDone(filteredItems) as item, index (index)}
							<ListItem
								price={Helpers.getAmountAndCurrency(item?.price, null, currency)}
								{canEditId}
								data={item}
								handleUpdateItem={handleCheckItem}
								canEdit={false}
							/>
						{/each}
					</div>
				</div>
			{/if}
		</div>
	</div>
</div>
