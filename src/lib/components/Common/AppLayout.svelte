<script lang="ts">
	import FloatingButton from './FloatingButton.svelte';
	import NameCard from './NameCard.svelte';
	import NavBar from './Layout/NavBar.svelte';
	import MobileNav from './Layout/MobileNav.svelte';

	type Props = {
		children: any;
		withName?: boolean;
		floatingBtnLink?: string;
		tooltipText?: string;
		floatingAction?: () => void;
	};

	let {
		children,
		withName = true,
		floatingBtnLink = '',
		tooltipText = '',
		floatingAction
	}: Props = $props();

	let innerHeight = $state(typeof window !== 'undefined' ? window.innerHeight : 0);

	if (typeof window !== 'undefined') {
		window.addEventListener('resize', () => {
			innerHeight = window.innerHeight;
		});
	}
</script>

<div class="bg-brand-light" style="min-height: {innerHeight}px;">
	<div class="relative mx-auto max-w-[1000px]">
		<div class="bg-brand-light sticky top-0 z-[999] rounded-b-lg shadow-sm">
			<NavBar />
		</div>
		<div class="relativ z-20">
			{#if withName}
				<NameCard />
			{/if}
			{@render children()}
		</div>

		{#if floatingBtnLink || floatingAction}
			<FloatingButton action={floatingAction} {tooltipText} link={floatingBtnLink} />
		{/if}
	</div>
</div>

<MobileNav />
