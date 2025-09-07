export interface Ingredient {
	value?: string;
}

export interface MethodStep {
	value?: string;
}

export interface Recipe {
	name: string;
	note?: string;
	imageUrl?: string;
	groupId?: string;
	isPrivate?: boolean;
	ingredients?: Ingredient[];
	method?: MethodStep[];
	_id?: string;
}
