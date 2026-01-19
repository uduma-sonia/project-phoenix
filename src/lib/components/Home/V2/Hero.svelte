<script lang="ts">
	import BasicButton from '$lib/components/Common/Form/BasicButton.svelte';
	import Image from '$lib/components/Common/Image.svelte';
</script>

{#snippet pill(value: string, wrapperClass?: string)}
	<div class="pill_wrapper {wrapperClass}">
		<div
			class="py- relative z-10 flex h-fit w-full items-center gap-3 rounded-full border-2 border-black bg-white px-4 py-2 md:px-4"
		>
			<p class="font-lexend w-full text-center text-sm font-normal md:text-base">{value}</p>
		</div>
	</div>
{/snippet}

<div class="mx-auto max-w-7xl px-4">
	<div class="grid grid-cols-1 gap-4 lg:h-[700px] lg:grid-cols-2">
		<div class="flex h-[400px] items-center lg:h-full">
			<div class="w-full">
				<h1
					class="font-crete text-center text-4xl font-bold sm:text-5xl lg:text-left lg:text-[60px]"
				>
					All-in-one <br /> life organizer
				</h1>

				<p
					class="font-lexend mx-auto my-6 max-w-lg text-center text-sm font-light md:my-8 md:text-base lg:mx-0 lg:text-left"
				>
					Laniva is a small ecosystem of connected tools that helps personal productivity and
					organization with a simple workspace without feeling like work software.
				</p>

				<div class="mx-auto w-fit lg:mx-0">
					<a href="/signup">
						<BasicButton label="Start for free" />
					</a>
				</div>
			</div>
		</div>

		<div class="flex items-center justify-center">
			<div class="relative h-[400px] w-full max-w-[550px] lg:h-[600px] lg:w-[85%]">
				<Image
					src="/images/recipe-ss-iphone15.png"
					className="h-full mx-auto"
					fetchpriority="high"
				/>

				<div class="absolute top-[70%] right-0 z-50 hidden -translate-y-1/2 lg:block">
					<div
						class="aspect-square w-[180px] overflow-hidden rounded-2xl border-2 bg-white p-1.5 shadow-xl"
					>
						<Image src="/images/standard_list.jpg" className="w-full h-full object-cover" />
					</div>
				</div>
			</div>
		</div>
	</div>

	<div class="mt-20">
		<div class="mx-auto flex w-fit justify-center gap-4 pl-8 md:pl-32">
			{@render pill('Budget')}
			{@render pill('Meals', 'meal_pill')}
			{@render pill('Shopping', 'grocery_pill')}
			{@render pill('Recipe', 'recipe_pill')}
			{@render pill('Habit', 'habit_pill')}
		</div>
	</div>
</div>

<style>
	:global(.meal_pill) {
		transform: rotate(38deg) translateX(-45px);
	}

	:global(.grocery_pill) {
		transform: rotate(-38deg) translateX(-39px) translateY(-53px);
	}

	:global(.recipe_pill) {
		transform: translateX(-100px);
	}

	:global(.habit_pill) {
		transform: rotate(90deg) translateX(-18px) translateY(125px);
	}

	.pill_wrapper {
		position: relative;
		border-radius: 999px;
		transition: all 0.4s linear;
	}

	.pill_wrapper::after {
		content: '';
		position: absolute;
		top: 4px;
		left: 4px;
		right: 0;
		bottom: 0;
		border: 2px solid black;
		z-index: 1;
		border-radius: 999px;
		width: 100%;
		height: 100%;
	}

	.pill_wrapper::before {
		content: '';
		position: absolute;
		top: 4px;
		left: 4px;
		right: 0;
		bottom: 0;
		border: 2px solid black;
		z-index: 1;
		border-radius: 999px;
		width: 100%;
		height: 100%;
	}
</style>
