<script lang="ts">
	import { toasts } from '../../store/toast';
	// $effect(() => console.log($toasts));
</script>

<div class="toast-container">
	<div class="flex flex-col gap-2 px-4">
		{#each $toasts as toast (toast.id)}
			<div
				class="toast slide_down"
				class:toast_success={toast.type === 'success'}
				class:toast_error={toast.type === 'error'}
			>
				{toast.message}
			</div>
		{/each}
	</div>
</div>
