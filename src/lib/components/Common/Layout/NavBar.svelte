<script lang="ts">
	import { page } from '$app/state';

	const routesList = [
		{
			label: 'Expenses',
			route: '/expense',
			keyword: 'expense'
		},
		{
			label: 'Meals',
			route: '/meal-planner',
			keyword: 'meal-planner'
		},
		{
			label: 'Recipe',
			route: '/recipe',
			keyword: 'recipe'
		},
		{
			label: 'Shopping',
			route: '/shopping',
			keyword: 'shopping'
		},
		{
			label: 'Tracker',
			route: '/tracker',
			keyword: 'tracker'
		}
	];
</script>

<div class="mx-auto max-w-[800px] px-2 pt-2 md:hidden">
	<a href="/expense" class="flex items-center gap-2">
		<img src="/images/laniva_logo_rounded.png" class="aspect-square w-7" alt="laniva logo" />
		<h1 class="font-dela-gothic-one text-sm">Laniva</h1>
	</a>
</div>

<div class="relative hidden h-16 md:block">
	<div class="absolute top-1/2 left-4 hidden -translate-y-1/2 sm:block">
		<a href="/expense" class="flex items-center gap-2">
			<img src="/images/laniva_logo_rounded.png" class="aspect-square w-7" alt="laniva logo" />
			<h1 class="font-dela-gothic-one text-sm">Laniva</h1>
		</a>
	</div>
	<div class="flex h-full flex-nowrap items-center justify-end gap-5 px-4">
		{#each routesList as { route, label, keyword } (label)}
			{@const isActive = route == page.url.pathname || page.url.pathname.includes(keyword)}

			<a
				class="font-lexend-deca block min-w-max text-sm font-light underline-offset-2 hover:underline sm:text-sm"
				href={route}
				class:font-medium={isActive}
				class:underline={isActive}
			>
				{label}
			</a>
		{/each}
	</div>
</div>
