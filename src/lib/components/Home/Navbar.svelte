<script lang="ts">
	import { AlignJustify, X } from '@lucide/svelte';
	let {} = $props();

	let showMobileNav = $state(false);

	let navLinks = [
		{
			label: 'Home',
			link: '/'
		},
		{
			label: 'Features',
			link: '/'
		},
		{
			label: 'Download',
			link: '/'
		},
		{
			label: 'Pricing',
			link: '/'
		}
	];

	function toggleMobileNav() {
		showMobileNav = !showMobileNav;
	}
</script>

<nav class="mx-auto flex h-[70px] max-w-7xl items-center justify-between px-4 md:h-[90px]">
	<div>
		<a href="/">
			<h1 class="font-dela-gothic-one text-xl sm:text-3xl">Laniva</h1>
		</a>
	</div>

	<div class="hidden gap-8 md:flex">
		<div class="flex items-center gap-6">
			{#each navLinks as item, index (index)}
				<a
					href={item.link}
					class="font-lexend text-15 block font-normal underline-offset-8 hover:underline"
				>
					{item.label}
				</a>
			{/each}
		</div>

		<div class="flex items-center gap-4">
			<div>
				<button class="shadow_button_outline shadow_button_thi shadow_button_sm" type="button">
					Log in
				</button>
			</div>
			<div>
				<button class="shadow_button shadow_button_thi shadow_button_sm" type="button">
					Start for free
				</button>
			</div>
		</div>
	</div>

	{#if showMobileNav}
		<div class="bg-brand-light fixed top-0 left-0 w-full px-4 pt-6 md:hidden">
			<div class="mb-6 flex items-center justify-between gap-4">
				<div>
					<a href="/">
						<h1 class="font-dela-gothic-one text-xl sm:text-3xl">Laniva</h1>
					</a>
				</div>
				<div>
					<button onclick={toggleMobileNav}>
						<X />
					</button>
				</div>
			</div>
			<div class="flex flex-col gap-2">
				{#each navLinks as item, index (index)}
					<a
						href={item.link}
						class="font-lexend text-15 flex h-[50px] items-end border-b border-b-gray-400 pb-2 font-normal underline-offset-8 hover:underline"
					>
						{item.label}
					</a>
				{/each}
			</div>

			<div class="mt-16 space-y-6">
				<div>
					<button class="shadow_button_outline shadow_button_thi shadow_button_sm" type="button">
						Log in
					</button>
				</div>
				<div>
					<button class="shadow_button shadow_button_thi shadow_button_sm" type="button">
						Start for free
					</button>
				</div>
			</div>
		</div>
	{/if}

	<div class="md:hidden">
		<button onclick={toggleMobileNav}>
			<AlignJustify />
		</button>
	</div>
</nav>
