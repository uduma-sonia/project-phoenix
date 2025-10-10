<script lang="ts">
	import { page } from '$app/state';

	const routesList = [
		{
			label: 'Tracker',
			route: '/tracker',
			keyword: 'tracker'
		},
		{
			label: 'Shopping',
			route: '/shopping',
			keyword: 'shopping'
		},
		{
			label: 'Recipe',
			route: '/recipe',
			keyword: 'recipe'
		},
		{
			label: 'Travel Planner',
			route: '/travel',
			keyword: 'travel'
		}
	];
</script>

<div class="relative h-16">
	<div class="absolute top-1/2 left-4 hidden -translate-y-1/2 sm:block">
		<a href="/tracker" class="flex items-center gap-2">
			<img src="/images/laniva_logo_rounded.png" class="aspect-square w-7" alt="laniva logo" />
		</a>
	</div>
	<div class="flex h-full flex-nowrap items-center justify-center gap-5 px-4">
		{#each routesList as { route, label, keyword } (label)}
			{@const isActive = route == page.url.pathname || page.url.pathname.includes(keyword)}

			<a
				class="font-lexend block min-w-max text-sm font-normal sm:text-base"
				href={route}
				class:font-semibold={isActive}
				class:underline={isActive}
			>
				{label}
			</a>
		{/each}
	</div>
</div>
