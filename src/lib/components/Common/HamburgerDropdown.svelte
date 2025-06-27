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

<div class="relative">
	<button aria-label="presentation" class="space-y-0.5" onclick={toggleDropDownMenu}>
		<div class="h-[3px] w-4 rounded-full bg-black"></div>
		<div class="h-[3px] w-4 rounded-full bg-black"></div>
		<div class="h-[3px] w-4 rounded-full bg-black"></div>
	</button>

	{#if isDropDownOpen}
		<div
			use:Helpers.clickOutside
			onclick_outside={handleClickOutside}
			class="slide_in_down absolute top-[-30px] right-6 z-[9999] gap-4 overflow-hidden rounded-lg shadow-2xl shadow-black"
		>
			<div class="w-[150px] rounded-lg border-2 border-black bg-[#FFFFFF] p-0.5">
				{#each options as option}
					{#if option.link}
						<a href={option.link} class="block">
							<button
								class="button_active font-montserrat font-lexend flex h-10 w-full items-center gap-1 rounded-lg px-3 text-sm font-normal text-black hover:bg-[#d9d9da] focus:bg-[#d9d9da] active:bg-[#d9d9da]"
							>
								<div class="w-6">
									<option.icon />
								</div>
								{option.label}
							</button>
						</a>
					{:else}
						<button
							class="button_active font-montserrat font-lexend flex h-10 w-full items-center gap-1 rounded-lg px-3 text-sm font-normal text-black hover:bg-[#d9d9da] focus:bg-[#d9d9da] active:bg-[#d9d9da]"
							onclick={() => {
								option.action?.(option.label);
							}}
						>
							<div class="w-6" style="color: {option.iconColor};">
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
