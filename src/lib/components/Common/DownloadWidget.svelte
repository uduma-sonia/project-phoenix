<script lang="ts">
	import { openInstallModal } from '$lib/state/modal.svelte';
	import { X } from '@lucide/svelte';

	let { closeDownloadWidget } = $props();
</script>

<div class="slide_in_down_dw fixed top-0 right-0 z-[999] w-[300px] p-4">
	<div class="retro_wrapper slide_in_down">
		<div class="retro_wrapper_inner retro_wrapper_inner_dw">
			<div class="absolute -top-2 -left-2">
				<button
					class="flex h-5 w-5 items-center justify-center rounded-full border-2 bg-white"
					onclick={closeDownloadWidget}
				>
					<X />
				</button>
			</div>

			<div class="flex items-center justify-between gap-3">
				<div>
					<div>
						<a href="/" class="flex items-center gap-1">
							<div>
								<img
									src="/images/laniva_logo_rounded_transparent.png"
									class="aspect-square w-4"
									alt="laniva logo"
								/>
							</div>

							<h1 class="font-dela-gothic-one text-sm">Laniva</h1>
						</a>
					</div>

					<p class="font-lexend mt-1 text-xs font-light">Install the Laniva app, easy!</p>
				</div>

				<div>
					<button
						class="pt-1"
						onclick={() => {
							closeDownloadWidget();
							openInstallModal();
						}}
					>
						<img src="/images/icons/download.svg" class="w-7" alt="Download icon" />
					</button>
				</div>
			</div>
		</div>
	</div>
</div>

<style lang="postcss">
	.retro_wrapper_inner_dw {
		padding: 10px !important;
	}

	.slide_in_down_dw {
		animation-name: slideInDownDW;
		animation-duration: 1s;
		animation-fill-mode: forwards;
	}

	@keyframes slideInDownDW {
		0% {
			transform: translateY(-150px);
		}

		100% {
			transform: translateY(0%);
		}
	}
</style>
