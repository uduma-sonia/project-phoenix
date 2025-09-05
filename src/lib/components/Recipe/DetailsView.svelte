<script>
	import { Link, Trash } from '@lucide/svelte';
	import BackComponent from '../Common/BackComponent.svelte';
	import IngredientItem from './Utilities/IngredientItem.svelte';
	import InstructionItem from './Utilities/InstructionItem.svelte';
</script>

<div class="mx-auto mt-4 max-w-[500px] px-3 pb-24">
	<BackComponent backLink="/recipe" title="Best Fluffy Pancakes Recipe" />

	<div class="mt-6">
		<div class="image_wrapper h-[200px]">
			<div
				class="relative z-10 h-full w-full cursor-pointer gap-3 rounded-lg border-2 border-black bg-white p-4"
			></div>
		</div>

		<div class="mt-4 flex justify-end gap-3">
			<div>
				<button class="shadow_button shadow_button_sm" style="height: 40px">
					<img src="/images/pinterest_logo.svg" class="w-5" alt="" />
				</button>
			</div>
			<div>
				<button class="shadow_button shadow_button_sm" style="height: 40px">
					<Link size="20px" />
				</button>
			</div>
		</div>

		<div class="mt-8">
			<div>
				<div class="flex items-center justify-between gap-3">
					<h3 class="text-xl">Ingredients</h3>

					<div>
						<p class="font-lexend text text-xs underline">View my other recipes</p>
					</div>
				</div>

				<div class="mt-4 space-y-3">
					<IngredientItem name="1 cup flour" />
					<IngredientItem name="1 cup sugar" />
					<IngredientItem name="1 cup cocoa powder" />
				</div>
			</div>

			<div class="mt-8">
				<h3 class="text-xl">Instructions</h3>

				<div class="mt-4 space-y-4">
					<InstructionItem
						name="In a large bowl, sift together the flour, baking powder, salt, and sugar. Make a well in the middle and pour in the milk, egg, butter, and vanilla extract (if using it to add flavor). Break up the egg first with a fork, and then begin to combine the flour, working from the outside of the bowl in, until just combined and mostly smooth."
						step="1"
					/>

					<InstructionItem
						name="Heat a non-stick griddle or large pan over medium-high heat. Once hot, grease, spray, or melt butter on the hot surface. When using an electric griddle, heat it somewhere between 300 and 350F."
						step="2"
					/>
				</div>
			</div>

			<div class="mt-8">
				<h3 class="text-xl">Additional notes</h3>

				<div class="mt-4">
					<p class="font-lexend font-light">{'Additional notes'}</p>
				</div>
			</div>
		</div>
	</div>

	<div class="mt-16 flex justify-end">
		<div>
			<button class="shadow_button shadow_button_sm text-red-600" style="height: 40px">
				<Trash size="20px" />
			</button>
		</div>
	</div>
</div>

<style>
	.image_wrapper {
		position: relative;
		border-radius: 8px;
		transition: all 0.4s linear;
	}

	.image_wrapper::before {
		content: '';
		position: absolute;
		top: 2px;
		left: 2px;
		right: 0;
		bottom: 0;
		background-color: black;
		border: 2px solid black;
		z-index: 1;
		border-radius: 8px;
		width: 100%;
		height: 100%;
	}
</style>
