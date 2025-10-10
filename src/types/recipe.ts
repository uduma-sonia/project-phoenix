export interface Ingredient {
	value?: string;
}

export type ListItem = { value: string };

export interface RecipeSection {
	name: string;
	type?: SectionType;
	paragraph?: string;
	list?: ListItem[];
}

export type RecipeGroup = {
	name: string;
	id?: string;
};

export type Recipe = {
	name: string;
	slug: string;
	images?: string[];
	prepTime?: string;
	cookTime?: string;
	totalTime?: string;
	servings?: string;
	difficulty?: string;
	calories?: string;
	groups?: RecipeGroup[];
	isPrivate?: boolean;
	sections?: RecipeSection[];
};

export enum SectionType {
	LIST = 'LIST',
	PARAGRAPH = 'PARAGRAPH',
	CHECKLIST = 'CHECKLIST'
}

export interface RecipeResponse extends Recipe {
	_id: string;
	ownerId: string;
	ownerName: string;
	savedBy: string[];
	createdAt: Date;
	updatedAt: Date;
	isSaved: boolean;
}

export interface RecipeGroupResponse extends RecipeGroup {
	_id: string;
	ownerId: string;
	createdAt: Date;
	updatedAt: Date;
}

export enum StandardMeasurements {
	CUP = '1 cup',
	THREE_QUARTER_CUP = '3/4 cup',
	TWO_THIRDS_CUP = '2/3 cup',
	HALF_CUP = '1/2 cup',
	ONE_THIRD_CUP = '1/3 cup',
	QUARTER_CUP = '1/4 cup',
	TABLESPOON = '1 tablespoon',
	TEASPOON = '1 teaspoon',
	HALF_TEASPOON = '1/2 teaspoon',
	QUARTER_TEASPOON = '1/4 teaspoon',
	EIGHTH_TEASPOON = '1/8 teaspoon'
}
