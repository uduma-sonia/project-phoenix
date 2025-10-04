<script lang="ts">
	import { page } from '$app/state';
	import { Link, SquarePen, Heart } from '@lucide/svelte';

	let { shareToPinterest, copyLink, isOwner, saveRecipe, isSaving, hasSavedRecipe } = $props();

	let ownerId = $derived(page.url.searchParams.get('owner'));
</script>

<div class="mt-4 flex items-center justify-between gap-3">
	<div class="flex items-center gap-3">
		<div>
			<button
				class="shadow_button shadow_button_sm"
				style="height: 40px"
				onclick={shareToPinterest}
			>
				<img src="/images/pinterest_logo.svg" class="w-4" alt="" />
			</button>
		</div>
		<div>
			<button class="shadow_button shadow_button_sm" style="height: 40px" onclick={copyLink}>
				<Link size="18px" />
			</button>
		</div>

		{#if !isOwner}
			<div>
				<button class="shadow_button shadow_button_sm" style="height: 40px" onclick={saveRecipe}>
					{#if isSaving}
						<div class="spinner_white border-2 border-black"></div>
					{:else}
						<Heart size="18px" fill={hasSavedRecipe() ? 'fill' : 'transparent'} />
					{/if}
				</button>
			</div>
		{/if}
	</div>

	<div>
		{#if isOwner}
			<a href={`/recipe/${page.params.id}/edit?owner=${ownerId}`}>
				<button class="shadow_button shadow_button_sm" style="height: 40px">
					<SquarePen size="18px" />
				</button>
			</a>
		{/if}
	</div>
</div>
