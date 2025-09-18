/* eslint-disable @typescript-eslint/no-explicit-any */
import Helpers from './helpers';

const userKeys = {
	getCurrentUser: [`/user`],
	getSingleUser: (id: string) => [`/user/single/${id}`],
	getSingleUserWithEmail: (id: string) => [`/user/single/email${id}`],
	getUsersByEmails: (id: string) => [`/user/multiple/email${id}`]
};

const trackerKeys = {
	getAllHabits: [`/tracker/all`],
	getSingleHabit: (habitId: string) => [`/tracker/${habitId}`]
};

const trackerLogKeys = {
	getLogs: (id: string, data: { date: any }) => [
		`/tracker-log/${id}?${Helpers.formatQueryParams(data)}`
	],
	getLogStats: (id: string, data: { month?: string; year: string }) => [
		`/tracker-log/stats/${id}?${Helpers.formatQueryParams(data)}`
	],
	getLogList: (id: string, data: { month?: string; year: string; filterBy: string }) => [
		`/tracker-log/stats/list${id}?${Helpers.formatQueryParams(data)}`
	]
};

const shoppingKeys = {
	getAllBoards: [`/shopping-board/all`],
	getBoardItems: (boardId: string, ownerId: string) => [
		`/shopping-items/all/${boardId}?ownerId=${ownerId}`
	],
	getStandardItems: [`/shopping-items/standard`],
	getBoard: (boardId: string) => [`/shopping-board/${boardId}`],
	getBoardMembers: (boardId: string) => [`/shopping-member/${boardId}`]
};

const recipeKeys = {
	getRecipes: [`/recipe`],
	getSingleRecipe: (id: string) => [`/recipe/${id}`],
	getOtherUserRecipes: (id: string) => [`/recipe/user${id}`]
};

const statsKeys = {
	getStat: (id: string) => [`/stats/${id}`]
};

export const queryKeys = {
	...userKeys,
	...trackerKeys,
	...trackerLogKeys,
	...shoppingKeys,
	...recipeKeys,
	...statsKeys
};
