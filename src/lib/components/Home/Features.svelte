<script>
	import FeatureCardV2 from './FeatureCard.svelte';
	import { homeFeaturesList } from '$lib/constants/global';
</script>

<div class="mx-auto max-w-7xl px-4 pt-44 lg:pt-60">
	<div class="mb-14 text-center md:mb-40">
		<h2 class="font-lexend feature_heading mb-5 text-center font-bold tracking-tight">
			Manage Your Activities
			<br /> <span class="text-brand-quit">in One Place</span>
		</h2>

		<p class="font-lexend mx-auto mt-4 max-w-[600px] font-light">
			<b class="font-semibold">Laniva</b> keeps you on track without feeling like work software.
		</p>
	</div>

	<div class="space-y-32 lg:space-y-72">
		{#each homeFeaturesList as item (item.id)}
			<FeatureCardV2
				feature={item.id}
				title={item.title}
				imageUrl={item.imageUrl}
				ListIcon={item.icon}
				featuresList={item.features}
				isReverse={item.isReverse}
			/>
		{/each}
	</div>
</div>

<style>
	.feature_heading {
		font-size: clamp(1.8rem, 1.8vw + 1rem, 3rem);
	}
</style>
