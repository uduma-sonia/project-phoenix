<script>
	import MoreItem from './MoreItem.svelte';
</script>

<div class="mx-auto max-w-7xl px-4 pt-36 pb-[20px] md:pt-[200px] lg:pb-[100px]">
	<div class="mb-10 text-center md:mb-40" id="features">
		<!-- <h2 class="font-crete feature_heading text-center font-bold tracking-tight">
			Simple Organization.
			<br /> <span>Easy Living</span>
		</h2> -->

		<h3 class="font-crete text-2xl font-semibold md:text-3xl lg:text-4xl">
			Simple Organization.
			<br /> <span>Easy Living</span>
		</h3>
		<!-- 
		<p class="font-lexend mx-auto mt-4 max-w-[600px] font-light">
			<b class="font-semibold">Laniva</b> keeps you on track without feeling like work software.
		</p> -->
	</div>

	<div class="grid grid-cols-1 gap-10 lg:grid-cols-3">
		<div>
			<MoreItem
				subtitle="EASY TO START"
				title="Quick signup, instant start"
				imgSrc="/images/undraw_authentication.svg"
			/>
		</div>
		<div>
			<MoreItem
				subtitle="EASY INSTALLATION"
				title="Skip the app store entirely"
				imgSrc="/images/undraw_app-installation.svg"
			/>
		</div>
		<div>
			<MoreItem
				subtitle="EASY ACCESS"
				title="Access anywhere on any device"
				imgSrc="/images/undraw_in-sync.svg"
			/>
		</div>
	</div>
</div>

<style>
	.feature_heading {
		font-size: clamp(1.8rem, 1.8vw + 1rem, 3rem);
	}
</style>
