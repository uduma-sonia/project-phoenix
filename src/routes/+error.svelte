<script lang="ts">
	import { page } from '$app/state';
	import NotFound from '$lib/components/Common/Layout/NotFound.svelte';
	import ServerError from '$lib/components/Common/Layout/ServerError.svelte';
</script>

<div class="bg-brand-light">
	{#if page.status === 404}
		<NotFound />
	{:else}
		<ServerError />
	{/if}
</div>
