<script lang="ts">
	import { page } from '$app/state';

	const routesList = [
		{
			label: 'Habit Tracker',
			route: '/tracker',
			keyword: 'tracker'
		},
		{
			label: 'Shopping List',
			route: '/shopping',
			keyword: 'shopping'
		},
		{
			label: 'Travel Planner',
			route: '/travel',
			keyword: 'travel'
		}
	];
</script>

<div class="h-16">
	<div class="flex h-full flex-nowrap items-center justify-center gap-5 px-4">
		{#each routesList as { route, label, keyword } (label)}
			{@const isActive = route == page.url.pathname || page.url.pathname.includes(keyword)}

			<a
				class="font-lexend block min-w-max text-sm font-light sm:text-base"
				href={route}
				class:font-medium={isActive}
				class:underline={isActive}
			>
				{label}
			</a>
		{/each}
	</div>
</div>
