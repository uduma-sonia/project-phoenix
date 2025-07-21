<script lang="ts">
	import { daysOfWeek, iconsList } from '$lib/constants/tracker';
	import { addToast } from '$lib/store/toast';
	import Helpers from '$lib/utils/helpers';
	import { format, addDays } from 'date-fns';
	import DatePickerMini from '../Common/DatePicker/DatePickerMini.svelte';
	import TopSection from '../Common/TopSection.svelte';
	import { TrackerRequest } from '$lib/requests';

	let { user } = $props();

	let isSubmitting = $state(false);
	let type = $state('BUILD');
	let interval = $state('DAILY');
	let habitName = $state('');
	let unitMeasurement = $state('');
	let description = $state('');
	let goalValue = $state('');
	let selectedDays: number[] = $state([0, 1, 2, 3, 4, 5, 6]);
	let startDateValue = $state(new Date());
	let endDateValue = $state(addDays(new Date(), 30));
	let isStartDateOpen = $state(false);
	let isEndDateOpen = $state(false);
	let icon = $state('');

	const toggleStart = () => {
		isStartDateOpen = !isStartDateOpen;
	};
	const toggleEnd = () => {
		isEndDateOpen = !isEndDateOpen;
	};

	const handleClickOutside = () => {
		isStartDateOpen = false;
		isEndDateOpen = false;
	};

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
		icon = arg;
	}

	async function handleSubmit(e: any) {
		e.preventDefault();
		try {
			isSubmitting = true;

			const payload = {
				name: habitName,
				type,
				interval,
				startDate: startDateValue,
				endDate: endDateValue,
				unitMeasurement,
				goalValue,
				isIndefinite: endDateValue ? false : true,
				selectedDays: selectedDays?.map((item) => item),
				isActive: true,
				ownerId: user?._id,
				description,
				icon
			};

			// const result = await TrackerRequest.createHabit(payload)

			console.log(payload);
		} catch (error: any) {
			addToast(error?.message, 'error');
		} finally {
			isSubmitting = false;
		}
	}

	$effect(() => console.log(user));
</script>

<div>
	<TopSection withName={false} />

	<div class="mt-20 flex items-center justify-center px-4 pb-52">
		<div class="login_form_wrapper w-full md:max-w-[500px]">
			<form class="login_form h-full rounded-3xl border-2 bg-white" onsubmit={handleSubmit}>
				<div class="pb-3">
					<p class="font-suez text-3xl">Create habit</p>
				</div>

				<hr />

				<div class="mb-10 space-y-4 pt-5">
					<div>
						<label for="habitName" class="mb-2">Type</label>

						<div class="flex items-center gap-4">
							<button
								class:bg-brand-build={type === 'BUILD'}
								class="button_active h-[35px] rounded-lg border-2 px-4"
								onclick={() => changeType('BUILD')}
								type="button"
							>
								Build
							</button>
							<button
								class:bg-brand-quit={type === 'QUIT'}
								class="button_active h-[35px] rounded-lg border-2 px-4"
								onclick={() => changeType('QUIT')}
								type="button"
							>
								Quit
							</button>
						</div>
					</div>
					<div>
						<label for="habitName" class="mb-2">Name</label>
						<input
							type="text"
							id="habitName"
							name="habitName"
							bind:value={habitName}
							required
							class="h-[50px] w-full rounded-lg border-2 border-black px-3 outline-none"
						/>
					</div>
					<div>
						<label for="description" class="mb-2">Description</label>
						<input
							type="text"
							id="description"
							name="description"
							bind:value={description}
							class="h-[50px] w-full rounded-lg border-2 border-black px-3 outline-none"
						/>
					</div>
					<div>
						<label for="unitM" class="mb-2">Interval</label>
						<div class="flex items-center gap-4">
							<button
								class:bg-brand-lime={interval === 'DAILY'}
								class="button_active h-[35px] rounded-lg border-2 px-4"
								onclick={() => changeInterval('DAILY')}
								type="button"
							>
								Daily
							</button>
							<button
								class:bg-brand-lime={interval === 'WEEKLY'}
								class="button_active h-[35px] rounded-lg border-2 px-4"
								onclick={() => changeInterval('WEEKLY')}
								type="button"
							>
								Weekly
							</button>
							<button
								class:bg-brand-lime={interval === 'MONTHLY'}
								class="button_active h-[35px] rounded-lg border-2 px-4"
								onclick={() => changeInterval('MONTHLY')}
								type="button"
							>
								Monthly
							</button>
						</div>
					</div>
					<div>
						<label for="unitM" class="mb-2">Unit measurement</label>
						<input
							type="text"
							id="unitMeasurement"
							name="unitMeasurement"
							bind:value={unitMeasurement}
							placeholder="Kg, Steps, Min"
							class="h-[50px] w-full rounded-lg border-2 border-black px-3 outline-none"
						/>
					</div>
					<div>
						<label for="unitM" class="mb-2">Goal value</label>
						<input
							type="text"
							id="goalValue"
							name="goalValue"
							bind:value={goalValue}
							class="h-[50px] w-full rounded-lg border-2 border-black px-3 outline-none"
						/>
					</div>
					<div>
						<div class="flex flex-wrap items-center gap-4">
							{#each daysOfWeek as day, index (index)}
								{@const isSelected = selectedDays.includes(day.id)}
								<button
									class:bg-brand-lime={isSelected}
									class="button_active h-[35px] rounded-lg border-2 px-4"
									onclick={() => selectDay(day.id)}
									type="button"
								>
									{day.value}
								</button>
							{/each}
						</div>
					</div>

					<div class="flex items-center gap-4">
						<div class="w-1/2">
							<label for="habitName" class="mb-2"> Start date</label>

							<div class="relative">
								<button
									class="button_active font-lexend h-[50px] w-full rounded-lg border-2 px-4 text-left text-sm font-light sm:text-base"
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

						<div class="w-1/2">
							<label for="habitName" class="mb-2"> End date</label>

							<div class="relative">
								<button
									class="button_active font-lexend h-[50px] w-full rounded-lg border-2 px-4 text-left text-sm font-light sm:text-base"
									type="button"
									onclick={toggleEnd}
								>
									{format(new Date(endDateValue), 'PPP')}
								</button>

								{#if isEndDateOpen}
									<div
										use:Helpers.clickOutside
										onclick_outside={handleClickOutside}
										class="absolute top-[54px] right-0 z-[9999] gap-4 overflow-hidden rounded-lg bg-white shadow-md"
									>
										<div class="w-[260px] rounded-lg border-2 p-1">
											<DatePickerMini bind:selectedDate={endDateValue} />
										</div>
									</div>
								{/if}
							</div>
						</div>
					</div>

					<div class="flex flex-wrap gap-3">
						{#each iconsList as icon, index (index)}
							<div>
								<button onclick={() => selectIcon(icon)} type="button">
									<img src={icon} class="h-7 min-w-10" alt="walk icon" />
								</button>
							</div>
						{/each}
					</div>
				</div>

				<div>
					<button class="shadow_button" type="submit">
						{#if isSubmitting}
							<div class="spinner_white border-2 border-black"></div>
						{:else}
							Save
						{/if}
					</button>
				</div>
			</form>
		</div>
	</div>
</div>
