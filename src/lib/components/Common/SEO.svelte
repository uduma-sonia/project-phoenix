<script>
	let { title = 'Phoenix', description = 'Track, Shop, Recipe, Travel' } = $props();
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />
</svelte:head>
