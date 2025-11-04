<script lang="ts">
	import { plansList } from '$lib/constants/global';
	import { Play } from '@lucide/svelte';
	import PricingCard from '../Home/PricingCard.svelte';

	let activeIndex = $state(0);

	function gotoNext() {
		if (activeIndex < plansList.length - 1) {
			activeIndex++;
		}
	}

	function gotoPrev() {
		if (activeIndex > 0) {
			activeIndex--;
		}
	}
</script>

<div>
	<p class="mb-4 text-lg">Subscription</p>

	<div class="">
		{#key activeIndex}
			<PricingCard plan={plansList[activeIndex]} />
		{/key}

		<div class="mt-6 flex items-center justify-center gap-5">
			{#if activeIndex > 0}
				<div>
					<button class="shadow_button shadow_button_sm shadow_button_thin" onclick={gotoPrev}>
						<span class="block rotate-180">
							<Play />
						</span>
					</button>
				</div>
			{/if}

			{#if activeIndex < plansList.length - 1}
				<div>
					<button onclick={gotoNext} class="shadow_button shadow_button_sm shadow_button_thin">
						<Play />
					</button>
				</div>
			{/if}
		</div>
	</div>
</div>
