<script lang="ts">
	import type { ButtonProps, Variants } from '../../../types/button';

	let {
		label,
		variant = 'primary',
		action,
		type = 'button',
		isLoading,
		size = 'm',
		Icon,
		iconProps,
		IsDisabled,
		...restProps
	}: ButtonProps = $props();

	function getVariantClass(variant?: Variants, size?: 's' | 'm' | 'l' | 'xs') {
		let _class = '';

		if (variant === 'primary') {
			_class = 'primary_btn';
		}
		//
		if (variant === 'purple') {
			_class = 'purple_btn';
		}
		if (variant === 'green') {
			_class = 'green_btn';
		}
		if (variant === 'danger') {
			_class = 'danger_btn';
		}

		if (size === 's') {
			_class = _class + ' btn_small';
		}
		if (size === 'xs') {
			_class = _class + ' btn_xtra_small';
		}

		return _class;
	}
</script>

<button
	class="basic_btn {getVariantClass(variant, size)}"
	{type}
	disabled={IsDisabled}
	onclick={() => action?.()}
	{...restProps}
>
	{#if isLoading}
		<span class="spinner_white border-2 border-black"></span>
	{:else}
		<Icon {...iconProps} />
	{/if}
</button>

<style>
	.basic_btn {
		font-family: var(--font-lexend);
		font-optical-sizing: auto;
		font-weight: 500;
		font-style: normal;
		background-color: #ffffff;
		border: 2px solid black;
		height: 45px;
		width: 45px;
		min-width: max-content;
		font-size: var(--text-15);
		padding-left: 8px;
		padding-right: 8px;
		border-radius: 8px;
		box-shadow:
			2px 2px 0 black,
			2px 2px 0 black,
			2px 2px 0 black;
		transition: all 0.1s ease-in-out;
		outline: none;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.basic_btn:disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}

	.basic_btn:hover {
		background-color: var(--color-primary-olive-400);
	}

	.basic_btn:active {
		background-color: var(--color-primary-olive-600);
		transform: translate(4px, 4px);
		box-shadow: 0 0 0 black;
	}

	/*  */

	.primary_btn {
		background-color: #ffffff;
	}

	/* PURPLE */
	.purple_btn {
		background-color: #cecafc;
	}
	.purple_btn:hover,
	.purple_btn:active {
		background-color: var(--color-primary-biloba-400) !important;
	}

	.green_btn {
		background-color: var(--color-primary-green) !important;
		color: #ffffff;
	}

	.danger_btn {
		color: var(--color-brand-error);
	}

	.danger_btn:hover,
	.danger_btn:active,
	.danger_btn:focus {
		background-color: var(--color-brand-error);
		color: #ffffff;
	}

	/* SIZES */
	.btn_small {
		height: 40px !important;
		width: 40px !important;
		padding-left: 6px !important;
		padding-right: 6px !important;
	}
	.btn_xtra_small {
		height: 35px !important;
		width: 35px !important;
		padding-left: 6px !important;
		padding-right: 6px !important;
	}
</style>
