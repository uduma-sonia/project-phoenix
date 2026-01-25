<script lang="ts">
	import { Cog, Copy, Heart, Plus } from '@lucide/svelte';
	// import NewGroup from './NewGroup.svelte';
	import { createQuery } from '@tanstack/svelte-query';
	import { queryKeys } from '$lib/utils/queryKeys';
	import { RecipeRequest } from '$lib/requests';
	import TabButton from '$lib/components/Common/TabButton.svelte';
	// import Tooltip from '$lib/components/Common/Tooltip.svelte';
	import HamburgerDropdown from '$lib/components/Common/HamburgerDropdown.svelte';
	import Helpers from '$lib/utils/helpers';
	import { openRecipeGroupModal } from '$lib/state/modal.svelte';

	let { currentTab = $bindable(), handleChangeTab, user, groupList } = $props();

	let addNewGroup = $state(false);

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
<!-- <div class="my-4 px-3">
	{#if !addNewGroup}
		<div class="flex items-center justify-between gap-4">
			<div class="no-scrollbar flex items-center gap-4 overflow-x-auto">
				<TabButton name={'All'} {changeTab} {currentTab} />
				<TabButton name={'Saved'} {changeTab} {currentTab} LeftIcon={Heart} />

				{#each groupList as group, index (index)}
					<TabButton name={group?.name} {changeTab} {currentTab} />
				{/each}
			</div>

			<div>
				<Tooltip text={'Create category'}>
					<button class="shadow_button shadow_button_sm" onclick={toggleView}>
						<Plus />
					</button>
				</Tooltip>
			</div>
		</div>
	{/if}

	{#if addNewGroup}
		<NewGroup {toggleView} />
	{/if}
</div> -->
