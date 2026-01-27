<script>
	import MoreItem from './MoreItem.svelte';
</script>

<div class="mx-auto max-w-[500px] pt-20 lg:max-w-full lg:pt-40">
	<div class="mb-12 text-center">
		<h3 class="font-crete text-2xl font-semibold md:text-3xl lg:text-4xl">
			Get started in seconds, access from anywhere
		</h3>
	</div>

	<div class="grid grid-cols-1 gap-6 md:gap-10 lg:grid-cols-3">
		<div>
			<MoreItem
				subtitle="EASY TO START"
				title="Quick signup, instant access"
				imgSrc="/images/undraw_authentication.svg"
			/>
		</div>
		<div>
			<MoreItem
				subtitle="EASY INSTALLATION"
				title="Skip the app store, install in seconds"
				imgSrc="/images/undraw_app-installation.svg"
			/>
		</div>
		<div>
			<MoreItem
				subtitle="EASY ACCESS"
				title="Access from any device, anywhere"
				imgSrc="/images/undraw_in-sync.svg"
			/>
		</div>
	</div>
</div>
