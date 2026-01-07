<script lang="ts">
	import Image from '../Common/Image.svelte';

	type Props = {
		isReverse?: boolean;
		title?: string;
		featuresList?: string[];
		ListIcon?: any;
		imageUrl: string;
		feature?: string;
	};

	let { title = '', featuresList, isReverse, imageUrl, ListIcon, feature }: Props = $props();
</script>

<div
	class="font-lexend mx-auto max-w-[500px] items-center gap-8 lg:flex lg:max-w-full"
	class:rr={isReverse}
>
	<div class="mb-6 w-full lg:mb-0 lg:w-1/2">
		<div class="p-5 sm:p-8">
			<h3 class="text-2xl font-semibold md:text-3xl lg:text-4xl">{title}</h3>

			<div class="mt-6 space-y-6 md:mt-8 md:space-y-8">
				{#if featuresList?.length}
					{#each featuresList as feature, index (index)}
						<div class="flex items-center gap-2">
							<div class="flex aspect-square w-5 items-center justify-center">
								<ListIcon />
							</div>

							<div>
								<p class="font-lexend text-sm font-light lg:text-base">
									{feature}
								</p>
							</div>
						</div>
					{/each}
				{/if}

				<div>
					<div class="w-[160px]">
						<a href="/signup">
							<button class="shadow_button shadow_button_thin shadow_button_sm" type="button">
								Try it for free
							</button>
						</a>
					</div>
				</div>
			</div>
		</div>
	</div>

	<div class="w-full lg:w-1/2">
		<div
			class="feature_img_wrapper mx-auto h-[350px] w-full md:h-[600px] md:max-w-4xl lg:h-[550px] {feature} "
		>
			<div class="feature_img_inner bg-brand-light h-full overflow-hidden rounded-3xl border-2 p-4">
				<Image src={imageUrl} alt={title} />
			</div>
		</div>
	</div>
</div>

<style>
	.rr {
		flex-direction: row-reverse;
	}

	.feature_img_wrapper {
		position: relative;
	}

	.feature_img_wrapper::before {
		content: '';
		position: absolute;
		top: 6px;
		left: 6px;
		border: 2px solid black;
		width: 100%;
		height: 100%;
		z-index: 1;
		border-radius: 24px;
	}

	.feature_img_inner {
		position: relative;
		z-index: 2;
		border-radius: 24px;
		padding: 20px;
	}

	.tracker::before {
		background-color: #db7760;
	}
	.shopping::before {
		background-color: #ffa673;
	}
	.recipe::before {
		background-color: #cfc4e7;
	}
	.trip::before {
		background-color: #ff9a9a;
	}
	.expense::before {
		background-color: #ff9a9a;
	}
</style>
