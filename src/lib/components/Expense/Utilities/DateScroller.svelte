<script lang="ts">
	import { Play } from '@lucide/svelte';
	import { addMonths, format, subMonths } from 'date-fns';

	let currentMonth = $state(new Date());

	const prevMonth = () => {
		currentMonth = subMonths(currentMonth, 1);
	};

	const nextMonth = () => {
		currentMonth = addMonths(currentMonth, 1);
	};
</script>

<div class="flex items-center gap-3 overflow-hidden">
	<div>
		<button class="shadow_button shadow_button_sm" onclick={prevMonth}>
			<span class="block rotate-180">
				<Play />
			</span>
		</button>
	</div>

	<div>
		<p>{format(new Date(currentMonth), 'MMMM yyyy')}</p>
	</div>

	<div>
		<button class="shadow_button shadow_button_sm" onclick={nextMonth}>
			<Play />
		</button>
	</div>
</div>
<!-- <div class="my-4 flex items-center gap-3 overflow-hidden bg-red-700 px-3 pr-1">
	<div>
		<button class="shadow_button shadow_button_sm" onclick={prevMonth}>
			<span class="block rotate-180">
				<Play />
			</span>
		</button>
	</div>

	<div>
		<p>{format(new Date(currentMonth), 'MMMM yyyy')}</p>
	</div>

	<div>
		<button class="shadow_button shadow_button_sm" onclick={nextMonth}>
			<Play />
		</button>
	</div>
</div> -->
