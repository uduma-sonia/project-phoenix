<script lang="ts">
	let {
		isLoading = false,
		variant = 'primary',
		label = '',
		action,
		type = 'button',
		...restProps
	}: {
		isLoading?: boolean;
		variant?: string;
		label?: string;
		action?: () => void;
		type?: 'button' | 'reset' | 'submit' | null | undefined;
	} = $props();
</script>

<button
	class:shadow_button={variant === 'primary'}
	class:shadow_button_red={variant === 'error'}
	{type}
	onclick={() => action?.()}
	{...restProps}
>
	{#if isLoading}
		<div class="spinner_white border-2 border-black"></div>
	{:else}
		{label}
	{/if}
</button>
