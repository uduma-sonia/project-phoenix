<script lang="ts">
	import FloatingButton from '../Common/FloatingButton.svelte';
	import Search from '../Shopping/Utilities/Search.svelte';
	import TravelCard from './Utilities/TravelCard.svelte';
</script>

<div>
	<div class="flex items-center justify-between gap-4 px-3">
		<Search />
	</div>
	<div class="mt-14 grid grid-cols-2 gap-3 px-3 sm:grid-cols-3 sm:gap-6 md:grid-cols-4">
		<TravelCard />
		<TravelCard />
		<TravelCard />
	</div>
	<FloatingButton link="/travel/create" />
</div>
