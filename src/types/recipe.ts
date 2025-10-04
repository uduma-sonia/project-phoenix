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
	id: string;
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
	PARAPGRAPH = 'PARAPGRAPH'
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
