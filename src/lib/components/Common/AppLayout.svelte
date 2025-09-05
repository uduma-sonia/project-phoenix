<script lang="ts">
	import NameCard from './NameCard.svelte';
	import NavBar from './NavBar.svelte';

	let { children, withName = true } = $props();

	let innerHeight = $state(typeof window !== 'undefined' ? window.innerHeight : 0);

	if (typeof window !== 'undefined') {
		window.addEventListener('resize', () => {
			innerHeight = window.innerHeight;
		});
	}
</script>

<div class="bg-brand-light" style="min-height: {innerHeight}px;">
	<div class="mx-auto w-full max-w-[1000px] pb-64">
		<div class="px-3">
			<NavBar />
			{#if withName}
				<NameCard />
			{/if}
		</div>
		{@render children()}
	</div>
</div>
