<script lang="ts">
	let {
		isLoading = false,
		variant = 'primary',
		label = '',
		action,
		...restProps
	}: { isLoading?: boolean; variant?: string; label?: string; action?: () => void } = $props();
</script>

<button
	class:shadow_button={variant === 'primary'}
	class:shadow_button_red={variant === 'error'}
	type="submit"
	{...restProps}
	onclick={() => action?.()}
>
	{#if isLoading}
		<div class="spinner_white border-2 border-black"></div>
	{:else}
		{label}
	{/if}
</button>
