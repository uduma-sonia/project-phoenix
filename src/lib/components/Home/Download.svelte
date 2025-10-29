<script>
	import MoreItem from './MoreItem.svelte';
</script>

<div class="mx-auto max-w-7xl px-4 pt-36 pb-[200px] md:pt-[300px]">
	<!-- <div class="mx-auto max-w-7xl px-4 pt-36 md:pt-40"> -->
	<!-- <div class="mb-20 text-center">
		<h2 class="font-lexend feature_heading mb-5 text-center text-7xl font-bold tracking-tight">
			Simple, affordable pricing
		</h2>

		<p class="font-lexend mx-auto mt-4 max-w-[600px] font-light">
			No credit card required, no commitments.
		</p>
	</div> -->

	<div class="grid grid-cols-3">
		<div class="border">
			<MoreItem subtitle="EASY TO START" title="Quick signup, instant start" />
		</div>
		<div class="border">
			<MoreItem subtitle="EASY INSTALLATION" title="Skip the app store entirely" />
		</div>
		<div class="border">
			<MoreItem subtitle="YOU ONLY NEED ONE APP" title="Access anywhere on any device" />
		</div>
	</div>
</div>

<style>
	.feature_heading {
		font-size: clamp(1.8rem, 1.8vw + 1rem, 3rem);
	}
</style>
