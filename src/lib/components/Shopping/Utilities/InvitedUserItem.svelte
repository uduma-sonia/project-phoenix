<script lang="ts">
	let {
		member,
		removeMember,
		isRemoving,
		isOwner = false
	}: {
		member: any;
		removeMember?: (memberId: string) => void;
		isRemoving?: string;
		isOwner?: boolean;
	} = $props();
</script>

<div class="flex items-center justify-between gap-3">
	<div class="flex gap-2">
		<div>
			<div class="h-12 w-12 rounded-full bg-black"></div>
		</div>
		<div class="font-lexend-deca">
			<p>{member?.username}</p>
			<p class="text-xs font-light">{member?.email}</p>
		</div>
	</div>

	<div>
		{#if !isOwner}
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
		{/if}
		{#if isOwner}
			<button class="text-sm text-gray-500"> Owner </button>
		{/if}
	</div>
</div>
