<script lang="ts">
	import { Check } from '@lucide/svelte';

	let {
		isChecked = $bindable(),
		action,
		id,
		description,
		title,
		variant = 'square',
		color = 'green'
	}: {
		isChecked: boolean;
		action: (id: string) => void;
		id: string;
		title?: string;
		description?: string;
		variant?: string;
		color?: string;
	} = $props();
</script>

<div>
	<button class="flex items-center gap-1.5 text-left" onclick={() => action(id)}>
		<div
			class:selected_checkbox={isChecked && color === 'green'}
			class:color_pink={isChecked && color === 'pink'}
			class:circle_variant={variant === 'circle'}
			class="flex aspect-square w-6 items-center justify-center rounded-md border-2"
		>
			{#if isChecked}
				<Check size="16" strokeWidth={3} color="#000" />
			{/if}
		</div>

		{#if title || description}
			<div>
				{#if title}
					<p class="font-lexend text-brand-dark text-sm font-normal">{title}</p>
				{/if}
				{#if description}
					<p class="font-lexend text-13 text-brand-dark font-light">{description}</p>
				{/if}
			</div>
		{/if}
	</button>
</div>

<style>
	.selected_checkbox {
		/* background-color: var(--color-brand-green) !important; */
		background-color: var(--color-primary-olive-600) !important;
	}

	.circle_variant {
		border-radius: 999px;
	}

	.color_pink {
		background-color: var(--color-primary-pink) !important;
	}
</style>
