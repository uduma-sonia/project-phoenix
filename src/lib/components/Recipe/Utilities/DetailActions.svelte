<script lang="ts">
	import { page } from '$app/state';
	import { Link, SquarePen } from '@lucide/svelte';

	let { shareToPinterest, copyLink, isOwner } = $props();
</script>

<div class="mt-4 flex items-center justify-between gap-3">
	<div class="flex items-center gap-3">
		<div>
			<button
				class="shadow_button shadow_button_sm"
				style="height: 40px"
				onclick={shareToPinterest}
			>
				<img src="/images/pinterest_logo.svg" class="w-5" alt="" />
			</button>
		</div>
		<div>
			<button class="shadow_button shadow_button_sm" style="height: 40px" onclick={copyLink}>
				<Link size="20px" />
			</button>
		</div>
	</div>

	<div>
		{#if isOwner}
			<a href={`/recipe/${page.params.id}/edit`}>
				<button class="shadow_button shadow_button_sm" style="height: 40px">
					<SquarePen size="20px" />
				</button>
			</a>
		{/if}
	</div>
</div>
