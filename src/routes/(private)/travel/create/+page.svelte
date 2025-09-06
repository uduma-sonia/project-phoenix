<script>
	import AppLayout from '$lib/components/Common/AppLayout.svelte';
	import Seo from '$lib/components/Common/SEO.svelte';
	import CreateTravel from '$lib/components/Travel/CreateTravel.svelte';
</script>

<AppLayout withName={false}>
	<Seo title="Create trip" />
	<CreateTravel />
</AppLayout>
