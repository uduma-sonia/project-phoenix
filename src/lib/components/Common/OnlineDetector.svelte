<script module>
	import { readable } from '$lib/utils/readable.svelte';
	import { WifiOff } from '@lucide/svelte';

	let IS_ONLINE = $state(true);

	function goOnline() {
		IS_ONLINE = true;
	}

	function goOffline() {
		IS_ONLINE = false;
	}

	const isOnline = readable(navigator.onLine, (update) => {
		const onOnline = () => {
			goOnline();
			update(() => true);
		};

		const onOffline = () => {
			goOffline();
			update(() => false);
		};

		window.addEventListener('online', onOnline);
		window.addEventListener('offline', onOffline);

		return () => {
			window.removeEventListener('online', onOnline);
			window.removeEventListener('offline', onOffline);
		};
	});
</script>

{#if !isOnline.value && !IS_ONLINE}
	<div
		class="fixed bottom-[80px] left-1/2 z-[9999] w-full max-w-max -translate-x-1/2 p-2 md:bottom-[40px]"
	>
		<div class="bg-brand-error rounded-xl p-2">
			<div class="p flex items-center gap-2">
				<WifiOff size="14px" color="#ffffff" />
				<p class="font-lexend text-xs font-light text-white md:text-sm">
					Looks like you are not connected to the internet
				</p>
			</div>
		</div>
	</div>
{/if}
