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
		id="notes"
		oninput={resizeTextarea}
		bind:this={textarea}
		bind:value
		class="font-lexend w-full rounded-lg border-2 border-black p-3 text-left font-light outline-none"
		{...restProps}
	>
	</textarea>

	<!-- {#if type === 'number'}
		<input
			type="text"
			value={transformValue(value)}
			class="h-[40px] w-full border-b border-b-[#393838] px-3 outline-none"
			{id}
			{name}
			readonly={readOnly}
			{placeholder}
			inputmode="numeric"
			{required}
			{disabled}
			oninput={handleInput}
			{...restProps}
		/>
	{:else}
		<input
			{type}
			bind:value
			class="h-[40px] w-full border-b border-b-[#393838] px-3 outline-none"
			{id}
			{name}
			readonly={readOnly}
			{placeholder}
			{required}
			{disabled}
			inputmode={inputMode}
			{...restProps}
		/>
	{/if} -->
</div>
