<script>
	let {
		title = '',
		description = 'Budget tracking, shopping list, recipe manager, habit tracker'
	} = $props();
</script>

<svelte:head>
	<!-- {#if title}
	
{/if} -->
	<title>{title ? title + ' | Laniva' : 'Laniva'}</title>
	<meta name="description" content={description} />
</svelte:head>
