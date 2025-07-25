<script lang="ts">
	import HamburgerDropdown from '$lib/components/Common/HamburgerDropdown.svelte';
	import { Check, Plus, SkipForward, SquarePen, Trash2, X } from '@lucide/svelte';

	let { habit } = $props();

	// todo@ different state for different types

	const moreOptions = [
		{
			label: 'Done',
			icon: Check
			// action: openInsightsModal
		},
		{
			label: 'Delete',
			icon: SkipForward
			// action: openInsightsModal
		},
		{
			label: 'Fail',
			icon: X
			// action: openInsightsModal
		},
		{
			label: 'Edit',
			icon: SquarePen
			// action: openInsightsModal
		},
		{
			label: 'Delete',
			icon: Trash2,
			iconColor: 'red'
			// action: openInsightsModal
		}
	];

	$effect(() => console.log(habit));
</script>

<div class="dropdown_wrapper h-100">
	<div
		class="relative z-10 flex h-100 w-full items-center gap-3 rounded-lg border-2 border-black bg-white px-3"
	>
		<div class="w-6 sm:w-6">
			<img src={habit.icon} alt="walk icon" class="w-5 sm:w-6" />
		</div>

		<div class="flex flex-1 items-center justify-between">
			<div
				role="button"
				tabindex={0}
				onclick={() => console.log('clicked')}
				onkeydown={() => console.log('clicked')}
				class="cursor-pointer"
				aria-label="presentation"
			>
				<div>
					<p class="font-lexend font-light">{habit.name}</p>
				</div>

				<div>
					<div class="absolute -top-3 left-3 -rotate-3">
						<p
							class:bg-brand-quit={habit.type === 'QUIT'}
							class:bg-brand-build={habit.type === 'BUILD'}
							class="font-lexend bg-brand-build inline-block rounded-sm px-2 py-0.5 text-[10px] font-light text-white capitalize"
						>
							{habit.type}
						</p>
					</div>
				</div>
			</div>

			<div class="flex items-center gap-4">
				<div class="flex items-center gap-2">
					<div class="w-fit">
						<button
							class="button_active flex h-8 w-8 items-center justify-center rounded-full bg-[#3c3c3c] font-normal"
						>
							<Plus size="18px" color="#FFFFFF" />
						</button>
					</div>

					<div class="font-lexend text-sm font-light">100</div>

					<div class="w-fit">
						<button
							class="button_active flex h-8 w-8 items-center justify-center rounded-full bg-[#3c3c3c] font-normal"
						>
							<Plus size="18px" color="#FFFFFF" />
						</button>
					</div>
				</div>

				<div class="w-6 p-2"></div>
			</div>
		</div>
	</div>

	<div class="absolute top-1/2 right-4 z-50 -translate-y-1/2">
		<HamburgerDropdown options={moreOptions} />
	</div>
</div>

<style>
	.dropdown_wrapper {
		position: relative;
		border-radius: 8px;
		transition: all 0.4s linear;
	}

	.dropdown_wrapper::after {
		content: '';
		position: absolute;
		top: 5px;
		left: 5px;
		background-color: #8cbf80;
		right: 0;
		bottom: 0;
		border: 2px solid black;
		z-index: 1;
		border-radius: 8px;
		width: 100%;
		height: 100%;
	}

	.dropdown_wrapper::before {
		content: '';
		position: absolute;
		top: 5px;
		left: 5px;
		right: 0;
		bottom: 0;
		border: 2px solid black;
		z-index: 1;
		border-radius: 8px;
		width: 100%;
		height: 100%;
	}
</style>
