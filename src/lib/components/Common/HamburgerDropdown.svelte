<script>
	import Helpers from '$lib/utils/helpers';

	let isDropDownOpen = $state(false);
	let { options } = $props();

	const toggleDropDownMenu = () => {
		isDropDownOpen = !isDropDownOpen;
	};

	const handleClickOutside = () => {
		isDropDownOpen = false;
	};
</script>

<div class="relative border">
	<button aria-label="presentation" class="space-y-0.5 border" onclick={toggleDropDownMenu}>
		<div class="h-[3px] w-4 rounded-full bg-black"></div>
		<div class="h-[3px] w-4 rounded-full bg-black"></div>
		<div class="h-[3px] w-4 rounded-full bg-black"></div>
	</button>

	{#if isDropDownOpen}
		<div
			use:Helpers.clickOutside
			onclick_outside={handleClickOutside}
			class="slide_in_down absolute top-[-30px] right-6 z-[9999] gap-4 overflow-hidden rounded-lg shadow-2xl"
		>
			<div class="rounded-lg border-2 border-black bg-[#FFFFFF] p-0.5">
				{#each options as option}
					{#if option.link}
						<a href={option.link} class="block">
							<button
								class="font-montserrat flex h-10 w-48 min-w-max items-center gap-1 px-3 text-sm font-normal text-white hover:bg-[#191a1c] focus:bg-[#191a1c] active:bg-[#191a1c]"
							>
								<div class="w-6">
									<option.icon />
								</div>
								{option.label}
							</button>
						</a>
					{:else}
						<button
							class="font-montserrat font-lexend flex h-10 w-48 min-w-max items-center gap-1 rounded-lg px-3 text-sm font-normal text-black hover:bg-[#d9d9da] focus:bg-[#191a1c] active:bg-[#191a1c]"
							onclick={() => {
								option.action?.(option.label);
							}}
						>
							<div class="w-6">
								<option.icon />
							</div>
							{option.label}
						</button>
					{/if}
				{/each}
			</div>
		</div>
	{/if}
</div>
