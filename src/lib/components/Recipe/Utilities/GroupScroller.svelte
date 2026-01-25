<script lang="ts">
	import { Cog, Copy, Heart, Plus } from '@lucide/svelte';
	import TabButton from '$lib/components/Common/TabButton.svelte';
	import HamburgerDropdown from '$lib/components/Common/HamburgerDropdown.svelte';
	import Helpers from '$lib/utils/helpers';
	import { openRecipeGroupModal } from '$lib/state/modal.svelte';

	let { currentTab = $bindable(), handleChangeTab, user, groupList } = $props();

	function changeTab(arg: string) {
		currentTab = arg;
		handleChangeTab(arg);
	}

	function _openRecipeGroupModal() {
		openRecipeGroupModal();
	}

	function _copyProfile() {
		Helpers.copyToClipboard(
			`${window?.location?.origin}/recipe/user/${user?._id}`,
			'Recipe profile link copied!'
		);
	}

	const moreOptions = $derived([
		{
			label: 'Create recipe',
			icon: Plus,
			link: '/recipe/create'
		},
		{
			label: 'Manage categories',
			icon: Cog,
			action: _openRecipeGroupModal
		},
		{
			label: 'Copy recipe profile link',
			icon: Copy,
			action: _copyProfile
		}
	]);
</script>

<div class="my-4 px-3">
	<div class="flex items-center justify-between gap-4">
		<div class="no-scrollbar flex items-center gap-4 overflow-x-auto">
			<TabButton name={'All'} {changeTab} {currentTab} />
			<TabButton name={'Saved'} {changeTab} {currentTab} LeftIcon={Heart} />

			{#each groupList as group, index (index)}
				<TabButton name={group?.name} {changeTab} {currentTab} />
			{/each}
		</div>

		<div>
			<div>
				<HamburgerDropdown variant="solid" options={moreOptions} />
			</div>
		</div>
	</div>
</div>
