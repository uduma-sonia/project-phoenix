<script lang="ts">
	import { closeImageCarouselModal, imageCarouselData, modalsState } from '$lib/state/modal.svelte';
	import ModalWrapper from '../Common/ModalWrapper.svelte';
	import { Play } from '@lucide/svelte';
	import Image from '../Common/Image.svelte';

	let activeIndex = $state(0);

	function gotoNext() {
		if (activeIndex < imageCarouselData.images.length - 1) {
			activeIndex++;
		}
	}

	function gotoPrev() {
		if (activeIndex > 0) {
			activeIndex--;
		}
	}
</script>

<ModalWrapper
	isOpen={modalsState.data.isOpenImageCarousel}
	maxWidth="max-w-[800px]"
	onClose={closeImageCarouselModal}
>
	<div class="p-4">
		<div class="item_wrapper w-full">
			<div class="item_wrapper_inner">
				{#key activeIndex}
					<Image
						src={imageCarouselData.images[activeIndex]}
						className="h-auto max-h-full w-auto max-w-full"
					/>
				{/key}
			</div>
		</div>

		<div class="mt-6 flex items-center justify-center gap-5">
			<div>
				<button class="shadow_button shadow_button_sm" style="height: 40px" onclick={gotoPrev}>
					<span class="block rotate-180">
						<Play />
					</span>
				</button>
			</div>

			<div>
				<p>
					{activeIndex + 1}
					/
					{imageCarouselData.images.length}
				</p>
			</div>

			<div>
				<button onclick={gotoNext} class="shadow_button shadow_button_sm" style="height: 40px">
					<Play />
				</button>
			</div>
		</div>
	</div>
</ModalWrapper>

<style>
	.item_wrapper {
		position: relative;
		border-radius: 8px;
		transition: all 0.4s linear;
	}

	.item_wrapper::before {
		content: '';
		position: absolute;
		top: 1px;
		left: 1px;
		right: 0;
		bottom: 0;
		background-color: black;
		border: 2px solid black;
		z-index: 1;
		border-radius: 8px;
		width: 100%;
		height: 100%;
	}

	.item_wrapper_inner {
		position: relative;
		z-index: 10;
		display: flex;
		height: 400px;
		align-items: center;
		justify-content: center;
		border-radius: 8px;
		border: 2px solid black;
		background-color: #ffffff;
	}
</style>
