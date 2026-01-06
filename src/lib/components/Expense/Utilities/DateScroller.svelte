<script lang="ts">
	import { Play } from '@lucide/svelte';
	import { format } from 'date-fns';

	let { prevMonth, nextMonth, currentMonth = $bindable() } = $props();
</script>

<div class="flex items-center gap-3 overflow-hidden pr-3">
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
