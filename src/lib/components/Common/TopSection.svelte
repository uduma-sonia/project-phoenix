<script lang="ts">
	import NameCard from './NameCard.svelte';
	import NavBar from './NavBar.svelte';

	let { withName = true } = $props();
</script>

<div>
	<NavBar />
	{#if withName}
		<NameCard />
	{/if}
</div>
