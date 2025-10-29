<script lang="ts">
	let { subtitle, title } = $props();
</script>

<div class="retro_wrapper retro_wrapper_uwd">
	<div class="retro_wrapper_inner">
		<div class="pt-4">
			<p class="font-lexend-deca text-center text-xs font-light">{subtitle}</p>
			<p class="font-lexend-deca mt-3 px-10 text-center text-2xl font-normal">{title}</p>
		</div>
	</div>
</div>

<style>
	.retro_wrapper_uwd {
		height: 300px;
		width: 360px;
		border-radius: 40px !important;
	}
	.retro_wrapper_uwd::after {
		top: 5px !important;
		left: 5px !important;
		border: 1px solid black;
		border-radius: 40px !important;
	}

	.retro_wrapper_uwd::before {
		top: 5px !important;
		left: 5px !important;
		border: 1px solid black !important;
		border-radius: 40px !important;
	}

	.retro_wrapper_inner {
		border-radius: 40px;
		border: 1px solid black;
		height: 300px;
		width: 360px;
	}
</style>
