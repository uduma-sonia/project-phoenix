<script lang="ts">
	import AppLayout from '$lib/components/Common/AppLayout.svelte';
	import Seo from '$lib/components/Common/SEO.svelte';
	import View from '$lib/components/Travel/View.svelte';
</script>

<AppLayout floatingLink="/travel/create">
	<Seo title="Travel" />
	<View />
</AppLayout>
