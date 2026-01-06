<script>
	import AppLayout from '$lib/components/Common/AppLayout.svelte';
	import Seo from '$lib/components/Common/SEO.svelte';
	import View from '$lib/components/Shopping/View.svelte';
</script>

<AppLayout floatingLink="/shopping/create" tooltipText="Create List">
	<Seo title="Shopping" />
	<View />
</AppLayout>
