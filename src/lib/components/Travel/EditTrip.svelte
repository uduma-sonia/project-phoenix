<script lang="ts">
	import BackComponent from '../Common/BackComponent.svelte';
	import BasicInputField from '../Common/Form/BasicInputField.svelte';
	import { Country, City } from 'country-state-city';
	import Dropdown from '../Common/Form/Dropdown.svelte';
	import { addToast } from '$lib/store/toast';
	import DateRangePicker from '../Common/DatePicker/DateRangePicker.svelte';
	import Helpers from '$lib/utils/helpers';
	import { currencies } from '$lib/constants/currency';
	import { TripRequest } from '$lib/requests';
	import { goto } from '$app/navigation';
	import { useQueryClient } from '@tanstack/svelte-query';
	import { queryKeys } from '$lib/utils/queryKeys';
	import type { Trip } from '../../../types/trip';
	import { page } from '$app/state';
	import BasicButton from '../Common/Form/BasicButton.svelte';

	const queryClient = useQueryClient();
	let { trip }: { trip: Trip } = $props();

	let isLoading = $state(false);

	let name = $state(trip?.name);
	let address = $state(trip?.address);
	let hotelName = $state(trip?.hotelName);
	let numberOfPersons = $state(' ' + trip?.numOfPersons);
	let budget = $state(trip?.budget);
	let selectedCountry = $state({ value: '', id: '' });
	let selectedCity = $state({ value: '', id: '' });
	let selectedCurrency = $state({ value: '', id: '' });

	let dateRange: { start: Date; end: Date } = $state({
		start: new Date(trip?.start),
		end: new Date(trip?.end)
	});

	let countryOptions = $derived(
		Country.getAllCountries()?.map((item) => ({ value: item.name, id: item.isoCode }))
	);
	let citiesOptions = $derived(
		City.getCitiesOfCountry(selectedCountry?.id)?.map((item) => ({
			value: item.name,
			id: item.stateCode
		}))
	);
	let currenciesOptions = $derived(
		Helpers.transformObjectToList(currencies[0])?.map((item: any) => ({
			value: item.id,
			id: item.details.code
		}))
	);

	function getSelectedOption(arr: any[], value?: string) {
		if (!value) return { value: '', id: '' };

		const result = arr.find((item) => item.value === value);
		return result;
	}

	async function handleSubmit(e: any) {
		e.preventDefault();
		try {
			isLoading = true;
			const payload = {
				name: name,
				country: selectedCountry.value,
				city: selectedCity?.value,
				start: dateRange.start,
				end: dateRange.end,
				address: address,
				hotelName: hotelName,
				currency: selectedCurrency.value,
				numOfPersons: Number(numberOfPersons),
				budget: budget
			};

			const result = await TripRequest.updateTrip(page.params.id, payload);

			if (result) {
				queryClient.invalidateQueries({ queryKey: queryKeys.getTrip });
				goto(`/travel/${page.params.id}`);
			}
		} catch (error: any) {
			addToast(error?.message || 'An error occured', 'error');
		} finally {
			isLoading = false;
		}
	}

	$effect(() => {
		if (trip?.country) {
			let _country = getSelectedOption(countryOptions, trip.country);

			if (_country) {
				selectedCountry = _country;
			}
		}
	});

	$effect(() => {
		if (trip?.city) {
			if (citiesOptions) {
				let _city = getSelectedOption(citiesOptions, trip.city);

				if (_city) {
					selectedCity = _city;
				}
			}
		}
	});

	$effect(() => {
		if (trip?.currency) {
			if (currenciesOptions) {
				let _currency = getSelectedOption(currenciesOptions, trip.currency);

				if (_currency) {
					selectedCurrency = _currency;
				}
			}
		}
	});
</script>

<div>
	<div class="mx-auto w-full md:max-w-[500px]">
		<BackComponent backLink="/travel" />
	</div>

	<div class="mt-4 flex items-center justify-center pb-52">
		<div class="login_form_wrapper w-full md:max-w-[500px]">
			<form class="login_form h-full rounded-3xl border-2 bg-white" onsubmit={handleSubmit}>
				<div class="pb-3">
					<p class="font-suez text-2xl">Edit Trip</p>
				</div>

				<hr />

				<div class="mb-10 space-y-4 pt-5">
					<BasicInputField
						label="Trip name"
						required
						bind:value={name}
						id="tripName"
						name="tripName"
					/>

					<Dropdown
						label="Country"
						options={countryOptions}
						bind:selectedOption={selectedCountry}
					/>

					{#if citiesOptions}
						<Dropdown label="City" options={citiesOptions} bind:selectedOption={selectedCity} />
					{/if}

					<BasicInputField label="Address" bind:value={address} id="address" name="address" />
					<BasicInputField
						label="Hotel name"
						bind:value={hotelName}
						id="hotelName"
						name="hotelName"
					/>

					<BasicInputField
						label="Number Of Persons"
						bind:value={numberOfPersons}
						id="numberOfPersons"
						name="numberOfPersons"
						type="number"
					/>

					<BasicInputField
						label="Budget"
						type="number"
						bind:value={budget}
						id="budget"
						name="budget"
					/>

					{#if currenciesOptions}
						<Dropdown
							label="Currency"
							options={currenciesOptions}
							bind:selectedOption={selectedCurrency}
						/>
					{/if}

					<div class="pt-4">
						<div class="rounded-lg border p-4">
							<DateRangePicker bind:range={dateRange} isClickable={true} />
						</div>
					</div>
				</div>

				<div>
					<BasicButton label="Save" type="submit" {isLoading} />
				</div>
			</form>
		</div>
	</div>
</div>
