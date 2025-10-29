<script lang="ts">
	import Image from '../Common/Image.svelte';

	let { subtitle, title, imgSrc } = $props();
</script>

<div class="mx-auto w-fit">
	<div class="retro_wrapper retro_wrapper_uwd">
		<div class="retro_wrapper_inner flex flex-col justify-between gap-2 p-4">
			<div>
				<p class="font-lexend-deca text-center text-xs font-light">{subtitle}</p>
				<p class="font-lexend-deca mt-1 px-10 text-center text-2xl font-normal">{title}</p>
			</div>

			<div class="flex flex-1 items-center justify-center">
				<Image src={imgSrc} className="w-[130px]" />
			</div>
		</div>
	</div>
</div>

<style>
	.retro_wrapper_uwd {
		height: 330px;
		width: 360px;
		border-radius: 40px !important;
	}
	.retro_wrapper_uwd::after {
		top: 4px !important;
		left: 4px !important;
		border: 1px solid black;
		border-radius: 40px !important;
	}

	.retro_wrapper_uwd::before {
		top: 4px !important;
		left: 4px !important;
		border: 1px solid black !important;
		border-radius: 40px !important;
	}

	.retro_wrapper_inner {
		border-radius: 40px;
		border: 1px solid black;
		height: 330px;
		width: 360px;
	}
</style>
