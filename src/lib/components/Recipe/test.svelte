<script>
	// Section type definition
	let sections = [
		{
			id: crypto.randomUUID(),
			name: '',
			type: '',
			parapgraph: '',
			list: []
		}
	];

	// Add a new section
	function addSection() {
		sections = [
			...sections,
			{
				id: crypto.randomUUID(),
				name: '',
				type: '',
				parapgraph: '',
				list: []
			}
		];
	}

	// Remove a section
	function removeSection(id) {
		sections = sections.filter((section) => section.id !== id);
	}

	// Add a list item to a specific section
	function addListItem(sectionId: any) {
		sections = sections.map((section) => {
			if (section.id === sectionId) {
				return {
					...section,
					list: [...section.list, { id: crypto.randomUUID(), value: '' }]
				};
			}
			return section;
		});
	}

	// Remove a list item from a specific section
	function removeListItem(sectionId, itemId) {
		sections = sections.map((section) => {
			if (section.id === sectionId) {
				return {
					...section,
					list: section.list.filter((item) => item.id !== itemId)
				};
			}
			return section;
		});
	}

	// Handle form submission
	function handleSubmit() {
		// Clean up sections data before submitting
		const cleanedSections = sections.map(({ id, ...section }) => ({
			name: section.name,
			type: section.type,
			parapgraph: section.type === 'PARAPGRAPH' ? section.parapgraph : undefined,
			list:
				section.type === 'LIST'
					? section.list.map(({ id, ...item }) => ({ value: item.value }))
					: undefined
		}));

		console.log('Sections data:', cleanedSections);
		alert('Check console for sections data!');
	}
</script>

<div class="container">
	<div class="header">
		<h2>Recipe Sections</h2>
		<p>Add ingredients, instructions, tips, and more</p>
	</div>

	<form on:submit|preventDefault={handleSubmit}>
		<div class="sections-container">
			{#each sections as section, index (section.id)}
				<div class="section-item">
					<div class="section-header">
						<span class="section-title">Section {index + 1}</span>
						{#if sections.length > 1}
							<button type="button" class="btn-remove" on:click={() => removeSection(section.id)}>
								Remove
							</button>
						{/if}
					</div>

					<div class="form-group">
						<label for="name-{section.id}">
							Section Name <span class="required">*</span>
						</label>
						<input
							type="text"
							id="name-{section.id}"
							bind:value={section.name}
							placeholder="e.g., Ingredients, Instructions, Tips"
							required
						/>
					</div>

					<div class="form-group">
						<label for="type-{section.id}">
							Section Type <span class="required">*</span>
						</label>
						<select id="type-{section.id}" bind:value={section.type} required>
							<option value="">Choose type...</option>
							<option value="LIST">List</option>
							<option value="PARAPGRAPH">Paragraph</option>
						</select>
					</div>

					{#if section.type === 'PARAPGRAPH'}
						<div class="form-group">
							<label for="paragraph-{section.id}">Paragraph Text</label>
							<textarea
								id="paragraph-{section.id}"
								bind:value={section.parapgraph}
								placeholder="Enter paragraph text..."
								rows="4"
							></textarea>
						</div>
					{/if}

					{#if section.type === 'LIST'}
						<div class="form-group">
							<label>List Items</label>
							<div class="list-items">
								{#each section.list as item (item.id)}
									<div class="list-item">
										<input type="text" bind:value={item.value} placeholder="Enter list item..." />
										<button
											type="button"
											class="btn-remove-item"
											on:click={() => removeListItem(section.id, item.id)}
										>
											×
										</button>
									</div>
								{/each}
								<button type="button" class="btn-add-item" on:click={() => addListItem(section.id)}>
									+ Add List Item
								</button>
							</div>
						</div>
					{/if}
				</div>
			{/each}

			<button type="button" class="btn-add-section" on:click={addSection}>
				+ Add Another Section
			</button>
		</div>

		<div class="form-actions">
			<button type="button" class="btn-secondary">Cancel</button>
			<button type="submit" class="btn-primary">Save Recipe</button>
		</div>
	</form>
</div>
