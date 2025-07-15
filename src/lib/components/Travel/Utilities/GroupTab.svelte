<script lang="ts">
	import { Plus } from '@lucide/svelte';
	import NewGroup from './NewGroup.svelte';

	let addNewGroup = $state(false);
</script>

<div class="mt-8">
	<div
		class="middle_container no-scrollbar relative flex flex-nowrap items-center gap-4 overflow-x-auto pr-1"
	>
		{#if !addNewGroup}
			<div class="min-w-[100px]">
				<button
					class="bg-brand-rose font-lexend button_active h-[50px] w-[110px] rounded-lg border-2 border-black font-light"
				>
					Hotel
				</button>
			</div>
			<div class="min-w-[100px]">
				<button
					class="bg-brand-rose font-lexend button_active h-[50px] w-[110px] rounded-lg border-2 border-black font-light"
				>
					Restaurants
				</button>
			</div>
			<div class="min-w-[100px]">
				<button
					class="bg-brand-rose font-lexend button_active h-[50px] w-[110px] rounded-lg border-2 border-black font-light"
				>
					Beaches
				</button>
			</div>
			<div class="min-w-[100px]">
				<button
					class="bg-brand-rose font-lexend button_active h-[50px] w-[110px] rounded-lg border-2 border-black font-light"
				>
					Museums
				</button>
			</div>

			<div class="sticky top-0 right-0 ml-10">
				<button class="shadow_button" onclick={() => (addNewGroup = true)}>
					<Plus />
				</button>
			</div>
		{/if}

		{#if addNewGroup}
			<NewGroup />
		{/if}
	</div>
</div>
