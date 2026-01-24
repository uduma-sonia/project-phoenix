<script lang="ts">
	import { browser } from '$app/environment';
	import { page } from '$app/state';
	import DownloadWidget from '$lib/components/Common/DownloadWidget.svelte';
	import ToastContainer from '$lib/components/Common/ToastContainer.svelte';
	import InstallInstruction from '$lib/components/Modals/InstallInstruction.svelte';
	import { publicRoutes } from '$lib/constants/global';
	import Helpers from '$lib/utils/helpers';
	import { differenceInDays } from 'date-fns';
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
					const bannerDate = localStorage.getItem('install_banner_seen_date') || '';

					if (bannerDate) {
						const _daysDifference = differenceInDays(new Date(), new Date(JSON.parse(bannerDate)));

						// do not show for 30 days if the users has not installed
						if (_daysDifference > 30) {
							install_banner_seen = false;
							localStorage.removeItem('install_banner_seen_date');
						}
					} else {
						install_banner_seen = false;
					}
				}, 20000);
			}
		}
	}

	function closeDownloadWidget() {
		hasBeenInstalled = true;

		localStorage.setItem(
			'install_banner_seen_date',
			JSON.stringify(Helpers.toISOString(new Date()))
		);
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
