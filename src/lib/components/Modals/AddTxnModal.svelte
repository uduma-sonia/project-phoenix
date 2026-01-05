<script lang="ts">
	import { closeAddTxnModal, modalsState } from '$lib/state/modal.svelte';
	import ModalWrapper from '../Common/ModalWrapper.svelte';
	import BasicButton from '../Common/Form/BasicButton.svelte';
	import BasicInputField from '../Common/Form/BasicInputField.svelte';
	import Dropdown from '../Common/Form/Dropdown.svelte';
	import Helpers from '$lib/utils/helpers';
	import { format } from 'date-fns';
	import DatePickerMini from '../Common/DatePicker/DatePickerMini.svelte';

	let selectedDifficulty = $state({
		value: 'Easy',
		id: 'EASY'
	});
	let isSubmitting = $state(false);

	const difficultyOptions = [
		{
			value: 'Easy',
			id: 'EASY'
		},
		{
			value: 'Medium',
			id: 'MEDIUM'
		},
		{
			value: 'Hard',
			id: 'HARD'
		}
	];
	let startDateValue = $state(new Date());
	let isStartDateOpen = $state(false);

	function toggleStart() {
		isStartDateOpen = !isStartDateOpen;
	}

	function handleClickOutside() {
		isStartDateOpen = false;
	}
</script>

<ModalWrapper
	isOpen={modalsState.data.isOpenAddTxn}
	onClose={closeAddTxnModal}
	label="Add New Transaction"
>
	<div class="p-4">
		<div>
			<div class="space-y-4">
				<div>
					<label for="habitName" class="mb-2">Type</label>

					<div class="flex items-center gap-4">
						<!-- class:bg-brand-build={type === 'BUILD'} -->
						<button class="button_active h-[35px] rounded-lg border px-4 text-sm" type="button">
							<!-- onclick={() => changeType('BUILD')} -->
							Expense
						</button>
						<!-- class:bg-brand-quit={type === 'QUIT'} -->
						<button class="button_active h-[35px] rounded-lg border px-4 text-sm" type="button">
							<!-- onclick={() => changeType('QUIT')} -->
							Income
						</button>
					</div>
				</div>

				<div class="w-1/2">
					<label for="habitName" class="mb-2"> Start date</label>

					<div class="relative">
						<button
							class="button_active font-lexend h-[50px] w-full rounded-lg border px-4 text-left text-sm font-light sm:text-base"
							type="button"
							onclick={toggleStart}
						>
							{format(new Date(startDateValue), 'PPP')}
						</button>

						{#if isStartDateOpen}
							<div
								use:Helpers.clickOutside
								onclick_outside={handleClickOutside}
								class="absolute top-[54px] left-0 z-[9999] gap-4 overflow-hidden rounded-lg bg-white shadow-md"
							>
								<div class="w-[260px] rounded-lg border-2 p-1">
									<DatePickerMini bind:selectedDate={startDateValue} />
								</div>
							</div>
						{/if}
					</div>
				</div>

				<div>
					<BasicInputField label="Amount" type="number" id="amount" name="amount" required />
				</div>
				<div>
					<BasicInputField label="Description" type="text" id="description" name="description" />
				</div>

				<div>
					<Dropdown
						label="Category"
						options={difficultyOptions}
						bind:selectedOption={selectedDifficulty}
						shouldSearch={false}
					/>
				</div>
			</div>
		</div>
		<div class="fle mt-8 justify-end">
			<div class="mt-8 flex items-center justify-end gap-5">
				<BasicButton label="Cancel" variant="error" />
				<BasicButton label="Add Transaction" isLoading={isSubmitting} variant="primary" />
			</div>
			<!-- <BasicButton isLoading={isSubmitting} label="Save" type="submit" /> -->

			<!-- <div class="w-fit">
				<BasicButton className="shadow_button_thin" LeftIcon={Plus} label="Create list" />
			</div> -->
		</div>
	</div>
</ModalWrapper>
