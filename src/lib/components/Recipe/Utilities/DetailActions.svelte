<script lang="ts">
	import { page } from '$app/state';
	import Tooltip from '$lib/components/Common/Tooltip.svelte';
	import { Link, SquarePen, Heart } from '@lucide/svelte';
	import RecipeUtils from './utils';
	import Helpers from '$lib/utils/helpers';

	let { recipe, isOwner, saveRecipe, isSaving, hasSavedRecipe } = $props();

	let ownerId = $derived(page.url.searchParams.get('owner'));
</script>

<div class="mt-4 flex items-center justify-between gap-3">
	<div class="flex items-center gap-3">
		<div>
			<Tooltip text="Save to Pinterest" position="bottom">
				<button
					class="shadow_button shadow_button_sm shadow_button_thin"
					onclick={() => RecipeUtils.shareToPinterest(recipe.images, recipe.name)}
				>
					<img src="/images/pinterest_logo.svg" class="w-4" alt="" />
				</button>
			</Tooltip>
		</div>
		<div>
			<Tooltip text="Copy link" position="bottom">
				<button
					class="shadow_button shadow_button_sm shadow_button_thin"
					onclick={() => Helpers.copyToClipboard(window?.location?.href, 'Link copied')}
				>
					<Link size="18px" />
				</button>
			</Tooltip>
		</div>

		{#if !isOwner}
			<div>
				<Tooltip text="Save recipe" position="bottom">
					<button class="shadow_button shadow_button_sm shadow_button_thin" onclick={saveRecipe}>
						{#if isSaving}
							<div class="spinner_white border-2 border-black"></div>
						{:else}
							<Heart size="18px" fill={hasSavedRecipe() ? 'fill' : 'transparent'} />
						{/if}
					</button>
				</Tooltip>
			</div>
		{/if}
	</div>

	<div>
		{#if isOwner}
			<Tooltip text="Edit recipe" position="bottom">
				<a href={`/recipe/${page.params.id}/edit?owner=${ownerId}`}>
					<button class="shadow_button shadow_button_sm shadow_button_thin">
						<SquarePen size="18px" />
					</button>
				</a>
			</Tooltip>
		{/if}
	</div>
</div>
