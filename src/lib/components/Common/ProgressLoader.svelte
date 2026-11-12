<script lang="ts">
	import { onDestroy, onMount } from 'svelte';

	let {
		isLoading = false,
		error,
		errorText = 'Something went wrong, please try again',
		heading = 'Oh no!',
		isEmpty
	}: {
		isLoading?: boolean;
		isEmpty?: boolean;
		error?: any;
		errorText?: string;
		heading?: string;
	} = $props();

	let countdownInterval: any;
	let progress: number = $state(0);

	function goToNext() {
		if (!isLoading) {
			progress = 100;
			clearInterval(countdownInterval);
		} else {
			if (progress >= 90) {
				progress = 90;
			} else {
				progress = progress + 5;
			}
		}
	}

	onMount(() => {
		if (!isEmpty) {
			if (isLoading) {
				countdownInterval = setInterval(goToNext, 150);
			} else {
				progress = 100;
				if (countdownInterval) {
					clearInterval(countdownInterval);
				}
			}
		}
	});

	onDestroy(() => {
		clearInterval(countdownInterval);
	});
</script>

{#if isEmpty}
	<div class="flex flex-col items-center justify-center py-6">
		<img src="/images/empty-box.svg" alt="sad emoji" class="w-9" />
		<p class="font-lexend text-13 text-center font-normal">No data yet</p>
	</div>
{:else}
	{#if isLoading}
		<div class="flex items-center justify-center py-6">
			<div
				class="retro_block relative flex h-7 w-40 items-center justify-center overflow-hidden rounded-lg border-2"
			>
				<div
					class="bg-primary-olive-600 absolute left-0 z-20 h-full w-1/2"
					style="width: {progress}%;transition: all 0.4s linear; "
				></div>
				<p class="font-lexend-deca relative z-40 text-sm">
					{progress}%
				</p>
			</div>
		</div>
	{/if}

	{#if !isLoading && error}
		<div class="flex flex-col items-center justify-center">
			<img src="/images/sad-emoji.svg" alt="sad emoji" class="w-9" />
			<p class="font-lexend text-13 text-center font-light">
				<span class="font-semibold text-red-600">
					{heading}
				</span>

				<br />

				{errorText}
			</p>
		</div>
	{/if}
{/if}
