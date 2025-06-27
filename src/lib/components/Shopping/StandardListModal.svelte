<script lang="ts">
	import StandardListItem from './Utilities/StandardListItem.svelte';
	import AddStandardItem from './Utilities/AddStandardItem.svelte';
</script>

<div>
	<p class="font-lexend text-xl">Standard list</p>

	<div class="mt-6">
		<StandardListItem showSettings={true} />
		<StandardListItem showSettings={true} />
		<StandardListItem showSettings={true} />
		<StandardListItem showSettings={true} />

		<div class="mt-6">
			<AddStandardItem />
		</div>
	</div>
</div>
