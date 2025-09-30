import { shoppingRequest } from '$lib/requests';
import { queryKeys } from '$lib/utils/queryKeys';
import { createQuery } from '@tanstack/svelte-query';

export default function (boardId: string) {
	return createQuery({
		queryKey: queryKeys.getBoardMembers(boardId),
		queryFn: () => shoppingRequest.getBoardMembers(boardId),
		enabled: !!boardId
	});
}
