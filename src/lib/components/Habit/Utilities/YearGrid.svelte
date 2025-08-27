<script lang="ts">
	import Helpers from '$lib/utils/helpers';
	import { Play } from '@lucide/svelte';
	import { format, subYears, addYears } from 'date-fns';

	let currentYear = $state(new Date());

	const prevYear = () => {
		currentYear = subYears(currentYear, 1);
	};

	const nextYear = () => {
		currentYear = addYears(currentYear, 1);
	};

	let getRange = $derived(Helpers.generateYearRange(currentYear));
</script>

<div>
	<div class="date-picker-header mb-6">
		<button class="shadow_button control_button" onclick={prevYear}>
			<span class="block rotate-180">
				<Play size="18px" />
			</span>
		</button>
		<p>{format(currentYear, 'yyyy')}</p>
		<button class="shadow_button control_button" onclick={nextYear}>
			<Play size="18px" />
		</button>
	</div>

	<div class="grid grid-cols-2 gap-3">
		{#each getRange as item, index (index)}
			<div>
				<div class="mb-2">
					<p class="font-lexend text-sm font-light capitalize">{item.month}</p>
				</div>

				<div class="flex flex-1 flex-wrap gap-x-1 gap-y-1">
					{#each [...new Array(30)] as item, index}
						<div
							class="flex h-5 w-5 min-w-5 items-center justify-center rounded-sm bg-gray-500 text-[11px]"
						>
							{index + 1}
						</div>
					{/each}
				</div>
			</div>
		{/each}
	</div>
</div>

<style>
	.control_button {
		width: fit-content !important;
		height: 35px;
	}

	.date-picker-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 20px;
	}

	.date-picker-header p {
		font-size: 16px;
		font-weight: 500;
	}
</style>
