<div>
	<div class="flex gap-3">
		<div>
			<p class="font-lexend text-sm font-light">Jan</p>
		</div>

		<div class="flex flex-1 flex-wrap gap-x-2 gap-y-2">
			{#each [...new Array(30)] as item}
				<div class="h-5 w-5 min-w-5 rounded-sm bg-gray-500"></div>
			{/each}
		</div>
	</div>
</div>
