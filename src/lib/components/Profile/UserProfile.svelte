<script lang="ts">
	import { UserRequest } from '$lib/requests';
	import { addToast } from '$lib/store/toast';
	import { queryKeys } from '$lib/utils/queryKeys';
	import Avatar from '../Common/Avatar.svelte';
	import { useQueryClient } from '@tanstack/svelte-query';
	import BasicInputField from '../Common/Form/BasicInputField.svelte';
	import Dropdown from '../Common/Form/Dropdown.svelte';
	import { currencies } from '$lib/constants/currency';
	import Helpers from '$lib/utils/helpers';

	let { user } = $props();

	let username = $derived(user?.username);
	let email = $derived(user?.email);
	let firstName = $derived(user?.firstName);
	let lastName = $derived(user?.lastName);
	let isLoading = $state(false);
	const queryClient = useQueryClient();

	let getCurrency: any = $derived(
		Helpers.transformObjectToList(currencies[0])?.find((item) => item.id === user?.currency)
	);
	let selectedCurrency = $derived({
		value: getCurrency?.details?.name,
		id: getCurrency?.id
	});

	async function onSubmit() {
		try {
			isLoading = true;

			const result = await UserRequest.updateUser(user?._id, {
				username,
				email,
				currency: selectedCurrency.id,
				firstName,
				lastName
			});

			if (result) {
				addToast('Profile updated', 'success');
				queryClient.invalidateQueries({ queryKey: queryKeys.getCurrentUser });
			}
		} catch (error: any) {
			addToast(error?.message || 'An error occured', 'error');
		} finally {
			isLoading = false;
		}
	}

	let currencyOptions = $derived(
		Helpers.transformObjectToList(currencies[0])?.map((item: any) => {
			return {
				value: item?.details.name,
				id: item?.details.code
			};
		})
	);
</script>

<div>
	<p class="mb-4 text-lg">Profile</p>

	<div>
		<Avatar src={user?.avatar} />
		<div class="mt-7 mb-6 space-y-4">
			<div class="grid grid-cols-1 gap-2 sm:grid-cols-2">
				<BasicInputField
					label="First Name"
					bind:value={firstName}
					type="text"
					id="firstName"
					name="firstName"
				/>
				<BasicInputField
					label="Last Name"
					bind:value={lastName}
					type="text"
					id="lastName"
					name="lastName"
				/>
			</div>
			<BasicInputField
				label="Username"
				bind:value={username}
				type="email"
				id="email"
				name="email"
				required
				autocomplete="email"
			/>
			<BasicInputField
				label="Email"
				bind:value={email}
				type="email"
				id="email"
				name="email"
				required
				autocomplete="email"
			/>

			{#if currencyOptions?.length}
				<Dropdown
					label="Currency"
					placeholder="Select currency"
					options={currencyOptions}
					bind:selectedOption={selectedCurrency}
					shouldSearch={true}
					withClearButton={true}
				/>
			{/if}
		</div>

		<div>
			<button class="shadow_button" type="submit" onclick={onSubmit}>
				{#if isLoading}
					<div class="spinner_white border-2 border-black"></div>
				{:else}
					Continue
				{/if}
			</button>
		</div>
	</div>
</div>
