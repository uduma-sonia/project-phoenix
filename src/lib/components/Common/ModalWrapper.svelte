<script lang="ts">
	import { X } from '@lucide/svelte';

	let { onClose, isOpen, children } = $props();

	let innerHeight = $state(typeof window !== 'undefined' ? window.innerHeight : 0);

	if (typeof window !== 'undefined') {
		window.addEventListener('resize', () => {
			innerHeight = window.innerHeight;
		});
	}
</script>

{#if isOpen}
	<div
		class="fixed top-0 left-0 z-[99] w-full overflow-y-auto bg-[#00000070]"
		style="height: {innerHeight}px;"
		onclick={onClose}
		onkeydown={onClose}
		tabindex="0"
		aria-label="close modal"
		role="button"
	></div>
	<div
		class="no-scrollbar fixed top-0 left-1/2 z-[9999] w-fit -translate-x-1/2 overflow-y-auto"
		style="height: {innerHeight}px;"
	>
		<div class="mx-4 flex min-h-full items-center justify-center">
			<div
				class="slide_in_up relative my-8 w-screen max-w-[500px] rounded-lg border-2 bg-white p-4 opacity-0"
			>
				<div class="absolute top-4 right-4 flex justify-end">
					<button class="shadow_button close_btn" onclick={onClose}>
						<X size="20px" />
					</button>
				</div>

				<div>
					{@render children()}
				</div>
			</div>
		</div>
	</div>
{/if}

<style>
	.close_btn {
		border-radius: 999px !important;
		padding: 0px !important;
		width: 30px;
		height: 30px;
		display: flex;
		align-items: center;
		justify-content: center;
		box-shadow: 2px 2px black !important;
	}
</style>
