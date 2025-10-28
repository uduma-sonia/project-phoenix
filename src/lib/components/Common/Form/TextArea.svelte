<script lang="ts">
	import type { InputType } from '../../../../types/input';

	interface Props {
		label?: string;
		value?: string;
		id?: string;
		name?: string;
		type?: InputType;
		helperText?: string;
		placeholder?: string;
		className?: string;
		required?: boolean;
		disabled?: boolean;
		readonly?: boolean;
		inputMode?:
			| 'text'
			| 'email'
			| 'tel'
			| 'url'
			| 'search'
			| 'none'
			| 'numeric'
			| 'decimal'
			| null
			| undefined;
		[key: string]: any;
	}

	let {
		label,
		value = $bindable(),
		id,
		name = id,
		type = 'text',
		placeholder = '',
		required = false,
		disabled = false,
		inputMode = 'text',
		readOnly = false,
		helperText,
		className,
		...restProps
	}: Props = $props();

	let textarea: any = $state(null);

	function resizeTextarea() {
		textarea.style.height = 'auto';
		textarea.style.height = textarea.scrollHeight + 'px';
	}
</script>

<div class="relative">
	{#if label}
		<label for={id} class="mb-2"
			>{label}
			{#if helperText}
				<span class="text-[10px] font-light">- {helperText}</span>
			{/if}
		</label>
	{/if}

	<textarea
		oninput={resizeTextarea}
		{placeholder}
		bind:this={textarea}
		bind:value
		class={`font-lexend border-{#111} w-full rounded-lg border p-3 text-left font-light outline-none ${className}`}
		{id}
		{name}
		readonly={readOnly}
		{required}
		{disabled}
		inputmode={inputMode}
		{...restProps}
		{...restProps}
	>
	</textarea>
</div>
