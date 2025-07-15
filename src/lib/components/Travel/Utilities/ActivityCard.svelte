<script>
	import HamburgerDropdown from '$lib/components/Common/HamburgerDropdown.svelte';
	import { Phone, SquarePen, Trash2 } from '@lucide/svelte';

	const moreOptions = [
		{
			label: 'Edit',
			icon: SquarePen
			// action: openInsightsModal
		},
		{
			label: 'Delete',
			icon: Trash2,
			iconColor: 'red'
			// action: openInsightsModal
		}
	];
</script>

<div class="retro_wrapper">
	<div class="retro_wrapper_inner font-lexend">
		<p class="mb-2">BluCabana restaurant</p>

		<div class="mb-3 flex gap-6">
			<a
				href="https://google.com/"
				class="inline-flex items-center gap-1 text-sm font-light underline"
			>
				Instagram link
			</a>
			<a
				href="https://google.com/"
				class="inline-flex items-center gap-1 text-sm font-light underline"
			>
				Website link
			</a>
			<a
				href="https://google.com/"
				class="inline-flex items-center gap-1 text-sm font-light underline"
			>
				Other link
			</a>
		</div>

		<div class="mb-3 flex gap-6">
			<a
				href="tel:+2348017181777"
				class="inline-flex items-center gap-1 text-sm font-light underline"
			>
				<Phone size="14px" />
				Call
			</a>
			<a
				href="tel:+2348017181777"
				class="inline-flex items-center gap-1 text-sm font-light underline"
			>
				Menu link
			</a>
		</div>

		<div class="mt-3 flex items-center gap-1 text-xs font-light">
			<p>12th may</p>
			-
			<p>2nd day</p>
		</div>

		<div class="absolute top-1/2 right-4 z-50 -translate-y-1/2">
			<HamburgerDropdown options={moreOptions} />
		</div>
	</div>
</div>

<!-- @TODO: ADD a poll feature, for members to vote on an activity -->
