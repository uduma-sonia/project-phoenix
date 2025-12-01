<script lang="ts">
	import { closeLogValueModal, modalsState } from '$lib/state/modal.svelte';
	import { trackerState } from '$lib/state/tracker.svelte';
	import { Minus, Plus } from '@lucide/svelte';
	import ModalWrapper from '../Common/ModalWrapper.svelte';
	import BasicInputField from '../Common/Form/BasicInputField.svelte';
	import { HabitStatus } from '../../../types/tracker';

	let { updateBuildLog } = $props();

	let details = $derived(trackerState.data.trackerDetails);
	let logValue: any = $derived(details?.logDetails?.value || 0);
	let debounceTimer: any = $state();
	let habitType = $derived(details?.logDetails?._id ? 'update' : 'create');

	function increaseValue() {
		let goalValue = Number(details?.goalValue);

		if (goalValue) {
			if (logValue + 1 <= goalValue) {
				logValue = logValue + 1;
			}
		}

		clearTimeout(debounceTimer);

		debounceTimer = setTimeout(() => {
			if (details?.goalValue) {
				const _status =
					logValue >= Number(details.goalValue) ? HabitStatus.COMPLETED : HabitStatus.PENDING;
				const _value = _status === HabitStatus.COMPLETED ? Number(details.goalValue) : logValue;

				updateBuildLog({
					tracker: details,
					status: _status,
					type: habitType,
					log: details?.logDetails,
					value: _value
				});
			}
		}, 500);
	}

	function decreaseValue() {
		if (logValue - 1 >= 0) {
			logValue = logValue - 1;

			clearTimeout(debounceTimer);

			debounceTimer = setTimeout(() => {
				const _status = HabitStatus.PENDING;

				updateBuildLog({
					tracker: details,
					status: _status,
					type: habitType,
					log: details?.logDetails,

					value: logValue
				});
			}, 500);
		}
	}

	function handleOnBlur() {
		if (details?.goalValue) {
			const _status =
				logValue >= Number(details.goalValue) ? HabitStatus.COMPLETED : HabitStatus.PENDING;
			const _value = _status === HabitStatus.COMPLETED ? Number(details.goalValue) : logValue;

			updateBuildLog({
				tracker: details,
				status: _status,
				type: habitType,
				log: details?.logDetails,
				value: _value
			});
		}
	}
</script>

<ModalWrapper
	onClose={closeLogValueModal}
	isOpen={modalsState.data.isOpenLogValueModal}
	maxWidth="max-w-[500px]"
	label="Add Log"
>
	<div class="p-4 pb-10">
		<div class="mx-auto w-[200px] space-y-6">
			<div class="flex items-center gap-2">
				<div class="w-full">
					<BasicInputField
						onblur={handleOnBlur}
						bind:value={logValue}
						id="logValue"
						type="number"
						placeholder="0"
					/>
				</div>
			</div>

			<div class="flex items-center justify-between">
				<div class="w-fit">
					<button
						class="button_active flex h-7 w-7 items-center justify-center rounded-full bg-black font-normal"
						onclick={decreaseValue}
					>
						<Minus size="16px" color="#FFFFFF" />
					</button>
				</div>

				<div>
					<p class="font-lexend flex text-sm">
						{logValue} /
						{details?.goalValue}
						{details?.unitMeasurement}
					</p>
				</div>

				<div class="w-fit">
					<button
						class="button_active flex h-7 w-7 items-center justify-center rounded-full bg-black font-normal"
						onclick={increaseValue}
						disabled={Number(logValue) === Number(details?.goalValue)}
					>
						<Plus size="16px" color="#FFFFFF" />
					</button>
				</div>
			</div>
		</div>
	</div>
</ModalWrapper>
