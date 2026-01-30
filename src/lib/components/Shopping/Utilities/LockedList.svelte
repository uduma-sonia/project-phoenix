<script>
	import BasicButton from '$lib/components/Common/Form/BasicButton.svelte';
	import { LockKeyhole } from '@lucide/svelte';
</script>

<div class="pt-20">
	<div
		class="mx-auto flex h-[300px] max-w-[300px] flex-col items-center justify-center rounded-2xl border-2 border-black p-4 text-center"
	>
		<LockKeyhole size="30px" />
		<div class="mb-10">
			<p class="font-lexend mb-4 text-lg font-medium">You need access to this list</p>
			<p class="font-lexend text-sm font-light">
				Reach out to the owner of the list or switch to an account with access.
			</p>
		</div>

		<a href={`/shopping`}>
			<BasicButton label="Go back" />
		</a>
	</div>
</div>
