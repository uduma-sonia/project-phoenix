<script>
	import { plansList } from '$lib/constants/global';
	import PricingCard from './PricingCard.svelte';
</script>

<div class="mx-auto max-w-[500px] pt-20 lg:max-w-full lg:pt-40">
	<div class="mb-20 text-center" id="pricing">
		<h3 class="font-crete text-2xl font-semibold md:text-3xl lg:text-4xl">
			Simple, affordable pricing
		</h3>

		<p class="font-lexend mx-auto mt-4 max-w-[600px] font-light">
			<span class="">No</span> credit card required, no commitments.
		</p>
	</div>

	<div class="flex flex-wrap justify-center gap-8">
		{#each plansList as plan, index (index)}
			<PricingCard {plan} />
		{/each}
	</div>

	<div class="mx-auto mt-16 mb-10 w-[160px]">
		<a href="/signup">
			<button class="shadow_button shadow_button_thi shadow_button_sm" type="button">
				Start For Free
			</button>
		</a>
	</div>
</div>
