<script lang="ts">
	import { page } from '$app/state';
	import { Sprout, ShoppingCart, ChefHat, Plane, WalletMinimal, Utensils } from '@lucide/svelte';

	const routeLinks = [
		{
			label: 'Expenses',
			route: '/expense',
			keyword: 'expense',
			icon: WalletMinimal
		},
		{
			label: 'Meals',
			route: '/meal-planner',
			keyword: 'meal-planner',
			icon: Utensils
		},
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
		}
	];
</script>

<div
	class="bg-brand-light fixed bottom-0 left-0 z-[99] w-full rounded-t-3xl pt-2 pb-6 shadow-lg shadow-black md:hidden"
>
	<div class="grid h-full grid-cols-5">
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

				<p class="font-lexend-deca text-11">{route.label}</p>

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
