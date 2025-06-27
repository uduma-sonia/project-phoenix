<script>
	import { Play } from '@lucide/svelte';
	import ModalWrapper from '../Common/ModalWrapper.svelte';

	let { onClose, isOpen } = $props();
</script>

<ModalWrapper {onClose} {isOpen} maxWidth="max-w-[900px]">
	<div class="flex min-h-[400px] items-stretch gap-2">
		<div class="w-1/2 border-r-2 pr-4">
			<div class="space-y-3">
				<button class="shadow_button rfjnjc flex items-center justify-between">
					Profile

					<Play />
				</button>
				<button class="shadow_button rfjnjc flex items-center justify-between">
					Subscription
				</button>
				<button class="shadow_button rfjnjc flex items-center justify-between"> Theme </button>
			</div>
		</div>

		<div class="w-1/2">
			<div class="mt-4 flex items-center gap-4">
				<div class="h-24 w-24 rounded-lg border-2"></div>

				<div>
					<p class="font-suez text-xl">Sonia Uduma</p>
					<p class="font-lexend font-light">soniauduma@icloud.com</p>
				</div>
			</div>
		</div>
	</div>
</ModalWrapper>

<style>
	.rfjnjc {
		background-color: white !important;
		box-shadow: 1px 1px black !important;
	}
</style>
