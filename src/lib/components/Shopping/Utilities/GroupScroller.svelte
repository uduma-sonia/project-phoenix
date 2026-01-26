<script lang="ts">
	import TabButton from '$lib/components/Common/TabButton.svelte';
	import { CircleCheck, Plus } from '@lucide/svelte';

	let { currentTab = $bindable(), handleChangeTab } = $props();

	function changeTab(arg: string) {
		handleChangeTab(arg);
	}
</script>

<div class="my-4 px-3">
	<div class="flex items-center justify-between gap-4">
		<div class="no-scrollbar flex items-center gap-4 overflow-x-auto">
			<TabButton name={'All'} {changeTab} {currentTab} />
			<TabButton name={'Owner'} {changeTab} {currentTab} />
			<TabButton name={'Invited'} {changeTab} {currentTab} />
			<TabButton name={'Done'} {changeTab} {currentTab} LeftIcon={CircleCheck} />
		</div>

		<div>
			<a href="/shopping/create">
				<button class="shadow_button_outline shadow_button_thin shadow_button_with_icon">
					<Plus size="20px" />

					list
				</button>
			</a>
		</div>
	</div>
</div>
