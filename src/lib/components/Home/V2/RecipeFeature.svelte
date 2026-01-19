<script lang="ts">
	import RecipeIllustrationCard from './RecipeIllustrationCard.svelte';
</script>

<div class="font-lexend mx-auto max-w-[500px] pt-32 lg:max-w-full lg:pt-60">
	<div class="mb-20">
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
				title="<span class='text-[#db7760] underline underline-offset-3'>Create</span> your recipe"
				subtitle="Start by saving your favorite recipes with ingredients and instructions"
				imgSrc="/images/undraw_authentication.svg"
			/>
		</div>
		<div class="lg:pt-6">
			<RecipeIllustrationCard
				title="<span class='text-[#1eb564] underline underline-offset-3'>Plan</span> your meals ahead"
				subtitle="Then organize your weekly meal plan and schedule what to cook"
				imgSrc="/images/undraw_authentication.svg"
			/>
		</div>
		<div class="lg:pt-12">
			<RecipeIllustrationCard
				title="Link recipes and <span class='text-[#0A97B0] underline underline-offset-3'>generate</span> shopping lists"
				subtitle="Finally, link recipes to meals and generate your shopping list"
				imgSrc="/images/undraw_authentication.svg"
			/>
		</div>
	</div>
</div>
