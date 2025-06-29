<script>
	import { UserRoundPlus } from '@lucide/svelte';
	import TopSection from '../Common/TopSection.svelte';
	import ListItem from './Utilities/ListItem.svelte';
	import AddItem from './Utilities/AddItem.svelte';
	import Search from './Utilities/Search.svelte';
	import InviteModal from './InviteModal.svelte';
	import { closeModal, modalsState, openModal } from '$lib/state/modal.svelte';
	import BackComponent from '../Common/BackComponent.svelte';
</script>

<div class="mx-auto w-full max-w-[1000px] pb-64">
	<TopSection withName={false} />

	<div>
		<div class="my-6 flex justify-between">
			<BackComponent title="Shopping" backLink="/shopping" />

			<div class="flex flex-1 items-center justify-end gap-4">
				<div>
					<button
						class="shadow_button shadow_button_thin shadow_button_with_icon"
						onclick={openModal}
					>
						<UserRoundPlus size="20px" />

						Invite
					</button>
				</div>
				<div>
					<button class="shadow_button shadow_button_thin"> Add from standard </button>
				</div>
			</div>
		</div>

		<div class="flex items-center gap-6">
			<Search />

			<div>
				<p class="font-lexend text-sm">0/5</p>
			</div>
		</div>

		<div class="mt-6 grid grid-cols-1 gap-10 md:grid-cols-2">
			<div>
				<div class="mb-6 space-y-2">
					<ListItem />
					<ListItem />
					<ListItem />
					<ListItem />
				</div>

				<AddItem />

				<div class="mt-10">
					<button class="shadow_button"> Shopping done </button>
				</div>
			</div>

			<!-- <div class="h-fit rounded-lg border-2 bg-white p-2">
				<StandardListItem />
				<StandardListItem />
				<StandardListItem />
			</div> -->
		</div>
	</div>
</div>

<InviteModal onClose={closeModal} isOpen={modalsState.data.isOpen} />
