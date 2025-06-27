<a href="/travel/38rufjce" class="button_active cursor-pointer">
	<div class="bg-brand-travel-folder relative h-6 w-16 rounded-tl-lg border-2 border-b-0">
		<div
			class="bg-brand-travel-folder absolute top-2 -right-10 h-20 w-full -rotate-45 border-r-2"
		></div>
	</div>

	<div class="card_wrapper bg-brand-travel-folder rounded-lg rounded-tl-none">
		<div
			class="bg-brand-travel-folder relative z-10 h-32 w-full max-w-[350px] rounded-lg rounded-tl-none border-2"
		>
			<div class="flex h-full items-center p-3">
				<p class="font-lexend font-light">Santorini</p>
			</div>
		</div>
	</div>
</a>

<style>
	.card_wrapper {
		position: relative;
	}

	.card_wrapper::before {
		content: '';
		position: absolute;
		top: 3px;
		left: 3px;
		right: 0;
		bottom: 0;
		background-color: #000000;
		border: 2px solid black;
		z-index: 1;
		border-radius: 8px;
		width: 100%;
		height: 100%;
	}
</style>
