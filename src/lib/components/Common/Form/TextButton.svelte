<script lang="ts">
	let {
		isLoading = false,
		variant = 'primary',
		label = '',
		action,
		type,
		RightIcon,
		className,
		...restProps
	}: {
		isLoading?: boolean;
		variant?: string;
		className?: string;
		label?: string;
		action?: () => void;
		type?: 'button' | 'reset' | 'submit' | null | undefined;
		RightIcon?: any;
	} = $props();
</script>

<button
	class="text-brand-green flex items-center hover:underline hover:underline-offset-4 {className} "
	{type}
	onclick={() => action?.()}
	{...restProps}
>
	{label}

	{#if RightIcon}
		<RightIcon />
	{/if}
</button>
