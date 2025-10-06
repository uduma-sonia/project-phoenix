<script lang="ts">
	import AppLayout from '$lib/components/Common/AppLayout.svelte';
	import Seo from '$lib/components/Common/SEO.svelte';
	import PackingModal from '$lib/components/Modals/PackingModal.svelte';
	import View from '$lib/components/Travel/View.svelte';
</script>

<AppLayout floatingLink="/travel/create" tooltipText="Plan trip">
	<Seo title="Travel" />
	<View />
</AppLayout>

<PackingModal />
