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
	id: string;
	name: string;
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

	group?: RecipeGroup;
	isPrivate?: boolean;
	section?: RecipeSection[];
};

export enum SectionType {
	LIST = 'LIST',
	PARAPGRAPH = 'PARAPGRAPH'
}

export interface RecipeResponse extends Recipe {
	_id: string;
	createdAt: Date;
	updatedAt: Date;
	ownerId?: string;
}
