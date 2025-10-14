<script lang="ts">
	import { browser } from '$app/environment';
	import DownloadWidget from '$lib/components/Common/DownloadWidget.svelte';
	import ToastContainer from '$lib/components/Common/ToastContainer.svelte';
	import '../app.css';
	import { QueryClient, QueryClientProvider } from '@tanstack/svelte-query';

	let { children } = $props();

	const queryClient = new QueryClient({
		defaultOptions: {
			queries: {
				retry: 1,
				refetchOnWindowFocus: true,
				enabled: browser
			}
		}
	});

	let installPrompt: any = $state(null);

	if (typeof window !== 'undefined') {
		window.addEventListener('beforeinstallprompt', (event) => {
			event.preventDefault();
			installPrompt = event;
		});
	}

	async function handleInstallation() {
		if (!installPrompt) {
			console.log(`No installPrompts`);

			return;
		} else {
			const result = await installPrompt.prompt();
			console.log(`Install prompt was: ${result.outcome}`);
		}
	}
</script>

<svelte:window
	onbeforeinstallprompt={(e) => {
		installPrompt = e;
	}}
/>

<ToastContainer />
<DownloadWidget {handleInstallation} />

<QueryClientProvider client={queryClient}>
	<main>
		{@render children()}
	</main>
</QueryClientProvider>
