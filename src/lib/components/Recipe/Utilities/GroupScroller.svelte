<script lang="ts">
	import { Play } from '@lucide/svelte';

	let middle_container: any;

	const handleScrollRight = () => {
		middle_container.scrollLeft += 300;
	};

	const groupList = [
		{
			name: 'Breakfast'
		},
		{
			name: 'Lunch'
		},
		{
			name: 'Dinner'
		},
		{
			name: 'Baking'
		},
		{
			name: 'Stoner'
		},
		{
			name: 'Airfryer'
		},
		{
			name: 'Snacks'
		},
		{
			name: 'Baking'
		},
		{
			name: 'Stoner'
		},
		{
			name: 'Airfryer'
		},
		{
			name: 'Snacks'
		}
	];
</script>

<div class="my-4 px-3">
	<div class="flex items-center gap-3 overflow-hidden py-1 pr-1">
		<div
			bind:this={middle_container}
			class="middle_container no-scrollbar flex max-w-[83.5%] flex-1 flex-nowrap items-center gap-3 overflow-x-auto sm:gap-4"
		>
			{#each groupList as group, index (index)}
				<div class="min-w-[100px] sm:min-w-[120px]">
					<button
						class="bg-brand-rose font-lexend button_active flex h-[50px] w-full items-center justify-center gap-1 rounded-lg border-2 border-black text-sm font-normal sm:text-base"
					>
						{group?.name}
					</button>
				</div>
			{/each}
		</div>
		<div>
			<button class="shadow_button shadow_button_sm" onclick={handleScrollRight}>
				<Play />
			</button>
		</div>
	</div>
</div>

<style>
	.middle_container {
		transition: all 0.3s linear;
		scroll-behavior: smooth;
	}
</style>
