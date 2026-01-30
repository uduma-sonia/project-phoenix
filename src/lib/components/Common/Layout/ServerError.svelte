<script lang="ts">
	import AppLayout from '../AppLayout.svelte';
	import SEO from '../SEO.svelte';
</script>

<AppLayout withName={false}>
	<SEO title="Page not found!" />

	<div class="flex h-[600px] items-center justify-center p-3">
		<div class="text-center">
			<img src="/images/notfound_face.png" alt="404 icon in a frame" class="mx-auto w-20" />
			<p class="font-lexend my-8 text-2xl font-medium">Server error!</p>
			<p class="font-lexend text-sm font-normal text-gray-600">
				It's not you, it's us, we are looking into the issue
			</p>
			<p class="font-lexend mt-4 text-sm font-normal text-gray-600">
				You can try <a href="/expense" class="text-blue-500">returning to the dashboard.</a>
			</p>
		</div>
	</div>
</AppLayout>
