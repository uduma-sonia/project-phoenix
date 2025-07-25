const userKeys = {
	getCurrentUser: [`/user`]
};

const trackerKeys = {
	getAllHabits: [`/tracker/all`]
};

export const queryKeys = {
	...userKeys,
	...trackerKeys
};
