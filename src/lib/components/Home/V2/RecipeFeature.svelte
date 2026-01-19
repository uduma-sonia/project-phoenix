<script lang="ts">
	import BasicButton from '$lib/components/Common/Form/BasicButton.svelte';
	import RecipeIllustrationCard from './RecipeIllustrationCard.svelte';
</script>

<div class="font-lexend mx-auto max-w-[500px] pt-20 lg:max-w-full lg:pt-40">
	<div class="mb-14 lg:mb-20">
		<h3 class="font-crete text-center text-2xl font-semibold md:text-3xl lg:text-4xl">
			Plan your meals and <br /> link your recipes
		</h3>

		<p class="font-lexend mx-auto mt-5 max-w-[500px] text-center text-sm font-light lg:text-base">
			Organize your weekly meals and link them to your saved recipes, making meal planning
			effortless and keeping all your favorite dishes at your fingertips.
		</p>
	</div>

	<div class="grid grid-cols-1 gap-10 lg:grid-cols-3 lg:gap-14">
		<div>
			<RecipeIllustrationCard
				title="<span class='text-[#db7760] font-semibold'>Create</span> your recipe"
				subtitle="Start by saving your favorite <br/> recipes with ingredients and <br/> instructions"
				imgSrc="/images/undraw_authentication.svg"
			/>
		</div>
		<div class="lg:pt-8">
			<RecipeIllustrationCard
				title="<span class='text-[#1eb564] font-semibold'>Plan</span> your meals <br/> ahead"
				subtitle="Then organize your weekly meal <br/> plan and schedule what to cook"
				imgSrc="/images/undraw_authentication.svg"
			/>
		</div>
		<div class="lg:pt-16">
			<RecipeIllustrationCard
				title="Link recipes and <br/> <span class='text-[#0A97B0] font-semibold'>generate</span> shopping lists"
				subtitle="Finally, link recipes to meals <br/> and generate your shopping list"
				imgSrc="/images/undraw_authentication.svg"
			/>
		</div>
	</div>

	<div class="mt-7 flex justify-center">
		<a href="/signup">
			<BasicButton label="Start Planning" />
		</a>
	</div>
</div>
