<script lang="ts">
	import { currencyLocales } from '$lib/constants/currency';
	import HelperUtils from '$lib/utils/helpers';
	import { Info } from '@lucide/svelte';
	import { onMount } from 'svelte';

	type Callback = (value: number | null) => any;

	export let handleValueChange: Callback = () => {};
	export let inputClass = '';
	export let currency = '';
	export let label = '';
	export let helperText = '';
	export let required: boolean = false;
	export let id = '';
	export let bottomHelperText = '';
	export let formattedInput = '';
	export let value: number | null | string = null;

	let dom: Document;
	let inputElement: HTMLInputElement;

	$: locale = currencyLocales[currency] || 'en-NG';

	const currencyDecimal = new Intl.NumberFormat(locale).format(1.1).charAt(1);
	const isDecimalComma = currencyDecimal === ',';
	const handleOnBlur = () => handleFormattedValue();

	const handleUnformattedValue = (event?: KeyboardEvent) => {
		if (event) {
			if (event.key === currencyDecimal) return;
			// Pressing `.` when the decimal point is `,` gets replaced with `,`
			if (isDecimalComma && event.key === '.') {
				formattedInput = formattedInput.replace(/\.([^.]*)$/, currencyDecimal + '$1'); // Only replace the last occurence
			}

			// Pressing `,` when the decimal point is `.` gets replaced with `.`
			if (!isDecimalComma && event.key === ',') {
				formattedInput = formattedInput.replace(/,([^,]*)$/, currencyDecimal + '$1'); // Only replace the last occurence
			}

			// Don't format if `formattedValue` is ['$', '-$', "-"]
			const ignoreSymbols = ['₦', '-₦', '-'];
			const strippedUnformattedValue = formattedInput.replace(' ', '');
			if (ignoreSymbols.includes(strippedUnformattedValue)) return;

			// Set the starting caret positions
			// inputTarget = event.target;
		}

		let unformattedValue = formattedInput.replace(/[^0-9,.]/g, '');

		if (!unformattedValue || Number.isNaN(parseFloat(unformattedValue))) {
			value = null;
			return;
		} else {
			// The order of the following operations is *critical*
			unformattedValue = unformattedValue.replace(isDecimalComma ? /\./g : /,/g, ''); // Remove all group symbols
			if (isDecimalComma) unformattedValue = unformattedValue.replace(',', '.'); // If the decimal point is a comma, replace it with a period

			// If the zero-key has been pressed
			// and if the current `value` is the same as the `value` before the key-press
			// formatting may need to be done (Issue #30)
			const previousValue = value;
			value = parseFloat(unformattedValue);

			if (event && previousValue === value) {
				// Do the formatting if the number of digits
				//  after the decimal point exceeds `fractionDigits`
				const ddd = unformattedValue.split('.')[1] || [];
				if (unformattedValue.includes('.') && ddd.length > 3) {
					handleFormattedValue();
				}
			}
		}
	};

	function numberWithCommas(x: number | string) {
		return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
	}

	const handleFormattedValue = () => {
		if (!dom) return;

		if (value === null) {
			formattedInput = '';
			handleValueChange(value);
			return;
		}

		const startCaretPosition = inputElement?.selectionStart || 0;
		const previousFormattedValueLength = formattedInput.length;

		formattedInput = numberWithCommas(value);

		handleUnformattedValue();

		if (previousFormattedValueLength !== formattedInput.length) {
			const endCaretPosition =
				startCaretPosition + formattedInput.length - previousFormattedValueLength;
			inputElement?.setSelectionRange(endCaretPosition, endCaretPosition);
		}

		handleValueChange(Number(value));
	};

	const handleKeyDown = (event: KeyboardEvent) => {
		const isDeletion = event.key === 'Backspace' || event.key === 'Delete';
		const isModifier = event.metaKey || event.altKey || event.ctrlKey;
		const isArrowKey = event.key === 'ArrowLeft' || event.key === 'ArrowRight';
		const isTab = event.key === 'Tab';
		const isInvalidCharacter = !/^\d|,|\.|-$/g.test(event.key); // Keys that are not a digit, comma, period or minus sign

		// If there is already a decimal point, don't allow more than one
		const isPunctuationDuplicated = () => {
			if (event.key !== ',' && event.key !== '.') return false; // Is `false` because it's not a punctuation key
			if (isDecimalComma) return formattedInput.split(',').length >= 2;
			if (!isDecimalComma) return formattedInput.split('.').length >= 2;
			return false;
		};

		if (
			isPunctuationDuplicated() ||
			(!isDeletion && !isModifier && !isArrowKey && isInvalidCharacter && !isTab)
		)
			event.preventDefault();
	};

	$: if (value !== null) {
		handleFormattedValue();
	}

	onMount(() => {
		dom = document;
		if (value !== null) {
			handleFormattedValue();
		}
	});
</script>

<div class="relative">
	{#if label}
		<label for={id} class="mb-2"
			>{label}

			{#if helperText}
				<span class="text-[10px] font-light"> - {helperText} </span>
			{/if}

			{#if required}
				<span class="text-brand-error"> * </span>
			{/if}
		</label>
	{/if}

	<div class="basic_input_with_inner relative appearance-none overflow-hidden {inputClass}">
		<div class="flex w-6 items-center justify-end pl-2">
			<p class="font-lexend text-15 font-medium">
				{HelperUtils.getCurrencySymbol(currency)}
			</p>
		</div>

		<input
			type="text"
			class="__input flex-1"
			inputmode="decimal"
			autocomplete="off"
			name={id}
			{id}
			{required}
			bind:this={inputElement}
			bind:value={formattedInput}
			on:keydown={handleKeyDown}
			on:keyup={handleUnformattedValue}
			on:blur={handleOnBlur}
		/>
	</div>

	{#if bottomHelperText}
		<p
			class="font-work-sans text-brand-green-bright mt-2 flex items-center gap-1 text-xs font-normal"
		>
			<Info size="14px" />
			{bottomHelperText}
		</p>
	{/if}
</div>

<style>
	.basic_input_with_inner {
		border: 1px solid black;
		height: 50px;
		width: 100%;
		display: flex;
		font-family: var(--font-lexend);
		font-size: 15px;
		border-radius: 9px;
		font-weight: 450;
		cursor: pointer;
		outline: none;
		appearance: none;
	}

	.__input {
		height: 100%;
		font-family: var(--font-lexend);
		font-size: 15px;
		font-weight: 400;
		cursor: pointer;
		outline: none;
		appearance: none;
		padding: 0px 8px;
		border-radius: 9px;
	}

	/* .basic_input_with_inner:has(input:focus) {
		box-shadow: 3px 3px black;
	} */

	.basic_input {
		border: 1.5px solid black;
		height: 40px;
		width: 100%;
		display: block;
		font-family: var(--font-lexend);
		font-size: 15px;
		font-weight: 450;
		border-radius: 9px;
		cursor: pointer;
		outline: none;
		padding: 0px 8px;
		appearance: none;
	}

	.basic_input:focus,
	.basic_input:active {
		box-shadow: 3px 3px black;
	}

	.input_label {
		font-family: var(--font-lexend);
		font-size: 14px;
		font-weight: 400;
		color: #303030;
	}

	.basic_input::placeholder {
		font-family: var(--font-lexend);
		font-size: 15px;
	}
</style>
