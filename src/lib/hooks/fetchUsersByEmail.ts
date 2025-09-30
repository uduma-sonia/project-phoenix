import { UserRequest } from '$lib/requests';
import { queryKeys } from '$lib/utils/queryKeys';
import { createQuery } from '@tanstack/svelte-query';

export default function (membersList: string[]) {
	return createQuery({
		queryKey: queryKeys.getUsersByEmails(JSON.stringify(membersList)),
		queryFn: () => UserRequest.getUsersByEmails(JSON.stringify(membersList)),
		enabled: !!membersList
	});
}
