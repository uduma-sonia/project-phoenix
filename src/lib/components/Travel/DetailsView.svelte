<script lang="ts">
	import { UserRoundPlus } from '@lucide/svelte';
	import BackComponent from '../Common/BackComponent.svelte';
	import TopSection from '../Common/TopSection.svelte';
	import DetailsTopSection from './Utilities/DetailsTopSection.svelte';
	import GroupTab from './Utilities/GroupTab.svelte';
	import Budget from './Utilities/Budget.svelte';
	import Calendar from './Utilities/Calendar.svelte';
</script>

<div class="mx-auto w-full max-w-[1000px] pb-64">
	<TopSection withName={false} />

	<div class="my-6 flex justify-between gap-3">
		<BackComponent backLink="/travel" title="Ghana vacation 2025" />

		<div>
			<button class="shadow_button shadow_button_thin shadow_button_with_icon">
				<UserRoundPlus size="20px" />

				Invite
			</button>
		</div>
	</div>

	<div class="flex items-start gap-4">
		<div class="w-1/2">
			<DetailsTopSection />
			<GroupTab />
		</div>

		<div class="w-1/2">
			<Budget />
			<Calendar />
		</div>
	</div>
</div>
