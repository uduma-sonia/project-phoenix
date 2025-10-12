export type ListItem = { value: string; measurement: keyof typeof RecipeStandardMeasurements };

export type RecipeGroup = {
	name: string;
	id?: string;
};

// export type Recipe = {
// 	name: string;
// 	slug: string;
// 	images?: string[];
// 	prepTime?: string;
// 	cookTime?: string;
// 	totalTime?: string;
// 	servings?: string;
// 	difficulty?: string;
// 	calories?: string;
// 	groups?: RecipeGroup[];
// 	isPrivate?: boolean;
// 	sections?: RecipeSection[];
// };

export enum SectionType {
	LIST = 'LIST',
	PARAGRAPH = 'PARAGRAPH',
	CHECKLIST = 'CHECKLIST'
}

export interface RecipeGroupResponse extends RecipeGroup {
	_id: string;
	ownerId: string;
	createdAt: Date;
	updatedAt: Date;
}

export enum RecipeStandardMeasurements {
	NONE = 'NONE',
	CUP = '1 cup',
	HALF_CUP = '1/2 cup',
	ONE_THIRD_CUP = '1/3 cup',
	QUARTER_CUP = '1/4 cup',
	TWO_THIRDS_CUP = '2/3 cup',
	THREE_QUARTER_CUP = '3/4 cup',

	TABLESPOON = '1 tablespoon',
	HALF_TABLESPOON = '1/2 tablespoon',
	ONE_THIRD_TABLESPOON = '1/3 tablespoon',
	QUARTER_TABLESPOON = '1/4 tablespoon',

	TEASPOON = '1 teaspoon',
	HALF_TEASPOON = '1/2 teaspoon',
	QUARTER_TEASPOON = '1/4 teaspoon',
	EIGHTH_TEASPOON = '1/8 teaspoon'
}

export type Ingredient = {
	name: string;
	amount?: string;
	unit?: string;
};

export type Directions = {
	name: string;
};

export type Nutrition = {
	calories?: string;
	totalFat?: string;
	saturatedFat?: string;
	cholesterol?: string;
	sodium?: string;
	carbonhydrate?: string;
	sugar?: string;
	protein?: string;
	dietaryFibers?: string;
};

export interface RecipeSection {
	name: string;
	type?: SectionType;
	paragraph?: string;
	list?: ListItem[];
}

export type Recipe = {
	ownerId: string;
	savedBy: string[];
	name: string;
	slug: string;
	description?: string;
	prepNote?: string;
	prepTime?: {
		hour: number;
		minutes: number;
	};
	cookTime?: {
		hour: number;
		minutes: number;
	};
	servings?: number;
	yield?: string;
	difficulty?: string;
	groups?: RecipeGroup[];
	images?: string[];
	isPrivate?: boolean;
	ingredients?: Ingredient[];
	directions?: Directions[];
	nutrition: Nutrition;
	sections: RecipeSection[];
};

export interface RecipeResponse extends Recipe {
	_id: string;
	ownerId: string;
	ownerName: string;
	savedBy: string[];
	createdAt: Date;
	updatedAt: Date;
	isSaved: boolean;
}
