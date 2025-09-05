<script lang="ts">
	import { UserRoundPlus } from '@lucide/svelte';
	import BackComponent from '../Common/BackComponent.svelte';
	import DetailsTopSection from './Utilities/DetailsTopSection.svelte';
	import GroupTab from './Utilities/GroupTab.svelte';
	import Budget from './Utilities/Budget.svelte';
	import Calendar from './Utilities/Calendar.svelte';
</script>

<div>
	<div class="my-6 flex justify-between gap-3 px-3">
		<BackComponent backLink="/travel" title="Ghana vacation 2025" />

		<div>
			<button class="shadow_button shadow_button_thin shadow_button_with_icon">
				<UserRoundPlus size="20px" />

				Invite
			</button>
		</div>
	</div>

	<div class="items-start gap-4 px-3 sm:flex">
		<div class="mb-14 w-full sm:w-1/2">
			<DetailsTopSection />

			<div class="sm:hidden">
				<div class="mt-4">
					<Budget />
				</div>
			</div>

			<GroupTab />
		</div>

		<div class="w-full sm:w-1/2">
			<div class="hidden sm:block">
				<Budget />
			</div>
			<Calendar />
		</div>
	</div>
</div>
