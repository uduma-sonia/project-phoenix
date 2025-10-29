<script lang="ts">
	import Avatar from '$lib/components/Common/Avatar.svelte';
	import { Check } from '@lucide/svelte';
	import { Permissions } from '../../../../types/shopping';
	import Helpers from '$lib/utils/helpers';

	let {
		member,
		removeMember,
		isRemoving,
		isOwner = false,
		_permission,
		updatePermission,
		membersList
	}: {
		member: any;
		removeMember?: (memberId: string) => void;
		updatePermission?: (memberId: string, memberPermission: string) => void;
		isRemoving?: string;
		isOwner?: boolean;
		_permission?: string;
		membersList?: any;
	} = $props();

	let canRemove = $derived(
		_permission === Permissions.OWNER || _permission === Permissions.CAN_EDIT
	);

	let memberPermission = $state(Helpers.getPermission(membersList, member));

	function _updatePermission() {
		const _permission =
			memberPermission === Permissions.CAN_EDIT ? Permissions.READ_ONLY : Permissions.CAN_EDIT;
		updatePermission?.(member.email, _permission);
		memberPermission = _permission;
	}

	// FIX
	const isViewer = membersList?.find((item: any) => item.memberId === member.email);

	// $effect(() => console.log(membersList, member));
</script>

<div class="flex items-center justify-between gap-3">
	<div class="flex items-center gap-2">
		<div>
			<Avatar src={member?.avatar} height="48px" width="48px" />
		</div>
		<div class="font-lexend-deca">
			<p>{member?.username}</p>
			<p class="text-xs font-light">{member?.email}</p>
		</div>
	</div>

	<div class="flex items-center gap-3">
		{#if !isOwner && canRemove}
			<div class="flex items-center gap-1">
				<button
					class="button_active relative flex h-4 w-4 items-center justify-center rounded-md border p-0"
					aria-label="withConverter"
					type="button"
					onclick={() => _updatePermission()}
				>
					{#if memberPermission === Permissions.CAN_EDIT}
						<Check size="13px" />
					{/if}
				</button>

				<p class="font-lexend text-10 font-light">Can edit</p>
			</div>
			<button
				class="text-sm text-red-600 hover:underline"
				onclick={() => removeMember?.(member?.email)}
			>
				{#if isRemoving == member?.memberId}
					<div class="spinner_white_sm border-2"></div>
				{:else}
					Remove
				{/if}
			</button>
			<!-- {:else }
			<button
				class="text-sm text-red-600 hover:underline"
				onclick={() => removeMember?.(member?.email)}
			>
				Leave
			</button> -->
		{/if}

		{#if isOwner}
			<button class="text-sm text-gray-500"> Owner </button>
		{/if}
	</div>
</div>
