<script>
	import { MoveLeft, Plus } from '@lucide/svelte';
	import TopSection from '../Common/TopSection.svelte';
	import ListItem from './Utilities/ListItem.svelte';
	import StandardListItem from './Utilities/StandardListItem.svelte';
	import AddItem from './Utilities/AddItem.svelte';
</script>

<div class="mx-auto w-full max-w-[1000px] pb-64">
	<TopSection withName={false} />

	<div>
		<div class="mt-6 mb-10 flex justify-between">
			<div class="flex items-center gap-4">
				<div>
					<a href="/shopping">
						<MoveLeft />
					</a>
				</div>

				<div>
					<p class="text-lg">January Shopping</p>
				</div>
			</div>

			<div class="flex flex-1 items-center justify-end gap-4">
				<div>
					<button class="shadow_button shadow_button_thin shadow_button_with_icon">
						<Plus size="20px" />
						Invite
					</button>
				</div>
				<div>
					<button class="shadow_button shadow_button_thin"> Add from standard </button>
				</div>
			</div>
		</div>

		<div class="grid grid-cols-2 gap-10">
			<div>
				<div class="mb-6 space-y-2">
					<ListItem />
					<ListItem />
					<ListItem />
					<ListItem />
				</div>

				<AddItem />
			</div>

			<div class="h-40 rounded-lg border-2 bg-white p-2">
				<StandardListItem />
				<StandardListItem />
				<StandardListItem />
			</div>
		</div>
	</div>
</div>
