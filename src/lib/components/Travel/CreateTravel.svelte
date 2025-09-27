<script lang="ts">
	import BackComponent from '../Common/BackComponent.svelte';
	import BasicInputField from '../Common/BasicInputField.svelte';
	import { Country, City } from 'country-state-city';
	import Dropdown from '../Common/Dropdown.svelte';
	import { addToast } from '$lib/store/toast';

	let isLoading = $state(false);

	let name = $state('');
	let address = $state('');
	let hotelName = $state('');
	let currency = $state('');
	let numberOfPersons = $state('');
	let budget = $state('');
	let selectedCountry = $state({ value: '', id: '' });
	let selectedCity = $state(null);

	let countryOptions = $derived(
		Country.getAllCountries()?.map((item) => ({ value: item.name, id: item.isoCode }))
	);
	let citiesOptions = $derived(
		City.getCitiesOfCountry(selectedCountry?.id)?.map((item) => ({
			value: item.name,
			id: item.stateCode
		}))
	);

	function handleSubmit() {
		try {
			isLoading = true;
		} catch (error: any) {
			addToast(error?.message || 'An error occured', 'error');
		} finally {
			isLoading = false;
		}
	}
</script>

<div>
	<div class="mx-auto w-full px-4 md:max-w-[500px]">
		<BackComponent backLink="/travel" />
	</div>

	<div class="mt-4 flex items-center justify-center px-4 pb-52">
		<div class="login_form_wrapper w-full md:max-w-[500px]">
			<form class="login_form h-full rounded-3xl border-2 bg-white">
				<div class="pb-3">
					<p class="font-suez text-2xl">Create Trip</p>
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
					<BasicInputField label="Address" bind:value={address} id="address" name="address" />
					<BasicInputField
						label="Hotel name"
						bind:value={hotelName}
						id="hotelName"
						name="hotelName"
					/>
					<BasicInputField label="Currency" bind:value={currency} id="currency" name="currency" />
					<BasicInputField label="Budget" bind:value={budget} id="budget" name="budget" />
					<BasicInputField
						label="Number Of Persons"
						bind:value={numberOfPersons}
						id="numberOfPersons"
						name="numberOfPersons"
						type="number"
					/>

					<Dropdown
						label="Country"
						options={countryOptions}
						bind:selectedOption={selectedCountry}
					/>

					{#if citiesOptions}
						<Dropdown label="City" options={citiesOptions} bind:selectedOption={selectedCity} />
					{/if}
				</div>

				<div>
					<button class="shadow_button" type="submit">
						{#if isLoading}
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
