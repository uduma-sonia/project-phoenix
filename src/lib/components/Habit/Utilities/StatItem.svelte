<script lang="ts">
	let { smallText, description, value } = $props();
</script>

<div class="dropdown_wrapper h-100">
	<div
		class="relative z-10 flex h-100 w-full items-center gap-3 rounded-[18px] border-2 border-black bg-white px-3"
	>
		<div>
			<p class="font-lexend text-xl font-semibold">
				{value}{#if smallText}
					<small class="text-sm font-medium">{smallText}</small>
				{/if}
			</p>
			<p class="font-lexend text-13 font-light">{description}</p>
		</div>
	</div>
</div>

<style>
	.dropdown_wrapper {
		position: relative;
		border-radius: 18px;
		transition: all 0.4s linear;
	}

	.dropdown_wrapper::after {
		content: '';
		position: absolute;
		top: 5px;
		left: 5px;
		right: 0;
		bottom: 0;
		border: 2px solid black;
		z-index: 1;
		border-radius: 18px;
		width: 100%;
		height: 100%;
	}

	.dropdown_wrapper::before {
		content: '';
		position: absolute;
		top: 5px;
		left: 5px;
		right: 0;
		bottom: 0;
		border: 2px solid black;
		z-index: 1;
		border-radius: 18px;
		width: 100%;
		height: 100%;
	}
</style>
