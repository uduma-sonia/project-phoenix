<script lang="ts">
	import NameCard from './NameCard.svelte';
	import NavBar from './NavBar.svelte';

	let { withName = true } = $props();
</script>

<div class="px-3">
	<NavBar />
	{#if withName}
		<NameCard />
	{/if}
</div>
