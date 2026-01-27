<script lang="ts">
	import Helpers from '$lib/utils/helpers';
	import { format } from 'date-fns';
	import DatePickerMini from '../DatePicker/DatePickerMini.svelte';

	let { dateValue = $bindable(), label = '' } = $props();

	let isDropdownOpen = $state(false);

	function toggleDropdown() {
		isDropdownOpen = !isDropdownOpen;
	}

	function handleClickOutside() {
		isDropdownOpen = false;
	}
</script>

<div class="w-full">
	<label for="habitName" class="mb-2"> {label}</label>

	<div class="relative">
		<button
			class="button_active font-lexend h-[50px] w-full rounded-lg border px-4 text-left text-sm font-light sm:text-base"
			type="button"
			onclick={toggleDropdown}
		>
			{format(new Date(dateValue), 'PPP')}
		</button>

		{#if isDropdownOpen}
			<div
				use:Helpers.clickOutsidev2={handleClickOutside}
				class="absolute top-[54px] left-0 z-[9999] gap-4 overflow-hidden rounded-lg bg-white shadow-md"
			>
				<div class="w-[260px] rounded-lg border-2 p-1">
					<DatePickerMini bind:selectedDate={dateValue} />
				</div>
			</div>
		{/if}
	</div>
</div>
