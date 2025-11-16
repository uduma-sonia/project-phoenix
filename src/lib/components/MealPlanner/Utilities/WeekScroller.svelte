<script lang="ts">
	import { Play } from '@lucide/svelte';
	import { addWeeks, format, subWeeks, startOfWeek, endOfWeek, getWeek } from 'date-fns';

	let currentWeek = $state(new Date());

	const nextWeek = () => {
		currentWeek = addWeeks(currentWeek, 1);
	};

	const prevWeek = () => {
		currentWeek = subWeeks(currentWeek, 1);
	};
</script>

<div class="my-4 px-3">
	<div class="flex items-center justify-end gap-3 overflow-hidden pr-1">
		<div>
			<button class="shadow_button shadow_button_sm shadow_button_thin" onclick={prevWeek}>
				<span class="block rotate-180">
					<Play size="18px" />
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
				<p class="font-lexend text-center text-xs leading-2 font-light">
					Wk {getWeek(currentWeek)}
				</p>
			</div>
		</div>

		<div>
			<button class="shadow_button shadow_button_sm shadow_button_thin" onclick={nextWeek}>
				<Play size="18px" />
			</button>
		</div>
	</div>
</div>
