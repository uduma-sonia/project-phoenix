/* eslint-disable @typescript-eslint/no-explicit-any */
import Helpers from './helpers';

const userKeys = {
	getCurrentUser: [`/user`]
};

const trackerKeys = {
	getAllHabits: [`/tracker/all`]
};

const trackerLogKeys = {
	getLogs: (id: string, data: { date: any }) => [
		`/tracker-log/${id}?${Helpers.formatQueryParams(data)}`
	]
};

export const queryKeys = {
	...userKeys,
	...trackerKeys,
	...trackerLogKeys
};
