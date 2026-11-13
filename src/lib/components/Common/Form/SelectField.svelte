<script lang="ts">
	import { onMount } from 'svelte';
	import type { InputFieldProps } from '../../../../types/input';

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
		helperText,
		inputLabelClass,
		thisInputElement,
		requiredIcon = false,
		noOutline = false,
		shouldFocus = false,
		isLoading = false,
		errorText = '',
		variant,
		options,
		defaultId,
		...restProps
	}: InputFieldProps = $props();

	onMount(() => {
		if (shouldFocus) {
			thisInputElement.focus();
		}
	});
</script>

<div class="relative">
	{#if label}
		<div class="mb-0.5 flex items-center">
			<label for={id} class="input_label {inputLabelClass}"
				>{label}

				{#if helperText}
					<span class="text-10 font-normal"> - {helperText} </span>
				{/if}

				{#if required && requiredIcon}
					<span class="text-brand-error"> * </span>
				{/if}
			</label>

			{#if isLoading}
				<div class="px-3">
					<div class="spinner spinner_sm mx-auto"></div>
				</div>
			{/if}
		</div>
	{/if}

	<div class="relative">
		<!-- class="basic_input appearancenone {inputClass}" -->
		<select
			{name}
			{id}
			bind:this={thisInputElement}
			class={`h-[50px] w-full appearance-none rounded-lg border border-black px-3 text-sm outline-none ${inputClass}`}
			{placeholder}
			{required}
			{disabled}
			{...restProps}
		>
			<option value="">Select</option>
			{#each options as option (option.id)}
				{@const selected = Boolean(option.id === defaultId)}
				<option {selected} value={option.id}>{option.value}</option>
			{/each}
		</select>
	</div>

	{#if errorText}
		<p class="font-work-sans text-10 text-brand-error mt-1 font-normal">{errorText}</p>
	{/if}
</div>
