<script>
	import AppLayout from '$lib/components/Common/AppLayout.svelte';
	import Seo from '$lib/components/Common/SEO.svelte';
	import View from '$lib/components/Shopping/View.svelte';
	import { openCreateListModal } from '$lib/state/modal.svelte';
</script>

<AppLayout floatingAction={openCreateListModal} tooltipText="Create List">
	<Seo title="Shopping" />
	<View />
</AppLayout>
