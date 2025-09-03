<script lang="ts">
	import { createQuery, useQueryClient } from '@tanstack/svelte-query';
	import ModalWrapper from '../Common/ModalWrapper.svelte';
	import InvitedUserItem from './Utilities/InvitedUserItem.svelte';
	import { queryKeys } from '$lib/utils/queryKeys';
	import { shoppingRequest, UserRequest } from '$lib/requests';
	import { page } from '$app/state';
	import { addToast } from '$lib/store/toast';

	let { onClose, isOpen, user } = $props();
	const queryClient = useQueryClient();

	let boardId = page.params.id as string;
	let isRemoving = $state('');
	let email = $state('');

	let membersQuery = createQuery({
		queryKey: queryKeys.getBoardMembers(boardId),
		queryFn: () => shoppingRequest.getBoardMembers(boardId)
	});

	let membersList = $derived(
		$membersQuery?.data?.data?.members?.members?.map((item: { memberId: string }) => item.memberId)
	);

	let usersQuery = $derived(
		createQuery({
			queryKey: queryKeys.getUsersByEmails(JSON.stringify(membersList)),
			queryFn: () => UserRequest.getUsersByEmails(JSON.stringify(membersList)),
			enabled: !!membersList
		})
	);

	let usersList = $derived($usersQuery?.data?.data?.users);

	async function inviteMember() {
		try {
			const payload = {
				boardId,
				ownerId: user?._id,
				memberId: email,
				permissions: 'READ,WRITE'
			};

			const result = await shoppingRequest.addMember(payload);

			if (result) {
				queryClient.invalidateQueries({ queryKey: queryKeys.getBoardMembers(boardId) });
				email = '';
			}
		} catch (error: any) {
			addToast(error?.message || 'An error occured', 'error');
		} finally {
			isRemoving = '';
		}
	}

	async function removeMember(memberId: string) {
		try {
			isRemoving = 'memberId';

			const result = await shoppingRequest.removeMemberFromBoard(boardId, memberId);

			if (result) {
				queryClient.invalidateQueries({ queryKey: queryKeys.getBoardMembers(boardId) });
			}
		} catch (error: any) {
			addToast(error?.message || 'An error occured', 'error');
		} finally {
			isRemoving = '';
		}
	}
</script>

<ModalWrapper {onClose} {isOpen} label="Invites">
	<div class="p-4">
		<div class="flex items-center gap-3">
			<div class="flex-1">
				<input
					bind:value={email}
					id="email"
					name="email"
					type="email"
					class="h-[50px] w-full rounded-lg border-2 border-black px-3 outline-none"
					placeholder="Enter email address"
				/>
			</div>

			<div class="w-fit">
				<button class="shadow_button shadow_button_thin" onclick={inviteMember}> Invite </button>
			</div>
		</div>

		<div class="mt-8">
			<p class="border-b border-b-gray-300 text-xl">Members</p>

			<div class="mt-4 space-y-4">
				<InvitedUserItem isOwner={true} member={user} />
				{#if usersList?.length > 0}
					{#each usersList as member, index (index)}
						<InvitedUserItem {isRemoving} {removeMember} {member} />
					{/each}
				{/if}
			</div>
		</div>
	</div>
</ModalWrapper>
