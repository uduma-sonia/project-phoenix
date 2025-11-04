<script lang="ts">
	import Appearance from './Appearance.svelte';
	import Feedback from './Feedback.svelte';
	import Help from './Help.svelte';
	import Security from './Security.svelte';
	import Subscription from './Subscription.svelte';
	import UserProfile from './UserProfile.svelte';
	let { currentView, user } = $props();
</script>

<div>
	{#if currentView == 'profile'}
		<UserProfile {user} />
	{/if}
	{#if currentView == 'appearance'}
		<Appearance {user} />
	{/if}
	{#if currentView == 'subscription'}
		<Subscription />
	{/if}
	<!-- {#if currentView == 'help'}
		<Help />
	{/if} -->
	{#if currentView == 'security'}
		<Security />
	{/if}
	{#if currentView == 'help'}
		<Feedback />
	{/if}
</div>
