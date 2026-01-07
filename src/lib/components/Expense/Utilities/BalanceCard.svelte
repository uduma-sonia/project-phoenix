<script lang="ts">
	import { currencies } from '$lib/constants/currency';
	import Helpers from '$lib/utils/helpers';
	import type { User } from '../../../../types/user';

	let {
		title,
		value,
		balanceClass,
		user
	}: { title: string; value: number; balanceClass?: string; user: User } = $props();

	let getCurrency: any = $derived(
		Helpers.transformObjectToList(currencies[0])?.find((item) => item.id === user?.currency)
	);
</script>

<div class="min-w-[280px] flex-1">
	<div class="retro_wrapper">
		<div class="retro_wrapper_inner_iwjd">
			<div class="flex h-16 flex-col justify-center">
				<p class="font-lexend mb-2 text-xs font-light opacity-70 md:text-sm">{title}</p>
				<p class="font-lexend text-lg font-normal md:text-xl {balanceClass}">
					{#if getCurrency?.id}
						{Helpers.currencyFormatter({
							currency: getCurrency?.details?.code,
							minimumFractionDigits: getCurrency?.details.rounding,
							maximumFractionDigits: getCurrency?.details?.decimal_digits
						}).format(value)}
					{/if}
				</p>
			</div>
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
</style>
