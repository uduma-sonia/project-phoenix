<script lang="ts">
	import type { Component } from 'svelte';

	let {
		isLoading = false,
		variant = 'primary',
		label = '',
		action,
		type = 'button',
		className,
		LeftIcon,
		leftIconProps,
		...restProps
	}: {
		isLoading?: boolean;
		variant?: string;
		className?: string;
		label?: string;
		action?: () => void;
		type?: 'button' | 'reset' | 'submit' | null | undefined;
		LeftIcon?: Component<any, {}, ''>;
		leftIconProps?: any;
	} = $props();
</script>

<button
	class={`${className}`}
	class:shadow_button_with_icon={Boolean(LeftIcon)}
	class:shadow_button={variant === 'primary'}
	class:shadow_button_red={variant === 'error'}
	{type}
	onclick={() => action?.()}
	{...restProps}
>
	{#if isLoading}
		<span class="spinner_white border-2 border-black"></span>
	{:else}
		<LeftIcon {...leftIconProps} />
		{label}
	{/if}
</button>
