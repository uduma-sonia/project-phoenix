<script lang="ts">
	import type { InputType } from '../../../types/input';

	interface Props {
		label?: string;
		value?: string;
		id?: string;
		name?: string;
		type?: InputType;
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
		...restProps
	}: Props = $props();

	function formatNumber(num: string | number) {
		if (num === null || num === undefined || num === '') return '';
		const cleaned = String(num).replace(/,/g, '');
		if (isNaN(Number(cleaned))) return String(num);
		return new Intl.NumberFormat('en-US').format(Number(cleaned));
	}

	function handleInput(event: Event) {
		const target = event.target as HTMLInputElement;
		const rawValue = target.value.replace(/,/g, '');

		if (!isNaN(Number(rawValue))) {
			value = rawValue;

			target.value = formatNumber(rawValue);
		}
	}

	function transformValue(value: any) {
		const rawValue = value;

		const numericValue = rawValue.replace(/[^\d]/g, '');
		const formattedValue = numericValue ? new Intl.NumberFormat('en-US').format(numericValue) : '';
		return formattedValue;
	}
</script>

<div class="relative">
	{#if label}
		<label class="input_right_placeholder" for={id}>{label}</label>
	{/if}

	{#if type === 'number'}
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
	{/if}
</div>
