<script lang="ts">
	// @ts-nocheck
	import { ChevronDown, ChevronUp, X } from '@lucide/svelte';
	import Helpers from '$lib/utils/helpers';
	import BasicInputField from './BasicInputField.svelte';

	type Props = {
		options: Options[];
		label?: string;
		selectedOption?: Options;
		withClearButton?: boolean;
		handleSelectChange?: any;
		shouldSearch?: boolean;
	};

	type Options = {
		value: string;
		id: string;
	} | null;

	let {
		options,
		label,
		withClearButton = false,
		selectedOption = $bindable(),
		handleSelectChange,
		shouldSearch = false
	}: Props = $props();

	let isDropDownOpen = $state(false);
	let focusedIndex = $state(0);
	let searchQuery = $state('');

	function toggleDropDownMenu() {
		isDropDownOpen = !isDropDownOpen;
		if (isDropDownOpen) {
			focusedIndex = options.findIndex(
				(item) => item?.value.toLowerCase() === selectedOption?.value.toLowerCase()
			);
			if (focusedIndex === -1) focusedIndex = 0;
		}
	}

	function handleClickOutside() {
		isDropDownOpen = false;
	}

	function gete() {
		if (shouldSearch) {
			options?.filter((option: Options) =>
				option?.value.toUpperCase().includes(searchQuery.toUpperCase())
			);
		} else {
			return options;
		}
	}

	let filteredOptions = $derived(gete());

	function selectOption(view: Options) {
		selectedOption = view;
		handleSelectChange?.(view);
		handleClickOutside();
	}

	$effect(() => {
		if (selectedOption?.value) {
			searchQuery = selectedOption?.value;
		}
	});

	function handleKeyDown(event: KeyboardEvent) {
		if (!isDropDownOpen) return;

		switch (event.key) {
			case 'ArrowDown':
				event.preventDefault();
				focusedIndex = (focusedIndex + 1) % options.length;
				break;
			case 'ArrowUp':
				event.preventDefault();
				focusedIndex = (focusedIndex - 1 + options.length) % options.length;
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
			class="absolute top-20 z-50 max-h-60 w-full overflow-y-auto rounded-xl rounded-t-none border-2 border-t-0 border-black bg-white shadow-2xl"
		>
			{#each filteredOptions as option, index (index)}
				<div
					role="option"
					aria-selected={selectedOption?.value?.toLowerCase() == option?.value.toLowerCase()}
				>
					<button
						type="button"
						class="font-lexend h-[45px] w-full rounded-lg border-none bg-white px-3 text-left text-sm font-light outline-none hover:bg-[#f5ecd5b3]"
						onclick={() => selectOption(option)}
						class:selected={index === focusedIndex}
					>
						{option?.value}
					</button>
				</div>
			{/each}
		</div>
	{/if}
</div>

<style>
	.selected {
		background-color: #f5ecd5b3;
	}
</style>
