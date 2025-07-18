<script lang="ts">
	let showStatusDropdown = $state(false);

	const openStatus = () => {
		showStatusDropdown = true;
	};

	const closeStatus = () => {
		showStatusDropdown = false;
	};
</script>

<div class="flex max-w-[200px] flex-1 gap-3">
	<div class="max-w-[200px] flex-1">
		<div class="dropdown_wrapper" class:dropdown_open={showStatusDropdown}>
			<input
				placeholder="Pending"
				type="text"
				value="Pending"
				onclick={openStatus}
				onblur={closeStatus}
				class="relative z-10 h-[50px] w-full max-w-[350px] cursor-pointer rounded-lg border-2 border-black bg-white px-3 outline-none placeholder:font-light"
			/>
			<!-- 
			<button
				class="relative z-10 h-[50px] w-full max-w-[350px] cursor-pointer rounded-lg border-2 border-black bg-white px-3 outline-none placeholder:font-light"
			>
				Pending
			</button> -->

			<img src="/images/arrow_down_thick.svg" class="absolute top-2.5 right-2 z-50 w-8" alt="" />

			{#if showStatusDropdown}
				<div
					class="absolute z-[9999] rounded-lg rounded-t-none border-2 border-t-0 border-black bg-white px-1 py-1"
				>
					<button
						class="font-lexend hover:bg-brand-lime h-[40px] w-full rounded-md px-3 text-left font-light"
					>
						All
					</button>
					<button
						class="font-lexend hover:bg-brand-lime h-[40px] w-full rounded-md px-3 text-left font-light"
					>
						Pending
					</button>
					<button
						class="font-lexend hover:bg-brand-lime h-[40px] w-full rounded-md px-3 text-left font-light"
					>
						Completed
					</button>
					<button
						class="font-lexend hover:bg-brand-lime h-[40px] w-full rounded-md px-3 text-left font-light"
					>
						Stopped
					</button>
				</div>
			{/if}
		</div>
	</div>
</div>

<style>
	.dropdown_wrapper {
		position: relative;
		border-radius: 8px;
		transition: all 0.4s linear;
	}

	.dropdown_open {
		background-color: white;
		transition: all 0.4s linear;
		left: 0px;
	}

	.dropdown_open::before {
		background-color: white;
		left: 0px !important;
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
		border-radius: 8px;
		width: 100%;
		height: 100%;
	}
</style>
