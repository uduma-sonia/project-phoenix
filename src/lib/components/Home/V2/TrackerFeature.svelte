<script lang="ts">
	import { Sprout } from '@lucide/svelte';
	import Image from '../../Common/Image.svelte';

	const features = [
		'Straightfoward habit tracker without the distracting bits',
		'Build streaks and visualize progress with minimal setup',
		'Progress charts and monthly/yearly trends',
		'Streak history to keep momentum'
	];
</script>

<div class="mx-auto max-w-[500px] pt-20 lg:max-w-full lg:pt-40">
	<div class="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-14">
		<div class="">
			<h3 class="font-crete text-left text-2xl font-semibold md:text-3xl lg:text-4xl">
				Build better habits and <br /> track your progress
			</h3>

			<div class="mt-12">
				<div
					class="feature_img_wrapper mx-auto h-[300px] w-full md:h-[500px] md:max-w-4xl lg:h-[550px]"
				>
					<div
						class="feature_img_inner h-full overflow-hidden rounded-3xl border-2 bg-[#0000009e] p-4"
					>
						<Image
							src={'/images/tracker_img.jpg'}
							alt={'Expense tracker dashboard showing transactions'}
						/>
					</div>
				</div>
			</div>
		</div>

		<div class="flex items-center lg:mt-0">
			<div class="space-y-6">
				{#each features as item, index (index)}
					<div class="flex items-center gap-2">
						<div class="flex aspect-square w-5 items-center justify-center">
							<Sprout />
						</div>

						<div>
							<p class="font-lexend text-sm font-light lg:text-base">
								{item}
							</p>
						</div>
					</div>
				{/each}
			</div>
		</div>
	</div>
</div>

<style>
	.feature_img_wrapper {
		position: relative;
	}

	.feature_img_wrapper::before {
		content: '';
		position: absolute;
		top: 6px;
		left: 6px;
		/* border: 2px solid black; */
		width: 100%;
		height: 100%;
		background-color: #f5ecd5;

		z-index: 1;
		border-radius: 24px;
	}

	.feature_img_inner {
		position: relative;
		z-index: 2;
		border-radius: 24px;
		padding: 10px;
	}
</style>
