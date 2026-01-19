<script lang="ts">
	import { Check } from '@lucide/svelte';

	let { plan } = $props();
</script>

<div class="rounded-20 h-[430px] w-full max-w-[350px]">
	<div class="card_wrapper">
		<div
			class="rounded-20 font-lexend relative z-10 flex h-full w-full flex-col justify-between overflow-hidden border-2 border-black p-6"
			style="background-color: #fff;"
		>
			<div class="flex items-center justify-between">
				<div>
					<p class="font-crete text-2xl font-semibold">
						{plan.amount}
					</p>
				</div>

				<div>
					{#if plan.interval}
						<p class="text-sm">
							{plan.interval}
						</p>
					{/if}
				</div>
			</div>

			<div class="mt-8 flex-1">
				<div class="mb-4 border-b border-b-gray-500 pb-2 font-light">
					{#if plan.isFree}
						<p>Free forever!</p>
					{:else}
						<p>Everything in free including:</p>
					{/if}
				</div>

				<ul class="space-y-4">
					{#each plan.offerings as item, index (index)}
						<li class="flex items-center gap-2 text-sm">
							<Check color="#1eb564" size="20px" />

							{item}
						</li>
					{/each}
				</ul>
			</div>
		</div>
	</div>
</div>

<style>
	.card_wrapper {
		position: relative;
		border-radius: 20px;
		transition: all 0.4s linear;
		height: 100%;
		background-color: white;
	}

	.card_wrapper::before {
		content: '';
		position: absolute;
		top: 3px;
		left: 3px;
		right: 0;
		bottom: 0;
		background-color: black;
		border: 2px solid black;
		z-index: 1;
		border-radius: 20px;
		width: 100%;
		height: 100%;
	}
</style>
