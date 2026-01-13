<script lang="ts">
	// @ts-nocheck
	import { ChevronDown, ChevronUp, X } from '@lucide/svelte';
	import Helpers from '$lib/utils/helpers';
	import BasicInputField from './BasicInputField.svelte';

	type Props = {
		options: Options[];
		label?: string;
		selectedOptions?: Options[];
		withClearButton?: boolean;
		handleSelectChange?: any;
		shouldSearch?: boolean;
		inputClass?: string;
		placeholder?: string;
		helperText?: string;
	};

	type Options = {
		value: string;
		id: string;
	};

	let {
		options,
		label,
		withClearButton = false,
		selectedOptions = $bindable([]),
		handleSelectChange,
		shouldSearch = true,
		inputClass,
		placeholder,
		helperText
	}: Props = $props();

	let isDropDownOpen = $state(false);
	let focusedIndex = $state(0);
	let searchQuery = $state('');

	function toggleDropDownMenu() {
		isDropDownOpen = !isDropDownOpen;
		if (isDropDownOpen) {
			focusedIndex = 0;
		}
	}

	function handleClickOutside() {
		isDropDownOpen = false;
	}

	function getFilteredOptions() {
		if (shouldSearch) {
			return options?.filter((option: Options) =>
				option?.value.toUpperCase().includes(searchQuery.toUpperCase())
			);
		} else {
			return options;
		}
	}

	let filteredOptions = $derived(getFilteredOptions());

	function selectOption(option: Options) {
		const isSelected = selectedOptions.some((sel) => sel.id === option.id);
		if (!isSelected) {
			selectedOptions = [...selectedOptions, option];
		}
		handleSelectChange?.(selectedOptions);
	}

	function scrollTo(id: string) {
		const el = document.getElementById(id);
		el?.scrollIntoView({ behavior: 'smooth', inline: 'center' });
	}

	function handleKeyDown(event: KeyboardEvent) {
		if (!isDropDownOpen) return;

		switch (event.key) {
			case 'ArrowDown':
				event.preventDefault();
				focusedIndex = (focusedIndex + 1) % options.length;
				scrollTo(options[focusedIndex]?.id);
				break;
			case 'ArrowUp':
				event.preventDefault();
				focusedIndex = (focusedIndex - 1 + options.length) % options.length;

				scrollTo(options[focusedIndex].id);
				break;
			case 'Enter':
				event.preventDefault();
				selectOption(options[focusedIndex]);
				break;
			case 'Escape':
				isDropDownOpen = false;
				break;
		}
	}

	function openDropdown() {
		isDropDownOpen = true;
	}
</script>

<div class="relative w-full">
	<BasicInputField
		{label}
		bind:value={searchQuery}
		onclick={toggleDropDownMenu}
		aria-haspopup="listbox"
		aria-expanded={isDropDownOpen}
		onkeydown={handleKeyDown}
		{withClearButton}
		clearButtonWrapperClass="right-11"
		{inputClass}
		{helperText}
		{placeholder}
		{openDropdown}
	/>

	<div class="absolute right-3 bottom-2.5">
		{#if isDropDownOpen}
			<ChevronUp size="26px" />
		{:else}
			<ChevronDown size="26px" />
		{/if}
	</div>

	{#if isDropDownOpen}
		<div
			use:Helpers.clickOutside
			onclick_outside={handleClickOutside}
			role="listbox"
			tabindex="-1"
			class="absolute top-full z-50 max-h-60 w-full overflow-y-auto rounded-xl rounded-t-none border-2 border-t-0 border-black bg-white shadow-2xl"
		>
			{#each filteredOptions as option, index (index)}
				<div role="option" aria-selected={selectedOptions.some((sel) => sel.id === option.id)}>
					<button
						type="button"
						class="font-lexend h-[45px] w-full rounded-lg border-none bg-white px-3 text-left text-sm font-light outline-none hover:bg-[#f5ecd5b3]"
						onclick={() => selectOption(option)}
						id={option.id}
					>
						{option?.value}
					</button>
				</div>
			{/each}
		</div>
	{/if}
</div>
