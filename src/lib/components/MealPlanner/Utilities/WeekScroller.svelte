<script lang="ts">
	import Helpers from '$lib/utils/helpers';
	import { Play } from '@lucide/svelte';
	import { addWeeks, format, subWeeks, startOfWeek, endOfWeek } from 'date-fns';

	let { currentWeek = $bindable(new Date()), updateCurrentWeek } = $props();

	function nextWeek() {
		updateCurrentWeek(addWeeks(currentWeek, 1));
	}

	function prevWeek() {
		updateCurrentWeek(subWeeks(currentWeek, 1));
	}
</script>

<div class="">
	<div class="flex items-center gap-3 overflow-hidden pr-1">
		<div>
			<button class="shadow_button shadow_button_sm" onclick={prevWeek}>
				<span class="block rotate-180">
					<Play />
				</span>
			</button>
		</div>

		<div>
			<div class="flex items-center gap-3 text-sm md:text-base">
				<p class="font-lexend font-light">
					{format(startOfWeek(currentWeek), 'P')}
				</p>

				<p>-</p>

				<p class="font-lexend font-light">
					{format(endOfWeek(currentWeek), 'P')}
				</p>
			</div>

			<div>
				<p class="font-lexend text-center text-sm leading-2 font-normal">
					{Helpers.getRelativeWeek(currentWeek)}
				</p>
			</div>
		</div>

		<div>
			<button class="shadow_button shadow_button_sm" onclick={nextWeek}>
				<Play />
			</button>
		</div>
	</div>
</div>
