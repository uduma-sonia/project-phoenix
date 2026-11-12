<script lang="ts">
	type TagProps = {
		variant?: any;
		text?: string;
		action?: () => void;
		disabled?: boolean;
	};
	let { variant = 'default', text, action, disabled }: TagProps = $props();

	function getVariantClass(variant?: any) {
		let _class;

		if (variant === 'default') {
			_class = 'default_tag';
		}
		if (variant === 'plum') {
			_class = 'plum_tag';
		}
		if (variant === 'biloba') {
			_class = 'biloba_tag';
		}
		if (variant === 'orange') {
			_class = 'orange_tag';
		}

		return _class;
	}
</script>

<button {disabled} onclick={action} class="basic_style {getVariantClass(variant)}">
	{text}
</button>

<style>
	.basic_style {
		font-size: 12px;
		font-family: var(--font-lexend);
		width: fit-content;
		font-weight: 500;
		min-width: max-content;
		border-radius: 8px;
		padding: 2px 6px;
		min-height: 24px;
	}

	.default_tag {
		background-color: white;
		color: var(--color-primary-green-dark);
		border: 1px solid black;
	}

	.plum_tag {
		background-color: var(--color-primary-plum-900);
		border: 1px solid var(--color-primary-plum-900);
		color: white;
	}
	.biloba_tag {
		background-color: var(--color-primary-biloba-900);
		border: 1px solid var(--color-primary-biloba-900);
		color: white;
	}
	.orange_tag {
		background-color: var(--color-primary-orange-900);
		border: 1px solid var(--color-primary-orange-900);
		color: white;
	}
</style>
