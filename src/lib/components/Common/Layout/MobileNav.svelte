<script lang="ts">
	import { page } from '$app/state';
	import { Sprout, ShoppingCart, ChefHat, Plane } from '@lucide/svelte';

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

<div
	class="bg-brand-light fixed bottom-0 left-0 z-[99] w-full rounded-t-2xl pt-2 pb-6 shadow-2xl shadow-black md:hidden"
>
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
