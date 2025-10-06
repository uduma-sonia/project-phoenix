<script lang="ts">
	import { Hourglass } from '@lucide/svelte';

	let { heading, text, link, buttonText } = $props();
</script>

<div class="flex h-[300px] items-center justify-center">
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

		<div class="mx-auto mt-6 w-[200px]">
			<a href={link}>
				<button class="shadow_button shadow_button_sm" style="height: 40px" type="button">
					{buttonText}
				</button>
			</a>
		</div>
	</div>
</div>
