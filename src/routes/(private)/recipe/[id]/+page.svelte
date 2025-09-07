<script>
	import AppLayout from '$lib/components/Common/AppLayout.svelte';
	import DeleteModal from '$lib/components/Modals/DeleteModal.svelte';
	import DetailsView from '$lib/components/Recipe/DetailsView.svelte';
</script>

<AppLayout withName={false}>
	<DetailsView />
</AppLayout>

<DeleteModal label="Recipe" />
