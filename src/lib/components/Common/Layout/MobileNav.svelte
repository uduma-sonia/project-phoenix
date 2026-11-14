<script lang="ts">
	import { page } from '$app/state';
	import { Sprout, ShoppingCart, ChefHat, WalletMinimal, Utensils, Triangle } from '@lucide/svelte';

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
			label: 'Recipe',
			route: '/recipe',
			keyword: 'recipe',
			icon: ChefHat
		},
		{
			label: 'Shopping',
			route: '/shopping',
			keyword: 'shopping',
			icon: ShoppingCart
		},
		{
			label: 'Tracker',
			route: '/tracker',
			keyword: 'tracker',
			icon: Sprout
		}
	];
</script>

<div
	class="fixed bottom-0 left-0 z-[99] h-[80px] w-full rounded-t-4xl border-[1.5px] bg-[#f8e1a8] pb-3 shadow-lg"
>
	<div class="relative mx-auto grid h-full max-w-[1000px] grid-cols-5">
		{#each routeLinks as route, index (index)}
			{@const isActive =
				page.url.pathname.startsWith(route.route) || page.url.pathname.includes(route.keyword)}
			<a
				href={route.route}
				class="text-brand-grey-text relative flex flex-col items-center justify-center gap-0.5"
				class:active_text={isActive}
			>
				<div>
					<route.icon size="18" />
				</div>

				<div class="font-lexend-deca relative text-xs font-light" class:active_text={isActive}>
					{route.label}
					{#if isActive}
						<div
							class="text-primary-biloba-700 absolute -bottom-3 left-1/2 -translate-x-1/2 rounded-full"
						>
							<Triangle size="10" strokeWidth={4} fill="#706ca9" />
						</div>
					{/if}
				</div>
			</a>
		{/each}
	</div>
</div>

<style>
	.active_text {
		color: black;
		font-weight: 500;
	}
</style>
