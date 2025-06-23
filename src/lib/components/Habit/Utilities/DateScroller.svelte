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

<div class="my-4">
	<div class="flex items-center gap-3 overflow-hidden">
		<div>
			<button class="shadow_button" onclick={handleScrollLeft}>
				<span class="block rotate-180">
					<Play />
				</span>
			</button>
		</div>

		<div
			bind:this={middle_container}
			class="middle_container no-scrollbar flex max-w-[83.5%] flex-1 flex-nowrap items-center gap-4 overflow-x-auto"
		>
			<div class="min-w-[110px]">
				<button
					class="bg-brand-lime font-lexend button_active h-[50px] w-[110px] rounded-lg border-2 border-black font-normal"
				>
					Today
				</button>
			</div>
			{#each [...new Array(30)] as item}
				<div class="min-w-[110px]">
					<button
						class="bg-brand-rose font-lexend button_active h-[50px] w-[110px] rounded-lg border-2 border-black font-light"
					>
						23 Jun
					</button>
				</div>
			{/each}
		</div>

		<div>
			<button class="shadow_button" onclick={handleScrollRight}>
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
