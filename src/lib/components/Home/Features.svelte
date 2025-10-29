<script>
	import { ChefHat, Plane, ShoppingCart, Sprout } from '@lucide/svelte';
	import FeatureCardV2 from './FeatureCard.svelte';
</script>

<div class="mx-auto max-w-7xl px-4 pt-44 lg:pt-60">
	<div class="mb-14 text-center md:mb-40" id="features">
		<h2 class="font-lexend feature_heading mb-5 text-center font-bold tracking-tight">
			Manage Your Activities
			<br /> <span class="text-brand-quit">in One Place</span>
		</h2>

		<p class="font-lexend mx-auto mt-4 max-w-[600px] font-light">
			<b class="font-semibold">Laniva</b> keeps you on track without feeling like work software.
		</p>
	</div>

	<div class="space-y-32 lg:space-y-72">
		<FeatureCardV2
			feature="tracker"
			title="Track your habits"
			imageUrl="/images/tracker_img.jpg"
			ListIcon={Sprout}
			featuresList={[
				'Straightfoward habit tracker without the distracting bits',
				'Build streaks and visualize progress with minimal setup',
				'Progress charts and monthly/yearly trends',
				'Streaks, streak freeze and streak history to keep momentum'
			]}
		/>
		<FeatureCardV2
			feature="shopping"
			title="Shopping list"
			imageUrl="/images/shopping_list_img.jpg"
			ListIcon={ShoppingCart}
			isReverse
			featuresList={[
				'Create collaborative lists for your home, and grocery runs',
				'Add items as you remember, never forget anything again',
				'Print/export lists and email or share invite links',
				'Shared boards with real-time sync'
			]}
		/>

		<FeatureCardV2
			feature="recipe"
			title="Recipe manager"
			imageUrl="/images/recipe_img2.jpg"
			ListIcon={ChefHat}
			featuresList={[
				'Straightfoward recipe manager',
				'Auto-generate ingredient shopping lists',
				'Scale ingredients by servings and auto-convert units',
				'Share recipes or publish public recipe pages'
			]}
		/>
		<FeatureCardV2
			feature="trip"
			title="Plan your trips"
			imageUrl="/images/trip_img.jpg"
			ListIcon={Plane}
			isReverse
			featuresList={[
				'Plan perfect trips with itineraries, activities and packing list',
				'Collaborate with others or go solo.',
				'Packing lists',
				'Build itineraries with days, activities and times'
			]}
		/>
	</div>
</div>

<!-- ChefHat -->

<style>
	.feature_heading {
		font-size: clamp(1.8rem, 1.8vw + 1rem, 3rem);
	}
</style>
