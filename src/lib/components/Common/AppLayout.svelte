<script lang="ts">
	import { ChefHat, Plane, ShoppingCart, Sprout } from '@lucide/svelte';
	import FloatingButton from './FloatingButton.svelte';
	import NameCard from './NameCard.svelte';
	import NavBar from './NavBar.svelte';
	import { page } from '$app/state';

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
	const routeLinks = [
		{
			label: 'Tracker',
			route: '/tracker',
			keyword: 'tracker',
			icon: Sprout
		},
		{
			label: 'Shopping',
			route: '/shopping',
			keyword: 'shopping',
			icon: ShoppingCart
		},
		{
			label: 'Recipe',
			route: '/recipe',
			keyword: 'recipe',
			icon: ChefHat
		},
		{
			label: 'Trips',
			route: '/travel',
			keyword: 'travel',
			icon: Plane
		}
	];
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

<div class="bg-brand-light fixed bottom-0 left-0 z-[99] w-full rounded-t-2xl pt-2 pb-6 md:hidden">
	<div class="grid h-full grid-cols-4">
		{#each routeLinks as route, index (index)}
			{@const isActive = page.url.pathname.startsWith(route.route)}
			<a
				href={route.route}
				class="relative flex flex-col items-center justify-center gap-1 opacity-50"
				class:active={isActive}
			>
				<div>
					<route.icon />
				</div>

				<p class="font-lexend text-xs">{route.label}</p>

				{#if isActive}
					<div
						class="absolute -bottom-1.5 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-black"
					></div>
				{/if}
			</a>
		{/each}
	</div>
</div>

<style>
	.active {
		opacity: 1;
	}
</style>
