<script lang="ts">
	import AppLayout from '$lib/components/Common/AppLayout.svelte';
	import Seo from '$lib/components/Common/SEO.svelte';
	import View from '$lib/components/Expense/V2/View.svelte';
	import { openTxnCategoryModal } from '$lib/state/modal.svelte';
</script>

<AppLayout floatingAction={openTxnCategoryModal} tooltipText="Create transaction category">
	<Seo title="Expenses" />
	<View />
</AppLayout>
