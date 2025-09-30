import { UserRequest } from '$lib/requests';
import { queryKeys } from '$lib/utils/queryKeys';
import { createQuery } from '@tanstack/svelte-query';

export default function (id: string) {
	return createQuery({
		queryKey: queryKeys.getSingleUserWithId(id),
		queryFn: () => UserRequest.getSingleUserWithId(id),
		enabled: !!id
	});
}
