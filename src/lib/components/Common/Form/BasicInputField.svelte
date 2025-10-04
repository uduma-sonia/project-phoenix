<script lang="ts">
	import { X } from '@lucide/svelte';
	import type { InputType } from '../../../../types/input';

	type Props = {
		label?: string;
		value?: string;
		id?: string;
		name?: string;
		type?: InputType;
		placeholder?: string;
		helperText?: string;
		inputClass?: string;
		clearButtonWrapperClass?: string;
		required?: boolean;
		disabled?: boolean;
		readonly?: boolean;
		withClearButton?: boolean;
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
	};

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
		inputClass,
		withClearButton = false,
		clearButtonWrapperClass,
		helperText,
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

	function clearField() {
		value = '';
	}
</script>

<div class="relative">
	{#if label}
		<label for={id} class="mb-2"
			>{label}

			{#if helperText}
				<span class="text-[10px] font-light"> - {helperText} </span>
			{/if}
		</label>
	{/if}

	{#if type === 'number'}
		<input
			type="text"
			value={transformValue(value)}
			class={`h-[50px] w-full rounded-lg border-2 border-black px-3 outline-none ${inputClass}`}
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
			class={`h-[50px] w-full rounded-lg border-2 border-black px-3 outline-none ${inputClass}`}
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

	{#if withClearButton}
		<div class={`absolute right-3 bottom-[14px] ${clearButtonWrapperClass}`}>
			<button
				type="button"
				class="bg-brand-light flex h-5 w-5 items-center justify-center rounded-full"
				onclick={clearField}
			>
				<X size="14px" />
			</button>
		</div>
	{/if}
</div>
