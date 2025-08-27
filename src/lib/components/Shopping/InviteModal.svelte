<script lang="ts">
	import ModalWrapper from '../Common/ModalWrapper.svelte';
	import InvitedUserItem from './Utilities/InvitedUserItem.svelte';

	let { onClose, isOpen } = $props();
</script>

<ModalWrapper {onClose} {isOpen} label="Invites">
	<div class="p-4">
		<div class="mt-6 flex items-center gap-3">
			<div class="flex-1">
				<input
					type="email"
					class="h-[50px] w-full rounded-lg border-2 border-black px-3 outline-none"
					placeholder="Enter email address"
				/>
			</div>

			<div class="w-fit">
				<button class="shadow_button shadow_button_thin"> Invite </button>
			</div>
		</div>

		<div class="mt-8">
			<p class="border-b border-b-gray-300 text-xl">Members</p>

			<div class="mt-4 space-y-4">
				<InvitedUserItem />
				<InvitedUserItem />
			</div>
		</div>
	</div>
</ModalWrapper>
