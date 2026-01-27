<script lang="ts">
	import { daysOfWeek, iconsList } from '$lib/constants/tracker';
	import { addToast } from '$lib/store/toast';
	import Helpers from '$lib/utils/helpers';
	import { TrackerRequest } from '$lib/requests';
	import { Check } from '@lucide/svelte';
	import { goto } from '$app/navigation';
	import BackComponent from '../Common/BackComponent.svelte';
	import type { Habit } from '../../../types/tracker';
	import type { User } from '../../../types/user';
	import { page } from '$app/state';
	import { useQueryClient } from '@tanstack/svelte-query';
	import { queryKeys } from '$lib/utils/queryKeys';
	import Tooltip from '../Common/Tooltip.svelte';
	import BasicInputField from '../Common/Form/BasicInputField.svelte';
	import TextArea from '../Common/Form/TextArea.svelte';
	import BasicButton from '../Common/Form/BasicButton.svelte';
	import DatePicker from '../Common/Form/DatePickerDropdown.svelte';

	let { user, tracker }: { tracker: Habit; user: User } = $props();

	const queryClient = useQueryClient();

	let isSubmitting = $state(false);
	let type = $state(tracker?.type);
	let interval = $state(tracker?.interval);
	let habitName = $state(tracker?.name);
	let unitMeasurement = $state(tracker?.unitMeasurement);
	let description = $state(tracker?.description);
	let goalValue = $state(tracker?.goalValue);
	let selectedDays: number[] = $state(tracker?.selectedDays);
	let startDateValue = $state(tracker?.startDate);
	let endDateValue = $state(tracker?.endDate);
	let isIndefinite = $state(true);
	let selectedIcon = $state(tracker?.icon);

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

	async function handleSubmit(e: any) {
		e.preventDefault();

		try {
			isSubmitting = true;

			const payload = {
				name: habitName,
				type,
				interval: isBuild(interval, type) as string,
				startDate: startDateValue,
				endDate: endDateValue,
				unitMeasurement: isBuild(unitMeasurement, type) as string,
				goalValue: isBuild(goalValue, type) as string,
				isIndefinite: isIndefinite ? true : false,
				selectedDays: isBuild2(
					selectedDays?.map((item) => item),
					type
				),
				isActive: true,
				ownerId: user?._id || '',
				description,
				icon: selectedIcon
			};

			Helpers.removeEmptyFields(payload);
			const result = await TrackerRequest.updateHabit(page.params.id, payload);

			if (result) {
				addToast('Habit updated', 'success', { imgLink: '/images/confetti.svg' });
				queryClient.invalidateQueries({ queryKey: queryKeys.getSingleHabit(page.params.id) });
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
	<div class="mx-auto w-full md:max-w-[500px]">
		<BackComponent backLink="/tracker" />
	</div>

	<div class="mt-4 flex items-center justify-center px-4 pb-52">
		<div class="login_form_wrapper w-full md:max-w-[500px]">
			<form class="login_form h-full rounded-3xl border-2 bg-white" onsubmit={handleSubmit}>
				<div class="pb-3">
					<p class="font-suez text-2xl">Edit Habit</p>
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
							<DatePicker bind:dateValue={startDateValue} label="Start date" />
						</div>

						{#if !isIndefinite}
							<div class="w-1/2">
								<DatePicker bind:dateValue={endDateValue} label="End date" />
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
