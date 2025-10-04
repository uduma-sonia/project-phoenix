<script lang="ts">
	import { Plus } from '@lucide/svelte';

	let {
		isLoading = false,
		variant = 'primary',
		label = '',
		action,
		type,
		RightIcon,
		...restProps
	}: {
		isLoading?: boolean;
		variant?: string;
		label?: string;
		action?: () => void;
		type?: 'button' | 'reset' | 'submit' | null | undefined;
		RightIcon?: any;
	} = $props();
</script>

<button class="text-brand-green flex items-center" {type} onclick={() => action?.()} {...restProps}>
	{label}

	<RightIcon />
	<!-- <Plus size="20px" /> -->
</button>
