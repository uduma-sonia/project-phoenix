<script lang="ts">
	let { bgColor = '#FFFFFF', title = '', description } = $props();
</script>

<div class="rounded-20 mx-auto h-[450px] w-full max-w-[450px] sm:h-[500px] lg:max-w-full">
	<div class="card_wrapper">
		<div
			class="rounded-20 font-lexend relative z-10 flex h-full w-full flex-col gap-6 overflow-hidden border-2 border-black text-center lg:text-left"
			style="background-color: #f5ecd5;"
		>
			<div class="p-5 sm:p-8">
				<h3 class="text-2xl font-semibold sm:text-2xl md:text-4xl">{title}</h3>

				<p class="text-13 mt-4 max-w-[350px] font-light sm:text-sm">
					{description}
				</p>
			</div>

			<div class="flex flex-1 justify-end">
				<div class="h-full w-[250px] overflow-hidden rounded-xl border sm:w-[300px]">
					<!-- <img src="/images/tracker_iphone14_screenshot.jpeg" class="object-bottom" alt="" /> -->
				</div>
			</div>
		</div>
	</div>
</div>

<style>
	.card_wrapper {
		position: relative;
		border-radius: 20px;
		transition: all 0.4s linear;
		height: 100%;
		background-color: white;
	}

	.card_wrapper::before {
		content: '';
		position: absolute;
		top: 3px;
		left: 3px;
		right: 0;
		bottom: 0;
		background-color: black;
		border: 2px solid black;
		z-index: 1;
		border-radius: 20px;
		width: 100%;
		height: 100%;
	}
</style>
