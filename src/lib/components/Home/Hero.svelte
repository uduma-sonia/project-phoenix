<script>
	import Image from '../Common/Image.svelte';
</script>

<div class="mx-auto max-w-7xl px-4">
	<div class="mt-20 text-center">
		<h2 class="font-lexend herotext text-7xl font-bold tracking-tight">Organize your Life</h2>
		<p class="font-lexend mx-auto mt-6 max-w-[550px] font-light">
			<b class="font-semibold">Laniva</b> combines habit tracking, shared shopping lists, recipe manager
			and travel planning into a single, simple workspace so you spend less time juggling tools.
		</p>

		<div class="mx-auto mt-12 mb-8 w-[160px]">
			<a href="/signup">
				<button class="shadow_button shadow_button_thi shadow_button_sm" type="button">
					Start for free
				</button>
			</a>
		</div>

		<div class="text-center">
			<p class="font-lexend font-light">
				Already have an account? <a href="/login" class="font-medium underline">Login</a>
			</p>
		</div>
	</div>

	<div class="mt-14">
		<div class="hero_img_wrapper mx-auto h-[300px] w-full md:h-[500px] md:max-w-4xl lg:h-[600px]">
			<div class="hero_img_inner h-full overflow-hidden rounded-3xl border-2 bg-white p-4">
				<Image src="/images/stats_monthly.jpg" />
			</div>

			<div class="absolute top-1/2 -right-32 z-50 hidden -translate-y-1/2 lg:block">
				<div
					class="aspect-square w-[200px] overflow-hidden rounded-2xl border-2 bg-white p-1.5 shadow-xl"
				>
					<Image src="/images/standard_list.jpg" className="w-full h-full object-cover" />
				</div>
			</div>

			<div class="absolute -bottom-[100px] left-1/2 z-50 -translate-x-1/2 lg:hidden">
				<div
					class="aspect-square w-[150px] overflow-hidden rounded-2xl border-2 bg-white p-1.5 shadow-xl md:w-[200px]"
				>
					<Image src="/images/standard_list.jpg" className="w-full h-full object-cover" />
				</div>
			</div>
		</div>
	</div>
</div>

<style>
	.herotext {
		font-size: clamp(2.2rem, 5.5vw + 1rem, 4rem);
	}

	.hero_img_wrapper {
		position: relative;
	}

	.hero_img_wrapper::before {
		content: '';
		position: absolute;
		top: 6px;
		left: 6px;
		border: 2px solid black;
		width: 100%;
		height: 100%;
		z-index: 1;
		border-radius: 24px;
	}

	.hero_img_inner {
		position: relative;
		z-index: 2;
		background: white;
		border-radius: 24px;
		padding: 20px;
	}
</style>
