import { ShoppingRequest } from '$lib/requests';
import { queryKeys } from '$lib/utils/queryKeys';
import { createQuery } from '@tanstack/svelte-query';

export default function (boardId: string) {
	return createQuery({
		queryKey: queryKeys.getBoardItems(boardId, ''),
		queryFn: () => ShoppingRequest.getBoardItems(boardId, ''),
		enabled: !!boardId
	});
}
