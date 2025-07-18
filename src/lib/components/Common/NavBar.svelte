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
	<div class="flex h-full items-center justify-center gap-5">
		{#each routesList as { route, label, keyword } (label)}
			{@const isActive = route == page.url.pathname || page.url.pathname.includes(keyword)}
			<a
				href={route}
				class={`font-lexend min-w-fit px-4 font-light underline-offset-2 hover:underline`}
				class:font-medium={isActive}
				class:underline={isActive}
			>
				{label}
			</a>
		{/each}
	</div>
</div>
