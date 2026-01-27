<script lang="ts">
	import { daysOfWeek, iconsList } from '$lib/constants/tracker';
	import { addToast } from '$lib/store/toast';
	import Helpers from '$lib/utils/helpers';
	import { addDays } from 'date-fns';
	import { TrackerRequest } from '$lib/requests';
	import { Check } from '@lucide/svelte';
	import BackComponent from '../Common/BackComponent.svelte';
	import { HabitStatus } from '../../../types/tracker';
	import { goto } from '$app/navigation';
	import Tooltip from '../Common/Tooltip.svelte';
	import TrackerUtils from './Utilities/utils';
	import BasicInputField from '../Common/Form/BasicInputField.svelte';
	import TextArea from '../Common/Form/TextArea.svelte';
	import BasicButton from '../Common/Form/BasicButton.svelte';
	import DatePickerDropdown from '../Common/Form/DatePickerDropdown.svelte';

	let { user } = $props();

	let isSubmitting = $state(false);
	let type = $state('BUILD');
	let interval = $state('DAILY');
	let habitName = $state('');
	let unitMeasurement = $state('');
	let description = $state('');
	let goalValue = $state('1');
	let selectedDays: number[] = $state([0, 1, 2, 3, 4, 5, 6]);
	let startDateValue = $state(new Date());
	let endDateValue = $state(addDays(new Date(), 30));
	let isIndefinite = $state(true);
	let selectedIcon = $state('');

	function changeType(arg: string) {
		type = arg;
	}

	function changeInterval(arg: string) {
		interval = arg;
	}

	function selectDay(arg: number) {
		if (selectedDays.includes(arg)) {
			const removeDay = selectedDays.filter((item) => item !== arg);
			selectedDays = removeDay;
		} else {
			selectedDays = [...selectedDays, arg];
		}
	}

	function selectIcon(arg: string) {
		selectedIcon = arg;
	}

	function isBuild(arg: string | number[], type: string) {
		const result = '' + (type === 'BUILD' ? arg : '');
		return result;
	}
	function isBuild2(arg: number[], type: string) {
		const result = type === 'BUILD' ? arg : [];
		return result;
	}

	async function updateHistory(id: string) {
		try {
			await TrackerRequest.updateHistory({
				trackerId: id,
				text: 'You started this streak for the first time',
				status: HabitStatus.START,
				date: TrackerUtils.getISODate(new Date())
			});
		} catch (error: any) {
			addToast(error?.message || 'An error occured', 'error');
		}
	}

	async function handleSubmit(e: any) {
		e.preventDefault();

		try {
			isSubmitting = true;

			const payload = {
				name: habitName,
				type,
				interval: isBuild(interval, type),
				startDate: startDateValue,
				endDate: endDateValue,
				unitMeasurement: isBuild(unitMeasurement, type),
				goalValue: isBuild(goalValue, type),
				isIndefinite: isIndefinite ? true : false,
				selectedDays: isBuild2(
					selectedDays?.map((item) => item),
					type
				),
				isActive: true,
				ownerId: user?._id,
				description,
				icon: selectedIcon
			};

			Helpers.removeEmptyFields(payload);
			const result = await TrackerRequest.createHabit(payload);

			if (result) {
				if (type === 'QUIT') {
					updateHistory(result?.data?._id);
				}
				addToast('Habit created', 'success', { imgLink: '/images/confetti.svg' });
				goto('/tracker');
			}
		} catch (error: any) {
			addToast(error?.message, 'error');
		} finally {
			isSubmitting = false;
		}
	}
</script>

<div>
	<div class="mx-auto w-full md:max-w-[600px]">
		<BackComponent backLink="/tracker" />
	</div>

	<div class="mt-4 flex items-center justify-center px-4 pb-52">
		<div class="login_form_wrapper w-full md:max-w-[600px]">
			<form class="login_form h-full rounded-3xl border-2 bg-white" onsubmit={handleSubmit}>
				<div class="pb-3">
					<p class="font-suez text-2xl">Create Habit</p>
				</div>

				<hr />

				<div class="mb-10 space-y-4 pt-5">
					<div>
						<label for="habitName" class="mb-2">Type</label>

						<div class="flex items-center gap-4">
							<button
								class:bg-brand-build={type === 'BUILD'}
								class="button_active h-[35px] rounded-lg border px-4 text-sm"
								onclick={() => changeType('BUILD')}
								type="button"
							>
								Build
							</button>
							<button
								class:bg-brand-quit={type === 'QUIT'}
								class="button_active h-[35px] rounded-lg border px-4 text-sm"
								onclick={() => changeType('QUIT')}
								type="button"
							>
								Quit
							</button>
						</div>
					</div>

					<BasicInputField
						label="Name"
						bind:value={habitName}
						type="text"
						id="habitName"
						name="habitName"
						required
					/>

					<TextArea
						label="Description"
						type="text"
						id="description"
						name="description"
						bind:value={description}
					/>

					{#if type === 'BUILD'}
						<div>
							<label for="unitM" class="mb-2">Interval</label>
							<div class="flex items-center gap-4">
								<button
									class:bg-brand-lime={interval === 'DAILY'}
									class="button_active h-[35px] rounded-lg border px-4 text-sm"
									onclick={() => changeInterval('DAILY')}
									type="button"
								>
									Daily
								</button>
								<button
									class:bg-brand-lime={interval === 'WEEKLY'}
									class="button_active h-[35px] rounded-lg border px-4 text-sm"
									onclick={() => changeInterval('WEEKLY')}
									type="button"
								>
									Weekly
								</button>
								<button
									class:bg-brand-lime={interval === 'MONTHLY'}
									class="button_active h-[35px] rounded-lg border px-4 text-sm"
									onclick={() => changeInterval('MONTHLY')}
									type="button"
								>
									Monthly
								</button>
							</div>
						</div>

						<BasicInputField
							label="Unit measurement"
							type="text"
							id="unitMeasurement"
							name="unitMeasurement"
							bind:value={unitMeasurement}
							placeholder="Kg, Steps, Min"
						/>
						<BasicInputField
							label="Goal value"
							type="text"
							id="goalValue"
							name="goalValue"
							bind:value={goalValue}
						/>

						<div>
							<div class="flex flex-wrap items-center gap-4">
								{#each daysOfWeek as day, index (index)}
									{@const isSelected = selectedDays.includes(day.id)}
									<button
										class:bg-brand-lime={isSelected}
										class="button_active h-[35px] rounded-lg border px-4 text-sm capitalize"
										onclick={() => selectDay(day.id)}
										type="button"
									>
										{day.value}
									</button>
								{/each}
							</div>
						</div>
					{/if}

					<div class="flex items-center gap-4">
						<div class="w-1/2">
							<DatePickerDropdown bind:dateValue={startDateValue} label="Start date" />
						</div>

						{#if !isIndefinite}
							<div class="w-1/2">
								<DatePickerDropdown bind:dateValue={endDateValue} label="End date" />
							</div>
						{/if}

						{#if isIndefinite}
							<div class="w-1/2">
								<label for="habitName" class="mb-2">No end date</label>

								<div class="h-[50px]">
									<button
										class="button_active relative flex h-7 w-7 items-center justify-center rounded-md border p-0"
										onclick={() => (isIndefinite = !isIndefinite)}
									>
										<Check size="22px" />
									</button>
								</div>
							</div>
						{/if}
					</div>

					<div>
						{#if !isIndefinite}
							<div class="w-1/2">
								<label for="habitName" class="mb-2">No end date</label>

								<div class="h-[50px]">
									<button
										class="button_active relative flex h-7 w-7 items-center justify-center rounded-md border p-0"
										onclick={() => (isIndefinite = !isIndefinite)}
									>
										{#if isIndefinite}
											<Check size="22px" />
										{/if}
									</button>
								</div>
							</div>
						{/if}
					</div>

					<div>
						<label for="habitName" class="mb-2"> Icons</label>
						<div class="flex flex-wrap gap-3">
							{#each iconsList as icon, index (index)}
								<div>
									<Tooltip text={icon.tooltipText} position="bottom">
										<button
											onclick={() => selectIcon(icon.img)}
											class="button_active flex h-11 w-11 items-center justify-center rounded-full border-black"
											type="button"
											class:border={selectedIcon === icon.img}
										>
											<img src={icon.img} class="h-6 min-w-9" alt="walk icon" />
										</button>
									</Tooltip>
								</div>
							{/each}
						</div>
					</div>
				</div>

				<div>
					<BasicButton isLoading={isSubmitting} label="Save" type="submit" />
				</div>
			</form>
		</div>
	</div>
</div>
