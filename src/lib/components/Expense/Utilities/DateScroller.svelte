<script lang="ts">
	import { ArrowLeft, ArrowRight, Play } from '@lucide/svelte';
	import { endOfWeek, format, formatISO, startOfWeek } from 'date-fns';
	import { BudgetCycle } from '../../../../types/transaction';
	import IconButton from '$lib/components/Common/IconButton.svelte';

	type Props = {
		budgetCycle: BudgetCycle;
		prevMonth?: () => void;
		nextMonth?: () => void;
		prevWeek?: () => void;
		nextWeek?: () => void;
		currentMonth: any;
	};

	let {
		budgetCycle,
		prevMonth,
		nextMonth,
		prevWeek,
		nextWeek,
		currentMonth = $bindable()
	}: Props = $props();

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
			nextWeek?.();
		} else {
			nextMonth?.();
		}
	}
	function _prev() {
		if (budgetCycle === BudgetCycle.WEEKLY) {
			prevWeek?.();
		} else {
			prevMonth?.();
		}
	}
</script>

<div class="flex items-center justify-end">
	<div>
		<IconButton action={_prev} Icon={ArrowLeft} iconProps={{ size: '20px', strokeWidth: '3' }} />
	</div>

	<div class="min-w-[140px] text-center">
		<p class="font-lexend text-sm font-normal">
			{renderTime()}
		</p>
	</div>

	<div>
		<IconButton action={_next} Icon={ArrowRight} iconProps={{ size: '20px', strokeWidth: '3' }} />
	</div>
</div>
