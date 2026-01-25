<script lang="ts">
	import { X } from '@lucide/svelte';
	import { removeToast, toasts } from '../../store/toast';
</script>

<div class="toast-container">
	<div class="flex flex-col gap-2 px-4">
		{#each $toasts as toast (toast.id)}
			<div class="slide_down relative">
				<button
					class="toast relative flex items-center gap-1"
					class:toast_error={toast.type === 'error'}
					onclick={() => {
						removeToast(toast.id);
					}}
				>
					<span>
						{toast.message}

						{#if toast.link}
							<span>
								<a href={toast.link} class="underline underline-offset-2">{toast.linkName}</a>
							</span>
						{/if}
					</span>
					{#if toast?.imgLink}
						<div>
							<img src={toast.imgLink} alt="confetti" class="h-5" />
						</div>
					{/if}
				</button>

				<div class="absolute -top-2 -left-2">
					<button
						class="flex h-5 w-5 items-center justify-center rounded-full border-2 bg-white"
						onclick={() => {
							removeToast(toast.id);
						}}
					>
						<X />
					</button>
				</div>
			</div>
		{/each}
	</div>
</div>

<style>
	.toast-container {
		position: fixed;
		top: 1rem;
		right: 1rem;
		z-index: 999999;
		width: max-content;
		max-width: 300px;
	}

	.toast {
		background: #ffffff;
		color: black;
		padding: 0.6rem 0.7rem;
		border-radius: 14px;
		box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
		text-align: center;
		font-size: 14px;
		font-weight: 500;
		font-family: 'Montserrat Variable', sans-serif;
		border: 1px solid black;
	}

	.toast_error {
		background: rgb(222, 24, 50) !important;
		color: #ffffff;
	}

	.slide_down {
		animation-name: slideDown;
		animation-duration: 0.4s;
		animation-fill-mode: forwards;
		animation-timing-function: linear;
	}

	@keyframes slideDown {
		0% {
			transform: translateY(-40px);
		}

		100% {
			transform: translateY(0%);
		}
	}
</style>
