<script lang="ts">
	import AppLayout from '../AppLayout.svelte';
	import SEO from '../SEO.svelte';
</script>

<AppLayout withName={false}>
	<SEO title="Page not found!" />

	<div class="flex h-[600px] items-center justify-center p-3">
		<div class="text-center">
			<img src="/images/404emoji.png" alt="404 icon in a frame" class="mx-auto w-40" />
			<p class="font-lexend my-8 text-2xl font-medium">Page not found!</p>
			<p class="font-lexend text-sm font-normal text-gray-600">
				Sorry, but the page you were looking for could not be found.
			</p>
			<p class="font-lexend mt-4 text-sm font-normal text-gray-600">
				You can <a href="/expense" class="text-blue-500">return to the dashboard.</a>
			</p>
		</div>
	</div>
</AppLayout>
