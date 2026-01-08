<script lang="ts">
	import { X } from '@lucide/svelte';
	import type { InputFieldProps } from '../../../../types/input';
	import { Eye, EyeOff } from '@lucide/svelte';

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
		openDropdown,
		...restProps
	}: InputFieldProps = $props();

	// TODO: Add error state

	let passwordType = $state('password');

	function togglePasswordType() {
		if (passwordType === 'password') {
			passwordType = 'text';
		} else {
			passwordType = 'password';
		}
	}
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

	let previousActiveElement: any = $state();

	function clearField() {
		value = '';
		previousActiveElement?.focus();
		openDropdown();
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

	<input
		bind:this={previousActiveElement}
		type={type === 'password' ? (passwordType === 'password' ? 'password' : 'text') : type}
		bind:value
		class={`h-[50px] w-full appearance-none rounded-lg border border-black px-3 text-sm outline-none ${inputClass}`}
		{id}
		{name}
		readonly={readOnly}
		{placeholder}
		{required}
		{disabled}
		inputmode={inputMode}
		{...restProps}
	/>
	<!-- {#if type === 'number'}
		<input
			type="text"
			value={transformValue(value)}
			class={`h-[50px] w-full rounded-lg border border-black px-3 outline-none ${inputClass}`}
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
			type={type === 'password' ? (passwordType === 'password' ? 'password' : 'text') : type}
			bind:value
			class={`h-[50px] w-full rounded-lg border border-black px-3 outline-none ${inputClass}`}
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

	{#if type === 'password'}
		<button type="button" class="absolute right-3 bottom-[13px]" onclick={togglePasswordType}>
			{#if passwordType === 'password'}
				<Eye />
			{:else}
				<EyeOff />
			{/if}
		</button>
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
