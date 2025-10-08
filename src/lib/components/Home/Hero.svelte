<div class="mx-auto max-w-7xl px-4">
	<div class="mt-20 text-center">
		<h2 class="font-lexend herotext text-7xl font-bold tracking-tight">Organize your Life</h2>
		<p class="font-lexend mx-auto mt-4 max-w-[500px] font-light">
			Laniva combines habit tracking, shared shopping boards, recipes and travel planning into a
			single, simple workspace so you spend less time juggling tools.
		</p>

		<div class="mx-auto mt-12 mb-10 w-[160px]">
			<button class="shadow_button shadow_button_thi shadow_button_sm" type="button">
				Start for free
			</button>
		</div>

		<div class="text-center">
			<p class="font-lexend font-light">
				Already have an account? <a href="/login" class="font-medium underline">Login</a>
			</p>
		</div>
	</div>

	<div class="mt-12">
		<div class="hero_img_wrapper mx-auto h-[400px] w-full md:h-[600px] md:max-w-4xl">
			<div class="hero_img_inner h-full rounded-3xl border-2 bg-white p-4">
				<div>INNER</div>
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
