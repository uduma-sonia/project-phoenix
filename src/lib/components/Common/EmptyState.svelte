<script lang="ts">
	import { Hourglass } from '@lucide/svelte';

	let {
		heading,
		text,
		link,
		buttonText,
		action
	}: { heading?: string; text?: string; link?: string; buttonText?: string; action?: () => void } =
		$props();
</script>

<div class="mx-auto flex h-[300px] max-w-[300px] items-center justify-center">
	<div>
		<div class="mx-auto mt-4 mb-2 w-fit">
			<Hourglass />
		</div>

		<p class="font-lexend text-13 text-center font-light">
			<span class="font-semibold">
				{heading}
			</span>

			<br />

			{text}
		</p>

		<div class="mx-auto mt-6 w-[170px]">
			{#if link}
				<a href={link}>
					<button class="shadow_button shadow_button_sm shadow_button_thin" type="button">
						{buttonText}
					</button>
				</a>
			{/if}

			{#if action}
				<button
					onclick={action}
					class="shadow_button shadow_button_sm shadow_button_thin"
					type="button"
				>
					{buttonText}
				</button>
			{/if}
		</div>
	</div>
</div>
