<script lang="ts">
	let { data, label, Icon }: { data: { hour: number; minutes: number }; label: string; Icon: any } =
		$props();
</script>

{#if data}
	<div class="flex min-w-max items-center gap-1">
		<p class="font-lexend-deca flex items-center gap-1 text-sm">
			<Icon size="18px" />
			{label}:
		</p>
		<p class="font-lexend-deca text-sm font-light">
			<span>
				{data.hour}hr
			</span>
			<span>
				{data.minutes}min
			</span>
		</p>
	</div>
{/if}
