<script>
	import Avatar from '../Common/Avatar.svelte';

	let { user } = $props();

	let username = $derived(user?.username);
	let email = $derived(user?.email);
</script>

<div>
	<p class="mb-4 text-lg">Profile</p>

	<div class="mt-0">
		<Avatar src={user?.avatar} />
		<div class="mt-7 space-y-4">
			<div>
				<label for="email" class="mb-2">Username</label>
				<input
					bind:value={username}
					type="email"
					id="email"
					name="email"
					required
					autocomplete="email"
					class="h-[50px] w-full rounded-lg border-2 border-black px-3 outline-none"
				/>
			</div>
			<div>
				<label for="email" class="mb-2">Email</label>
				<input
					bind:value={email}
					type="email"
					id="email"
					name="email"
					required
					autocomplete="email"
					class="h-[50px] w-full rounded-lg border-2 border-black px-3 outline-none"
				/>
			</div>
		</div>
	</div>
</div>
