<script>
	import BackComponent from '../Common/BackComponent.svelte';
	import TopSection from '../Common/TopSection.svelte';
</script>

<div>
	<TopSection withName={false} />

	<div class="mx-auto w-full px-4 md:max-w-[500px]">
		<BackComponent backLink="/travel" />
	</div>
</div>
