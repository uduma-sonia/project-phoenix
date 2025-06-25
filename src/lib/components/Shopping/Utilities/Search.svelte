<div class="flex max-w-[300px] flex-1 gap-3">
	<div class="max-w-[300px] flex-1">
		<div class="input_wrapper">
			<input
				placeholder="Search"
				type="text"
				class="relative z-10 h-[50px] w-full max-w-[350px] rounded-lg border-2 border-black bg-white px-3 outline-none placeholder:font-light"
			/>

			<img
				src="/images/search.svg"
				class="absolute top-1/2 right-3 z-50 w-6 -translate-y-1/2"
				alt=""
			/>
		</div>
	</div>
</div>

<style>
	.input_wrapper {
		position: relative;
	}

	.input_wrapper::before {
		content: '';
		position: absolute;
		top: 5px;
		left: 5px;
		right: 0;
		bottom: 0;
		border: 2px solid black;
		z-index: 1;
		border-radius: 8px;
		width: 100%;
		height: 100%;
	}
</style>
