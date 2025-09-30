import type { CreateBooard } from '../../types/shopping';

export const selectedBoard = $state<{ data: null | CreateBooard }>({
	data: null
});

export function handleSelectBoard(arg: CreateBooard) {
	selectedBoard.data = arg;
}
