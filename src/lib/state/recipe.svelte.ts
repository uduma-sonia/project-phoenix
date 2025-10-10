import type { RecipeResponse } from '../../types/recipe';

export const selectedRecipe = $state<{ data: null | RecipeResponse }>({
	data: null
});

export const selectedRecipeList = $state<{ data: null | string[] }>({
	data: null
});

export function handleSelectRecipe(arg: RecipeResponse) {
	selectedRecipe.data = arg;
}

export function handleSelectItem(item: string) {
	if (selectedRecipeList?.data?.includes(item)) {
		selectedRecipeList.data = selectedRecipeList.data.filter((j) => j !== item);
	} else {
		if (selectedRecipeList.data?.length) {
			selectedRecipeList.data = [...selectedRecipeList.data, item];
		} else {
			selectedRecipeList.data = [item];
		}
	}
}
