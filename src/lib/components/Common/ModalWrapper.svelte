<script lang="ts">
	// @ts-nocheck
	import Helpers from '$lib/utils/helpers';
	import { X } from '@lucide/svelte';
	import type { Snippet } from 'svelte';

	type ModalProps = {
		onClose: () => void;
		isOpen: () => void;
		children: Snippet;
		maxWidth?: string;
		height?: string;
		label?: string;
		LabelComponent?: Component<$$ComponentProps, {}, ''>;
	};

	let {
		onClose,
		isOpen,
		children,
		maxWidth = 'max-w-[500px]',
		height = 'h-auto',
		label,
		LabelComponent
	}: ModalProps = $props();

	let innerHeight = $derived(typeof window !== 'undefined' ? window.innerHeight : 0);

	if (typeof window !== 'undefined') {
		window.addEventListener('resize', () => {
			innerHeight = window.innerHeight;
		});
	}
</script>

{#if isOpen}
	<div
		class="fixed top-0 left-0 z-[99] w-full overflow-y-auto bg-[#0000009e]"
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
				class={`slide_in_up no-scrollbar relative my-8 h-full w-screen overflow-x-hidden overflow-y-auto rounded-2xl border-1 bg-white  ${maxWidth}`}
				style="min-height: {height}; max-height: {height}"
				use:Helpers.clickOutside
				onclick_outside={onClose}
			>
				<div
					class="sticky top-0 right-4 z-50 flex w-full items-center justify-between rounded-2xl bg-white px-4 py-4"
				>
					<div>
						{#if label}
							<p class="font-lexend text-lg sm:text-xl">
								{label}
							</p>
						{:else if LabelComponent}
							<LabelComponent />
						{/if}
					</div>

					<div>
						<button class="shadow_button close_btn" onclick={onClose}>
							<X size="20px" />
						</button>
					</div>
				</div>

				<div class="relative z-10">
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
