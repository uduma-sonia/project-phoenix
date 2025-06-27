<script lang="ts">
	import StandardListItem from './Utilities/StandardListItem.svelte';
	import AddStandardItem from './Utilities/AddStandardItem.svelte';
	import ModalWrapper from '../Common/ModalWrapper.svelte';

	let { onClose, isOpen } = $props();
</script>

<ModalWrapper {onClose} {isOpen}>
	<div>
		<p class="font-lexend text-xl">Standard list</p>

		<div class="mt-6">
			<StandardListItem showSettings={true} />
			<StandardListItem showSettings={true} />
			<StandardListItem showSettings={true} />
			<StandardListItem showSettings={true} />

			<div class="mt-6">
				<AddStandardItem />
			</div>
		</div>
	</div>
</ModalWrapper>
