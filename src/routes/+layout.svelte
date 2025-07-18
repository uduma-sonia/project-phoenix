<script lang="ts">
	import { browser } from '$app/environment';
	import ToastContainer from '$lib/components/Common/ToastContainer.svelte';
	import '../app.css';
	import { QueryClient, QueryClientProvider } from '@tanstack/svelte-query';

	let { children } = $props();

	const queryClient = new QueryClient({
		defaultOptions: {
			queries: {
				retry: 1,
				refetchOnWindowFocus: false,
				enabled: browser
			}
		}
	});
</script>

<ToastContainer />

<QueryClientProvider client={queryClient}>
	<main>
		{@render children()}
	</main>
</QueryClientProvider>
