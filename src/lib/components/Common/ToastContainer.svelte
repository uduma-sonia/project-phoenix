<script lang="ts">
	import { removeToast, toasts } from '../../store/toast';
</script>

<div class="toast-container">
	<div class="flex flex-col gap-2 px-4">
		{#each $toasts as toast (toast.id)}
			<button
				class="toast slide_down flex items-center gap-1"
				class:toast_error={toast.type === 'error'}
				onclick={() => {
					removeToast(toast.id);
				}}
			>
				{#if toast?.imgLink}
					<div>
						<img src={toast.imgLink} alt="confetti" class="h-6" />
					</div>
				{/if}

				{toast.message}
			</button>
		{/each}
	</div>
</div>

<style>
	.toast-container {
		position: fixed;
		bottom: 1rem;
		left: 1rem;
		/* transform: translateX(-50%); */
		z-index: 9999;
		width: 100%;
		width: max-content;
	}

	.toast {
		background: #ffffff;
		color: black;
		padding: 0.75rem 1.2rem;
		border-radius: 14px;
		box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
		text-align: center;
		font-size: 14px;
		font-weight: 500;
		font-family: 'Montserrat Variable', sans-serif;
		border: 2px solid black;
	}

	.toast_error {
		background: rgba(199, 10, 36, 1) !important;
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
			transform: translateX(-40px);
		}

		100% {
			transform: translateX(0%);
		}
	}
</style>
