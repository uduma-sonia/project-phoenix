<script lang="ts">
	let { label, icon } = $props();
</script>

<p class="font-lexend flex items-center gap-3 text-lg text-black sm:text-xl">
	<img src={icon} alt="" />
	{label}
</p>
