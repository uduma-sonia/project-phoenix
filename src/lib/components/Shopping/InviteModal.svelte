<script lang="ts">
	import { useQueryClient } from '@tanstack/svelte-query';
	import ModalWrapper from '../Common/ModalWrapper.svelte';
	import InvitedUserItem from './Utilities/InvitedUserItem.svelte';
	import { queryKeys } from '$lib/utils/queryKeys';
	import { ShoppingRequest } from '$lib/requests';
	import { page } from '$app/state';
	import { addToast } from '$lib/store/toast';
	import fetchBoardMembers from '$lib/hooks/fetchBoardMembers';
	import fetchUsersByEmail from '$lib/hooks/fetchUsersByEmail';
	import { Permissions } from '../../../types/shopping';

	let { onClose, isOpen, user, _permission, ownerDetails } = $props();
	const queryClient = useQueryClient();

	let boardId = page.params.id as string;
	let isRemoving = $state('');
	let email = $state('');

	let membersQuery = fetchBoardMembers(boardId);
	let membersList = $derived(
		$membersQuery?.data?.data?.members?.members?.map((item: { memberId: string }) => item.memberId)
	);

	let usersQuery = $derived(fetchUsersByEmail(membersList));
	let usersList = $derived($usersQuery?.data?.data?.users);

	async function inviteMember() {
		try {
			const payload = {
				boardId,
				ownerId: user?._id,
				memberId: email,
				permissions: 'READ,WRITE'
			};

			const result = await ShoppingRequest.addMember(payload);

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
			isRemoving = memberId;

			const result = await ShoppingRequest.removeMemberFromBoard(boardId, memberId);

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

<ModalWrapper {onClose} {isOpen} label="Members">
	<div class="p-4">
		{#if _permission === Permissions.OWNER || _permission === Permissions.CAN_EDIT}
			<div class="mb-8 flex items-center gap-3">
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
		{/if}

		<div>
			<hr class="border-gray-300" />

			<div class="mt-4 space-y-4">
				<InvitedUserItem isOwner={true} member={ownerDetails} />
				{#if usersList?.length > 0}
					{#each usersList as member, index (index)}
						<InvitedUserItem {_permission} {isRemoving} {removeMember} {member} />
					{/each}
				{/if}
			</div>
		</div>
	</div>
</ModalWrapper>
