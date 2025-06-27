<script>
	import ModalWrapper from '../Common/ModalWrapper.svelte';

	let { onClose, isOpen } = $props();
</script>

<ModalWrapper {onClose} {isOpen}>
	<div>
		<div>
			<p class="font-suez text-2xl">Sonia Uduma</p>
		</div>
	</div>
</ModalWrapper>
