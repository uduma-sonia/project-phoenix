<script lang="ts">
	import { Flame } from '@lucide/svelte';
	import { RecipeDifficulty } from '../../../../types/recipe';

	let { difficulty }: { difficulty: RecipeDifficulty } = $props();

	const getColor = () => {
		if (difficulty.toUpperCase() === RecipeDifficulty.EASY) {
			return 'text-brand-green';
		}
		if (difficulty.toUpperCase() === RecipeDifficulty.MEDIUM) {
			return 'text-primary-orange-600';
		}
		if (difficulty.toUpperCase() === RecipeDifficulty.HARD) {
			return 'text-brand-error';
		}
	};
</script>

<div class="flex min-w-max items-center">
	<p class="font-lexend-deca flex items-center gap-1 text-sm {getColor()}">
		<Flame size="16px" strokeWidth={2.2} />
	</p>
	<p class="font-lexend text-xs font-medium uppercase {getColor()}">{difficulty}</p>
</div>
