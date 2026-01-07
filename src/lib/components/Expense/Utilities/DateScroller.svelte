<script lang="ts">
	import { Play } from '@lucide/svelte';
	import { endOfWeek, format, formatISO, startOfWeek } from 'date-fns';
	import { BudgetCycle } from '../../../../types/transaction';

	let {
		budgetCycle,
		prevMonth,
		nextMonth,
		prevWeek,
		nextWeek,
		currentMonth = $bindable()
	} = $props();

	const renderTime = () => {
		if (budgetCycle === BudgetCycle.WEEKLY) {
			const start = formatISO(startOfWeek(currentMonth));
			const end = formatISO(endOfWeek(currentMonth));
			return `${format(start, 'dd MMM')} - ${format(end, 'dd MMM')}`;
		} else {
			return format(currentMonth, 'MMMM yyyy');
		}
	};

	function _next() {
		if (budgetCycle === BudgetCycle.WEEKLY) {
			nextWeek();
		} else {
			nextMonth();
		}
	}
	function _prev() {
		if (budgetCycle === BudgetCycle.WEEKLY) {
			prevWeek();
		} else {
			prevMonth();
		}
	}
</script>

<div class="flex items-center gap-3 overflow-hidden pr-3">
	<div>
		<button class="shadow_button shadow_button_sm" onclick={_prev}>
			<span class="block rotate-180">
				<Play />
			</span>
		</button>
	</div>

	<div>
		<p class="font-lexend font-light">
			{renderTime()}
		</p>
	</div>

	<div>
		<button class="shadow_button shadow_button_sm" onclick={_next}>
			<Play />
		</button>
	</div>
</div>
