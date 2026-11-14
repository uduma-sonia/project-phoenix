<script lang="ts">
	type Props = {
		data: { hour: number; minutes: number };
		label?: string;
		Icon: any;
		iconProps?: any;
	};
	let { data, label, Icon, iconProps }: Props = $props();
</script>

{#if data}
	<div class="flex min-w-max items-center gap-1">
		<p class="font-lexend-deca flex items-center gap-1 text-sm">
			<Icon size="17px" {...iconProps} />
			{#if label}
				{label}:
			{/if}
		</p>
		<p class="font-lexend-deca text-xs font-light">
			<span>
				{data.hour}hr
			</span>
			<span>
				{data.minutes}min
			</span>
		</p>
	</div>
{/if}
