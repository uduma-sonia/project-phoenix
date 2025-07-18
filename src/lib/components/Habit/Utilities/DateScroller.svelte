<script lang="ts">
	import { Play } from '@lucide/svelte';

	let middle_container: any;

	const handleScrollLeft = () => {
		middle_container.scrollLeft -= 200;
	};
	const handleScrollRight = () => {
		middle_container.scrollLeft += 200;
	};
</script>

<div class="my-4 px-3">
	<div class="flex items-center gap-3 overflow-hidden py-1 pr-1">
		<div>
			<button class="shadow_button shadow_button_sm" onclick={handleScrollLeft}>
				<span class="block rotate-180">
					<Play />
				</span>
			</button>
		</div>

		<div
			bind:this={middle_container}
			class="middle_container no-scrollbar flex max-w-[83.5%] flex-1 flex-nowrap items-center gap-3 overflow-x-auto sm:gap-4"
		>
			<div class="min-w-[90px] sm:min-w-[110px]">
				<button
					class="bg-brand-lime font-lexend button_active h-[50px] w-full rounded-lg border-2 border-black text-sm font-normal sm:text-base"
				>
					Today
				</button>
			</div>
			{#each [...new Array(30)] as _, index (index)}
				<div class="min-w-[90px] sm:min-w-[110px]">
					<button
						class="bg-brand-rose font-lexend button_active h-[50px] w-full rounded-lg border-2 border-black text-sm font-normal sm:text-base"
					>
						23 Jun
					</button>
				</div>
			{/each}
		</div>

		<div>
			<button class="shadow_button shadow_button_sm" onclick={handleScrollRight}>
				<Play />
			</button>
		</div>
	</div>
</div>

<style>
	.middle_container {
		transition: all 0.3s linear;
		scroll-behavior: smooth;
	}
</style>
