import type { RecipeResponse } from '../../types/recipe';

export const selectedRecipe = $state<{ data: null | RecipeResponse }>({
	data: null
});

export function handleSelectRecipe(arg: RecipeResponse) {
	selectedRecipe.data = arg;
}
