<script lang="ts">
	// @ts-nocheck
	import Helpers from '$lib/utils/helpers';
	import type { IconProps } from '@lucide/svelte';
	import type { Component } from 'svelte';

	type Options = {
		label: string;
		icon?: Component<IconProps, {}, ''>;
		iconColor?: string;
		type?: string;
		action?: (params: any) => void;
		link?: string;
	};

	let isDropDownOpen = $state(false);
	let { options, variant = 'ghost' }: { options: Options[]; variant?: 'ghost' | 'solid' } =
		$props();

	function toggleDropDownMenu() {
		isDropDownOpen = !isDropDownOpen;
	}

	function handleClickOutside() {
		isDropDownOpen = false;
	}

	function getVariantClass() {
		if (variant === 'ghost') {
			return 'space-y-0.5 p-2';
		} else if (variant === 'solid') {
			return 'space-y-0.5 p-2 shadow_button shadow_button_thin';
		} else {
			return 'space-y-0.5 p-2';
		}
	}
</script>

<div class="relative z-[999px]">
	<button aria-label="presentation" class={getVariantClass()} onclick={toggleDropDownMenu}>
		<div class="h-[3px] w-4 rounded-full bg-black"></div>
		<div class="h-[3px] w-4 rounded-full bg-black"></div>
		<div class="h-[3px] w-4 rounded-full bg-black"></div>
	</button>

	{#if isDropDownOpen}
		<div
			use:Helpers.clickOutside
			onclick_outside={handleClickOutside}
			class="slide_in_down absolute right-8 bottom-[-0px] z-[9999px] gap-4 overflow-hidden rounded-lg shadow-2xl"
		>
			<div class="w-[200px] rounded-lg border-2 border-black bg-[#FFFFFF] p-0.5">
				{#each options as option}
					{#if option.link}
						<a href={option.link} class="block">
							<button
								class="button_active font-montserrat font-lexend flex h-10 w-full items-center gap-1 rounded-lg px-3 text-sm font-normal text-black hover:bg-[#d9d9da] focus:bg-[#d9d9da] active:bg-[#d9d9da]"
							>
								<div class="w-5" style="color: {option.iconColor};">
									<option.icon size="20" />
								</div>
								{option.label}
							</button>
						</a>
					{:else}
						<button
							class="button_active font-montserrat font-lexend flex h-10 w-full items-center gap-2 rounded-lg px-3 text-sm font-normal text-black hover:bg-[#d9d9da] focus:bg-[#d9d9da] active:bg-[#d9d9da]"
							onclick={() => {
								option.action?.(option.label);
								handleClickOutside();
							}}
						>
							<div class="w-5" style="color: {option.iconColor};">
								<option.icon size="20" />
							</div>
							{option.label}
						</button>
					{/if}
				{/each}
			</div>
		</div>
	{/if}
</div>
