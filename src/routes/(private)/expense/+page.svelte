<script lang="ts">
	import AppLayout from '$lib/components/Common/AppLayout.svelte';
	import Seo from '$lib/components/Common/SEO.svelte';
	import View from '$lib/components/Expense/View.svelte';
</script>

<AppLayout>
	<Seo title="Expenses" />
	<View />
</AppLayout>
