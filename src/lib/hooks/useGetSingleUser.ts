import { UserRequest } from '$lib/requests';
import { queryKeys } from '$lib/utils/queryKeys';
import { createQuery } from '@tanstack/svelte-query';

export default function (id: string) {
	return createQuery({
		queryKey: queryKeys.getSingleUserWithEmail(id),
		queryFn: () => UserRequest.getSingleUserWithEmail(id),
		enabled: !!id
	});
}
