<script lang="ts">
	import type { Component } from 'svelte';
	import ButtonV2 from './Form/ButtonV2.svelte';

	type Props = {
		currentTab: string;
		name: string;
		wrapperClass?: string;
		changeTab: (name: string) => void;
		LeftIcon?: ConstructorOfATypedSvelteComponent | Component<any, any, any> | null | undefined;
	};

	let { currentTab, name, changeTab, LeftIcon, wrapperClass }: Props = $props();
</script>

<div class={`min-w-fit ${wrapperClass}`}>
	<ButtonV2
		label={name}
		{LeftIcon}
		action={() => changeTab(name)}
		size="xs"
		variant={currentTab === name ? 'purple' : 'primary'}
		leftIconProps={{
			size: '16px',
			fill: currentTab === name ? 'black' : 'transparent',
			strokeWidth: 2
		}}
	/>
</div>

<style>
	.selected {
		background-color: #c2e08a !important;
	}
</style>
