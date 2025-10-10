<script>
	import PricingCard from './PricingCard.svelte';

	const plansList = [
		{
			amount: 'Free',
			interval: '',
			discount: '',
			offerings: [
				'Unlimited personal habit tracker',
				'Habit tracker analytics',
				'Unlimited shopping list',
				'Save up to 30 recipes',
				'Share recipe with others',
				'Solo trip planner',
				'Email support'
			],
			isFree: true
		},
		{
			amount: '$4',
			interval: 'Monthly',
			discount: '',
			offerings: [
				'Shared shopping list',
				'Unlimited recipes',
				'Custom themes',
				'Group trip planner',
				'Connect Pinterest'
			]
		}
	];
</script>

<div class="mx-auto max-w-7xl px-4 pt-36 md:pt-40">
	<div class="mb-20 text-center" id="pricing">
		<h2 class="font-lexend feature_heading mb-5 text-center text-7xl font-bold tracking-tight">
			Simple, affordable pricing
		</h2>

		<p class="font-lexend mx-auto mt-4 max-w-[600px] font-light">
			No credit card required, no commitments.
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
				Start for free
			</button>
		</a>
	</div>
</div>

<style>
	.feature_heading {
		font-size: clamp(1.8rem, 1.8vw + 1rem, 3rem);
	}
</style>
