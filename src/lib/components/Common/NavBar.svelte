<script lang="ts">
	import { page } from '$app/state';

	const routesList = [
		{
			label: 'Habit Tracker',
			route: '/tracker'
		},
		{
			label: 'Shopping List',
			route: '/shopping'
		},
		{
			label: 'Travel Planner',
			route: '/travel'
		}
	];
</script>

<div class="h-16">
	<div class="flex h-full items-center justify-center gap-5">
		{#each routesList as { route, label } (label)}
			{@const isActive = route == page.url.pathname}
			<a href={route} class={`font-lexend font-light hover:underline`} class:font-medium={isActive}>
				{label}
			</a>
		{/each}
	</div>
</div>
