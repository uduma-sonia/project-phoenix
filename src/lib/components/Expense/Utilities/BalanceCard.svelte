<script lang="ts">
	import Helpers from '$lib/utils/helpers';

	let {
		title,
		value,
		balanceClass,
		currency
	}: { title: string; value: number; balanceClass?: string; currency: any } = $props();
</script>

<div class="min-w-[280px] flex-1">
	<div class="retro_wrapper balanceCard">
		<div class="retro_wrapper_inner_iwjd">
			<div class="flex h-16 flex-col justify-center">
				<p class="font-lexend mb-1 text-xs font-normal md:text-sm">{title}</p>
				<p class="font-lexend text-lg font-normal md:text-xl {balanceClass}">
					{#if currency}
						{Helpers.getCurrency(value, currency)}
					{:else}
						{'-'}
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
		border-radius: 14px !important;
		border: 2px solid black;
		background-color: #fff;
		padding: 2px 14px;
	}

	.balanceCard {
		border-radius: 14px !important;
	}
	.balanceCard::before,
	.balanceCard::after {
		border-radius: 14px !important;
	}
</style>
