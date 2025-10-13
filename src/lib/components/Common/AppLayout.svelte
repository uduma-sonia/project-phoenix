<script lang="ts">
	import FloatingButton from './FloatingButton.svelte';
	import NameCard from './NameCard.svelte';
	import NavBar from './NavBar.svelte';
	import MobileNav from './Layout/MobileNav.svelte';

	type Props = {
		children: any;
		withName?: boolean;
		floatingLink?: string;
		tooltipText?: string;
	};

	let { children, withName = true, floatingLink = '', tooltipText = '' }: Props = $props();

	let innerHeight = $state(typeof window !== 'undefined' ? window.innerHeight : 0);

	if (typeof window !== 'undefined') {
		window.addEventListener('resize', () => {
			innerHeight = window.innerHeight;
		});
	}
</script>

<div class="bg-brand-light" style="min-height: {innerHeight}px;">
	<div class="relative mx-auto max-w-[1000px]">
		<div class="bg-brand-light sticky top-0 z-50 hidden md:block">
			<NavBar />
		</div>
		<div class="relativ z-20">
			{#if withName}
				<NameCard />
			{/if}
			{@render children()}
		</div>

		{#if floatingLink}
			<div class="hidden md:block">
				<FloatingButton {tooltipText} link={floatingLink} />
			</div>
		{/if}
	</div>
</div>

<MobileNav />
