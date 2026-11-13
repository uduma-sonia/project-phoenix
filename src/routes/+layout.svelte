<script lang="ts">
	import { browser } from '$app/environment';
	import ToastContainer from '$lib/components/Common/ToastContainer.svelte';
	import InstallInstruction from '$lib/components/Modals/InstallInstruction.svelte';
	import '../app.css';
	import { QueryClient, QueryClientProvider } from '@tanstack/svelte-query';
	import OnlineDetector from '$lib/components/Common/OnlineDetector.svelte';

	let { children } = $props();

	const queryClient = new QueryClient({
		defaultOptions: {
			queries: {
				retry: 1,
				refetchOnWindowFocus: true,
				enabled: browser,
				refetchInterval: 300000 // <- miliseconds = 5 minutes
			}
		}
	});
</script>

<ToastContainer />
<OnlineDetector />
<InstallInstruction />

<QueryClientProvider client={queryClient}>
	<main>
		{@render children()}
	</main>
</QueryClientProvider>
