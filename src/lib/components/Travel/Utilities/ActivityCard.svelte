<script lang="ts">
	import HamburgerDropdown from '$lib/components/Common/HamburgerDropdown.svelte';
	import { Phone, SquarePen, Trash2 } from '@lucide/svelte';
	import type { TripActivity } from '../../../../types/trip';
	import { addToast } from '$lib/store/toast';
	import { tripRequest } from '$lib/requests';
	import { useQueryClient } from '@tanstack/svelte-query';
	import { queryKeys } from '$lib/utils/queryKeys';
	import { page } from '$app/state';

	let { activity }: { activity: TripActivity } = $props();

	const queryClient = useQueryClient();

	let isDeleting = $state(false);

	async function deleteActivity() {
		if (activity?._id) {
			try {
				isDeleting = true;

				const result = await tripRequest.deleteTripActivity(activity?._id);

				if (result) {
					queryClient.invalidateQueries({
						queryKey: queryKeys.getTripActivities(page.params.id)
					});
				}
			} catch (error: any) {
				addToast(error?.message || 'An error occured', 'error');
			} finally {
				isDeleting = true;
			}
		}
	}

	const moreOptions = [
		{
			label: 'Edit',
			icon: SquarePen
			// action: openInsightsModal
		},
		{
			label: 'Delete',
			icon: Trash2,
			iconColor: 'red',
			action: deleteActivity
		}
	];
</script>

{#snippet linkSnippet(link?: string, label?: string)}
	{#if link}
		<a
			href={link}
			target="_blank"
			rel="noreferrer"
			class="inline-flex min-w-max items-center gap-1 text-sm font-light underline"
		>
			{label}
		</a>
	{/if}
{/snippet}

<div class="retro_wrapper">
	<div class="retro_wrapper_inner font-lexend relative">
		<p class="mb-2 text-lg">{activity?.name}</p>

		<div class="mb-3 flex flex-wrap gap-6">
			{@render linkSnippet(activity?.instagramLink, 'Instagram link')}
			{@render linkSnippet(activity?.websiteLink, 'Website link')}
			{@render linkSnippet(activity?.menuLink, 'Menu link')}
			{@render linkSnippet(activity?.otherLink, 'Other link')}

			{#if activity.mobile}
				<a
					href={`tel:${activity.mobile}`}
					class="inline-flex items-center gap-1 text-sm font-light underline"
				>
					<Phone size="14px" />
					Call
				</a>
			{/if}
		</div>

		<!-- <div class="mt-3 flex items-center gap-1 text-xs font-light">
			<p>12th may</p>
			-
			<p>2nd day</p>
		</div> -->
		<div class="absolute top-6 right-2 z-50 -translate-y-1/2">
			<HamburgerDropdown options={moreOptions} />
		</div>
	</div>
</div>

<!-- @TODO: ADD a poll feature, for members to vote on an activity -->
