<script lang="ts">
	let { children } = $props();
</script>

<div class="flex h-full items-center justify-center px-4">
	<div class="fixed top-0 mx-auto w-full max-w-[1000px] px-4 pt-4">
		<a href="/" class="flex items-center gap-2">
			<div>
				<img src="/images/laniva_logo_rounded.png" class="aspect-square w-10" alt="laniva logo" />
			</div>

			<h1 class="font-dela-gothic-one text-xl sm:text-2xl">Laniva</h1>
		</a>
	</div>
	<div class="login_form_wrapper w-full md:max-w-[400px]">
		{@render children()}
	</div>
</div>
