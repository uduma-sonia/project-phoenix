<script>
	import FeatureCard from './FeatureCard.svelte';
</script>

<div class="mx-auto max-w-7xl px-4 pt-36 md:pt-60">
	<div class="mb-20 text-center">
		<h2 class="font-lexend feature_heading mb-5 text-center text-7xl font-bold tracking-tight">
			Manage your activities in <span class="text-[#1eb564]"> one place</span>
		</h2>

		<p class="font-lexend mx-auto mt-4 max-w-[600px] font-light">
			Your life neatly in one place. Laniva keeps you on track without feeling like work software.
		</p>
	</div>

	<div class="grid grid-cols-1 gap-8 lg:grid-cols-2">
		<FeatureCard
			bgColor="#8cbf8091"
			title="Track your habits"
			description="Straightfoward habit tracker without the distracting bits. Build streaks and visualize progress with minimal setup."
		/>
		<FeatureCard
			bgColor="#ffa67391"
			title="Shopping list"
			description="Never forget items at the grocery store again.
            Create collaborative lists for your home, and grocery runs and invite anyone."
		/>

		<FeatureCard
			bgColor="#cfc4e791"
			title="Recipe manager"
			description="Save and share your recipes — auto-generate ingredient shopping lists and build your personal digital cookbook."
		/>
		<FeatureCard
			bgColor="#ff9a9a91"
			title="Plan your trips"
			description="Plan perfect trips with itineraries, activities and packing list. Collaborate with others or go solo."
		/>
	</div>
</div>

<style>
	.feature_heading {
		font-size: clamp(1.8rem, 1.8vw + 1rem, 3rem);
	}
</style>
