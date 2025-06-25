<script>
	import { MoveLeft } from '@lucide/svelte';
	import TopSection from '../Common/TopSection.svelte';
	import ListItem from './Utilities/ListItem.svelte';
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
					<p>January Shopping</p>
				</div>
			</div>

			<div>
				<button class="shadow_button"> Add from standard </button>
			</div>
		</div>

		<div class="grid grid-cols-2 gap-5">
			<div class="space-y-2">
				<ListItem />
				<ListItem />
				<ListItem />
				<ListItem />
			</div>

			<div class="border2 h-40"></div>
		</div>
	</div>
</div>

<style>
	.backbtn {
		height: 40px !important;
	}
</style>
