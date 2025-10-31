<script lang="ts">
	import { browser } from '$app/environment';
	import { page } from '$app/state';
	import DownloadWidget from '$lib/components/Common/DownloadWidget.svelte';
	import ToastContainer from '$lib/components/Common/ToastContainer.svelte';
	import InstallInstruction from '$lib/components/Modals/InstallInstruction.svelte';
	import { publicRoutes } from '$lib/constants/global';
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

	let hasBeenInstalled = $state(true);
	let install_banner_seen = $state(true);

	if (typeof window !== 'undefined') {
		// Don't show on the home page or auth
		if (!publicRoutes.includes(page.url.pathname) || page.route.id?.includes('/(auth)')) {
			if (!window.matchMedia('(display-mode: standalone)').matches) {
				hasBeenInstalled = false;

				setTimeout(() => {
					install_banner_seen =
						sessionStorage.getItem('install_banner_seen') !== null ? true : false;
				}, 10000);
			}
		}
	}

	function closeDownloadWidget() {
		hasBeenInstalled = true;
		sessionStorage.setItem('install_banner_seen', '1');
	}
</script>

<ToastContainer />

{#if !hasBeenInstalled && !install_banner_seen}
	<DownloadWidget {closeDownloadWidget} />
{/if}

<InstallInstruction />

<QueryClientProvider client={queryClient}>
	<main>
		{@render children()}
	</main>
</QueryClientProvider>
