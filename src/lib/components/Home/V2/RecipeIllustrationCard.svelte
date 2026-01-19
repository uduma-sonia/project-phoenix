<script lang="ts">
	let { subtitle, title, imgSrc } = $props();
</script>

<div class="mx-auto w-full">
	<div class="retro_wrapper retro_wrapper_uwd">
		<div class="retro_wrapper_inner flex flex-col justify-between gap-2 p-4">
			<div>
				<p class="font-lexend mb-4 text-left text-xl font-normal">
					{@html title}
				</p>

				<p class="font-lexend text-left text-sm font-light">{@html subtitle}</p>
			</div>

			<!-- <div class="flex flex-1 items-center justify-center">
				<Image src={imgSrc} className="w-[130px]" />
			</div> -->
		</div>
	</div>
</div>

<style>
	.retro_wrapper_uwd,
	.retro_wrapper_inner {
		/* height: 330px; */
		width: 100%;
		border-radius: 20px !important;
	}
	.retro_wrapper_uwd::after,
	.retro_wrapper_uwd::before {
		top: 4px !important;
		left: 4px !important;
		border: 1px solid black;
		border-radius: 20px !important;
	}

	/* .retro_wrapper_inner {
		border-radius: 20px;
		border: 1px solid black;
		width: 360px;
		height: 330px;
	} */
</style>
