<script>
	import { MoveLeft } from '@lucide/svelte';
	import TopSection from '../Common/TopSection.svelte';
	import ListItem from './Utilities/ListItem.svelte';
	import StandardListItem from './Utilities/StandardListItem.svelte';
	import AddItem from './Utilities/AddItem.svelte';
</script>

<div class="mx-auto w-full max-w-[1000px] pb-64">
	<TopSection withName={false} />

	<div>
		<div class="mt-10 mb-10 flex justify-between">
			<div class="flex items-center gap-4">
				<div>
					<a href="/shopping">
						<button class="shadow_button backbtn">
							<MoveLeft />
						</button>
					</a>
				</div>

				<div>
					<p class="text-lg">January Shopping</p>
				</div>
			</div>

			<div>
				<button class="shadow_button"> Add from standard </button>
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

<style>
	.backbtn {
		height: 40px !important;
	}
</style>
