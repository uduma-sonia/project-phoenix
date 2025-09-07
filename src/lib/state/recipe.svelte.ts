import type { Recipe } from '../../types/recipe';

export const selectedRecipe = $state<{ data: null | Recipe }>({
	data: null
});

export function handleSelectRecipe(arg: Recipe) {
	selectedRecipe.data = arg;
}
