<script>
	let { title = 'Laniva', description = 'Track Habit, Manage Shop, Manage Recipe, Plan Travel' } =
		$props();
</script>

<svelte:head>
	<title>{title + ' | Laniva'}</title>
	<meta name="description" content={description} />
</svelte:head>
