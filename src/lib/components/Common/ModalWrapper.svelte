<!-- <script lang="ts">
	// @ts-nocheck
	import Helpers from '$lib/utils/helpers';
	import { X } from '@lucide/svelte';
	import type { Component, Snippet } from 'svelte';

	type ModalProps = {
		onClose: () => void;
		isOpen: boolean;
		children: Snippet;
		maxWidth?: string;
		height?: string;
		label?: string;
		helperText?: string;
		labelProps?: any;
		LabelComponent?: Component<any, {}, ''>;
	};

	let {
		onClose,
		isOpen,
		children,
		maxWidth = 'max-w-[500px]',
		height = 'h-auto',
		label,
		LabelComponent,
		helperText,
		labelProps = {}
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
		class="fixed top-0 left-0 z-[999] w-full overflow-y-auto bg-[#0000009e]"
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
						{#if LabelComponent}
							<LabelComponent {...labelProps} />
						{/if}
						{#if label}
							<p class="font-lexend text-lg sm:text-xl">
								{label}
							</p>
						{/if}
						{#if helperText}
							<p class="font-lexend text-xs font-light">
								{helperText}
							</p>
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
</style> -->

<script lang="ts">
	// @ts-nocheck
	import Helpers from '$lib/utils/helpers';
	import { X } from '@lucide/svelte';
	import type { Component, Snippet } from 'svelte';
	import { onMount } from 'svelte';

	type ModalProps = {
		onClose: () => void;
		isOpen: boolean;
		children: Snippet;
		maxWidth?: string;
		height?: string;
		label?: string;
		helperText?: string;
		labelProps?: any;
		LabelComponent?: Component<any, {}, ''>;
	};

	let {
		onClose,
		isOpen,
		children,
		maxWidth = 'max-w-[500px]',
		height = 'h-auto',
		label,
		LabelComponent,
		helperText,
		labelProps = {}
	}: ModalProps = $props();

	let innerHeight = $derived(typeof window !== 'undefined' ? window.innerHeight : 0);
	let modalRef: HTMLDivElement = $state();
	let previousActiveElement: HTMLElement | null = $state();

	// Handle escape key
	function handleKeydown(e: KeyboardEvent) {
		if (e.key === 'Escape' && isOpen) {
			onClose();
		}
	}

	// Trap focus within modal
	function handleTabKey(e: KeyboardEvent) {
		if (e.key !== 'Tab' || !modalRef) return;

		const focusableElements = modalRef.querySelectorAll(
			'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
		);
		const firstElement = focusableElements[0] as HTMLElement;
		const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

		if (e.shiftKey && document.activeElement === firstElement) {
			e.preventDefault();
			lastElement?.focus();
		} else if (!e.shiftKey && document.activeElement === lastElement) {
			e.preventDefault();
			firstElement?.focus();
		}
	}

	$effect(() => {
		if (isOpen) {
			// Store previously focused element
			previousActiveElement = document.activeElement as HTMLElement;

			// Prevent body scroll
			document.body.style.overflow = 'hidden';

			// Focus modal after a brief delay to ensure it's rendered
			setTimeout(() => {
				modalRef?.focus();
			}, 10);

			// Add event listeners
			window.addEventListener('keydown', handleKeydown);
			window.addEventListener('keydown', handleTabKey);
		} else {
			// Restore body scroll
			document.body.style.overflow = '';

			// Restore focus to previously focused element
			previousActiveElement?.focus();

			// Remove event listeners
			window.removeEventListener('keydown', handleKeydown);
			window.removeEventListener('keydown', handleTabKey);
		}

		return () => {
			document.body.style.overflow = '';
			window.removeEventListener('keydown', handleKeydown);
			window.removeEventListener('keydown', handleTabKey);
		};
	});

	if (typeof window !== 'undefined') {
		window.addEventListener('resize', () => {
			innerHeight = window.innerHeight;
		});
	}

	// Generate unique ID for aria-labelledby
	const modalId = `modal-${Math.random().toString(36).substr(2, 9)}`;
</script>

{#if isOpen}
	<!-- Backdrop -->
	<div
		class="fixed top-0 left-0 z-[999] w-full overflow-y-auto bg-[#0000009e]"
		style="height: {innerHeight}px;"
		onclick={onClose}
		aria-hidden="true"
	></div>

	<!-- Modal container -->
	<div
		class="no-scrollbar fixed top-0 left-1/2 z-[9999] w-fit -translate-x-1/2 overflow-y-auto"
		style="height: {innerHeight}px;"
		role="dialog"
		aria-modal="true"
		aria-labelledby={label || LabelComponent ? modalId : undefined}
		aria-describedby={helperText ? `${modalId}-description` : undefined}
	>
		<div class="mx-4 flex min-h-full items-center justify-center">
			<div
				bind:this={modalRef}
				class={`slide_in_up no-scrollbar relative my-8 h-full w-screen overflow-x-hidden overflow-y-auto rounded-2xl border-1 bg-white  ${maxWidth}`}
				style="min-height: {height}; max-height: {height}"
				use:Helpers.clickOutside
				onclick_outside={onClose}
				tabindex="-1"
			>
				<!-- Header -->
				<div
					class="sticky top-0 right-4 z-50 flex w-full items-center justify-between rounded-2xl bg-white px-4 py-4"
				>
					<div>
						{#if LabelComponent}
							<div id={modalId}>
								<LabelComponent {...labelProps} />
							</div>
						{/if}
						{#if label}
							<p id={modalId} class="font-lexend text-lg sm:text-xl">
								{label}
							</p>
						{/if}
						{#if helperText}
							<p id="{modalId}-description" class="font-lexend text-xs font-light">
								{helperText}
							</p>
						{/if}
					</div>

					<div>
						<button
							class="shadow_button close_btn"
							onclick={onClose}
							aria-label="Close modal"
							type="button"
						>
							<X size="20px" aria-hidden="true" />
						</button>
					</div>
				</div>

				<!-- Content -->
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
