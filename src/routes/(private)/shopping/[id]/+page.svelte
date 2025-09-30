<script>
	import AppLayout from '$lib/components/Common/AppLayout.svelte';
	import DeleteBoardModal from '$lib/components/Modals/DeleteBoardModal.svelte';
	import DetailsView from '$lib/components/Shopping/DetailsView.svelte';
</script>

<AppLayout withName={false}>
	<DetailsView />
</AppLayout>

<DeleteBoardModal />
