<script>
	import HamburgerDropdown from '$lib/components/Common/HamburgerDropdown.svelte';
	import { Minus, Plus } from '@lucide/svelte';

	let { type = 'quit' } = $props();

	// todo@ different state for different types

	const moreOptions = [
		{
			label: 'Done',
			icon: Plus
			// action: openInsightsModal
		},
		{
			label: 'Delete',
			icon: Plus
			// action: openInsightsModal
		}
	];
</script>

<div class="dropdown_wrapper h-100">
	<div
		class="cursor-pointe pt- relative z-10 flex h-100 w-full items-center gap-3 rounded-lg border-2 border-black bg-white px-3"
	>
		<div class="w-8">
			<img src="/images/walk.svg" alt="walk icon" class="w-6" />
		</div>

		<div class="flex flex-1 items-center justify-between">
			<div>
				<div>
					<p class="font-lexend text-lg font-light">Drink water</p>
				</div>

				<div>
					<p
						class:bg-brand-quit={type === 'quit'}
						class="font-lexend bg-brand-build inline-block rounded-sm px-3 py-0.5 text-xs font-light text-white capitalize"
					>
						{type}
					</p>
				</div>
			</div>

			<div class="flex items-center gap-4">
				<div class="flex items-center gap-4">
					<div class="w-fit">
						<button
							class="button_active flex h-8 w-8 items-center justify-center rounded-full bg-[#a0c878] font-normal"
						>
							<Minus size="18px" />
						</button>
					</div>

					<div class="font-lexend">1</div>

					<div class="w-fit">
						<button
							class="button_active flex h-8 w-8 items-center justify-center rounded-full bg-[#a0c878] font-normal"
						>
							<Plus size="18px" />
						</button>
					</div>
				</div>

				<HamburgerDropdown options={moreOptions} />
			</div>
		</div>
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
		width: 90%;
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
