<script lang="ts">
	import HamburgerDropdown from '$lib/components/Common/HamburgerDropdown.svelte';
	import {
		Instagram,
		Link,
		MapPinHouse,
		Phone,
		SquarePen,
		Trash2,
		UtensilsCrossed
	} from '@lucide/svelte';

	let { data } = $props();

	const moreOptions = [
		{
			label: 'Edit',
			icon: SquarePen
		},
		{
			label: 'Delete',
			icon: Trash2,
			iconColor: 'red'
			// action: deleteActivity
		}
	];
</script>

{#snippet linkSnippet(link?: string, label?: string, Icon?: any)}
	{#if link}
		<div>
			<a
				href={link}
				target="_blank"
				rel="noreferrer"
				class="font-lexend text-13 inline-flex min-w-max items-center gap-1 font-light underline"
			>
				<Icon size="12px" />
				{label}
			</a>
		</div>
	{/if}
{/snippet}

<div class="timeline_item_wrapper">
	<div class="relative z-10 w-full gap-3 rounded-lg border-2 border-black bg-white p-2">
		<p class="font-lexend mb-2 text-lg font-normal">{data?.name}</p>

		<div class="space-y-3">
			{@render linkSnippet(data.address, data.address, MapPinHouse)}

			<div class="flex flex-wrap gap-4">
				{@render linkSnippet(`tel:${data.mobile}`, data.mobile, Phone)}
				{@render linkSnippet(data.instagramLink, 'Instagram', Instagram)}
				{@render linkSnippet(data.menuLink, 'Menu', UtensilsCrossed)}
				{@render linkSnippet(data.websiteLink, 'Website', Link)}
				{@render linkSnippet(data.otherLink, 'Other link', Link)}
			</div>
		</div>

		<div class="absolute top-6 right-2 z-50 -translate-y-1/2">
			<HamburgerDropdown options={moreOptions} />
		</div>
	</div>
</div>

<style>
	.timeline_item_wrapper {
		position: relative;
		border-radius: 8px;
		transition: all 0.4s linear;
	}

	.timeline_item_wrapper::before {
		content: '';
		position: absolute;
		top: 1px;
		left: 1px;
		right: 0;
		bottom: 0;
		background-color: black;
		border: 2px solid black;
		z-index: 1;
		border-radius: 8px;
		width: 100%;
		height: 100%;
	}
</style>
