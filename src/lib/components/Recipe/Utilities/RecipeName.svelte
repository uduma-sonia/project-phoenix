<script lang="ts">
	let { recipe } = $props();
</script>

<p class="mt-4 text-xl font-medium">
	{recipe.name}
</p>

<div class="mb-2 flex gap-3">
	{#if recipe?.groups?.length}
		{#each recipe?.groups as group, index (index)}
			<p class="font-lexend text-13 font-extralight">
				#{group.name}
			</p>
		{/each}
	{/if}
</div>
