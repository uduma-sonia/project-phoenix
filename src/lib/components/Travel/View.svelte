<script>
	import TopSection from '../Common/TopSection.svelte';
	import Search from '../Shopping/Utilities/Search.svelte';
	import TravelCard from './Utilities/TravelCard.svelte';
</script>

<div class="mx-auto w-full max-w-[1000px] pb-64">
	<TopSection />

	<div class="flex items-center justify-between gap-4">
		<Search />
	</div>

	<div class="mt-14 grid grid-cols-5 gap-6">
		<TravelCard />
		<TravelCard />
		<TravelCard />
	</div>
</div>
