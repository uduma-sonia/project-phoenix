<script lang="ts">
	import { Check, Minus, Plus } from '@lucide/svelte';
	import BackComponent from '../Common/BackComponent.svelte';
	import Helpers from '$lib/utils/helpers';
	import { addToast } from '$lib/store/toast';
	import { useQueryClient } from '@tanstack/svelte-query';
	import BasicInputField from '../Common/Form/BasicInputField.svelte';
	import Dropdown from '../Common/Form/Dropdown.svelte';
	import {
		SectionType,
		type RecipeGroup,
		type RecipeResponse,
		type RecipeSection
	} from '../../../types/recipe';
	import TextArea from '../Common/Form/TextArea.svelte';
	import TextButton from '../Common/Form/TextButton.svelte';
	import { difficultyOptions, typeOptions } from '$lib/constants/recipe';
	import { queryKeys } from '$lib/utils/queryKeys';
	import { goto } from '$app/navigation';
	import { recipeRequest } from '$lib/requests';
	import { page } from '$app/state';

	type Group = { name: string; id: string };

	let {
		recipe,
		groupList
	}: { recipe: RecipeResponse; groupList: { name: string; _id: string }[] } = $props();

	const queryClient = useQueryClient();

	let ownerId = $derived(page.url.searchParams.get('owner'));

	let imageOneEl: any = $state(null);
	let imageTwoEl: any = $state(null);
	let imageThreeEl: any = $state(null);

	let base64Image = $state('');
	let recipeName = $state(recipe?.name);
	let isSubmitting = $state(false);
	let isPrivate = $state(recipe?.isPrivate);
	let prepTime = $state(recipe?.prepTime);
	let cookTime = $state(recipe?.cookTime);
	let totalTime = $state(recipe?.totalTime);
	let servings = $state(recipe?.servings);
	let selectedDifficulty = $state({
		value: recipe?.difficulty || '',
		id: recipe?.difficulty || ''
	});
	let calories = $state(recipe?.calories);
	let selectedGroupList: RecipeGroup[] = $state(recipe?.groups || []);

	let sections = $state<RecipeSection[]>(
		recipe?.sections || [
			{
				name: '',
				type: SectionType.CHECKLIST,
				list: [
					{
						value: ''
					}
				]
			}
		]
	);

	function addSection() {
		const newObj: RecipeSection = {
			name: '',
			type: SectionType.CHECKLIST,
			paragraph: '',
			list: [
				{
					value: ''
				}
			]
		};
		sections = [...sections, newObj];
	}

	function removeMethod(idx: number) {
		const _filter = sections.filter((_, index) => index !== idx);
		sections = _filter;
	}

	function handleBrowseClick(id: string) {
		addToast('Not available', 'error');
		// document.querySelector<HTMLInputElement>(id)?.click();
	}

	function addListItem(idx: number) {
		const _sections = $state.snapshot(sections);
		const result: RecipeSection[] = _sections.map((section, index) => {
			if (index === idx) {
				const _list = section?.list ? [...section.list, { value: '' }] : [{ value: '' }];

				return {
					...section,
					list: _list
				};
			}

			return section;
		});

		sections = result;
	}

	function removeListItem(sectionIndex: number, itemIndex: number) {
		const _sections = $state.snapshot(sections);
		const result: RecipeSection[] = _sections.map((item, index) => {
			if (sectionIndex === index) {
				const _list = item.list ? item.list.filter((j, i) => i !== itemIndex) : [];

				return {
					...item,
					list: _list
				};
			}

			return item;
		});

		sections = result;
	}

	function handleFileChange(el: any) {
		const file = el?.files[0];
		// const _fileName = file?.name;
		const reader = new FileReader();

		if (file) {
			if (Helpers.checkFileSize(file, 2)) {
				addToast('File size too large, upload images under 2mb', 'error');
			} else {
				reader.onload = (e: any) => {
					const base64String = e.target.result.split(',')[1];
					base64Image = 'data:application/jpeg;base64,' + base64String;
				};
				reader.readAsDataURL(file);
			}
		}
	}

	// https://res.clouinary.com/dbqgv8zl7/image/upload/v1757271882/sweettreatsrecipes_-_Best_dessert_recipes_veeqp4.jpg

	function filterSection(sections: RecipeSection[]) {
		return sections.filter((item) => item.name);
	}

	function getSectionTypeOption(type: any) {
		return {
			id: type,
			value:
				type === SectionType.LIST
					? 'List'
					: type === SectionType.CHECKLIST
						? 'Checklist'
						: 'Paragraph'
		};
	}

	function handleSectionTypeChange(index: number, option: any) {
		if (option) {
			sections[index].type = option.id as SectionType;
		}
	}

	function selectGroup(group: { name: string; _id: string }) {
		const findGroup = selectedGroupList.find((item) => item.id === group._id);

		if (findGroup) {
			const filtered = selectedGroupList.filter((item) => item.id !== group._id);
			selectedGroupList = filtered;
		} else {
			selectedGroupList = [...selectedGroupList, { id: group._id, name: group.name }];
		}
	}

	async function handleSubmit() {
		if (!recipeName) {
			const recipeEl = document.getElementById('createRecipe');
			recipeEl?.scrollIntoView({ behavior: 'smooth', inline: 'center' });
			return;
		}
		try {
			isSubmitting = true;

			const payload = {
				name: recipeName,
				images: [
					// 'https://res.cloudinary.com/dbqgv8zl7/image/upload/v1757271882/sweettreatsrecipes_-_Best_dessert_recipes_veeqp4.jpg',
					// 'https://res.cloudinary.com/dbqgv8zl7/image/upload/v1757150018/photo_VSCO_afqnsk.jpg',
					// 'https://res.cloudinary.com/dbqgv8zl7/image/upload/v1759586707/cake4_fyiz3v.jpg'
				],
				isPrivate: isPrivate,
				sections: $state.snapshot(filterSection(sections)),
				slug: Helpers.createSlug(recipeName),
				prepTime,
				cookTime,
				totalTime,
				servings,
				difficulty: selectedDifficulty.id,
				calories,
				groups: $state.snapshot(selectedGroupList)
			};

			const result = await recipeRequest.updateRecipe(recipe?._id as string, payload);

			if (result) {
				queryClient.invalidateQueries({
					queryKey: queryKeys.getSingleRecipe(page.params.id, ownerId as string)
				});
				goto(`/recipe/${Helpers.createSlug(recipeName)}?owner=${ownerId}`);
			}
		} catch (error: any) {
			addToast(error?.message || 'An error occured', 'error');
		} finally {
			isSubmitting = false;
		}
	}
</script>

<input
	type="file"
	id="image_one"
	name="image_one"
	accept="image/*"
	class="invisible absolute bottom-0 left-0"
	bind:this={imageOneEl}
	onchange={() => handleFileChange(imageOneEl)}
/>
<input
	type="file"
	id="image_two"
	name="image_two"
	accept="image/*"
	class="invisible absolute bottom-0 left-0"
	bind:this={imageTwoEl}
	onchange={() => handleFileChange(imageTwoEl)}
/>
<input
	type="file"
	id="image_three"
	name="image_three"
	accept="image/*"
	class="invisible absolute bottom-0 left-0"
	bind:this={imageThreeEl}
	onchange={() => handleFileChange(imageThreeEl)}
/>

<div id="createRecipe">
	<div class="mx-auto w-full px-4 md:max-w-[600px]">
		<BackComponent backLink="/recipe" />
	</div>

	<div class="mt-4 flex items-center justify-center px-4 pb-52">
		<div class="login_form_wrapper w-full md:max-w-[600px]">
			<div class="login_form h-full rounded-3xl border-2 bg-white" id="create-recipe-form">
				<div class="pb-3">
					<p class="font-suez text-2xl">Create Recipe</p>
				</div>

				<hr />

				<div class="mb-10 pt-5">
					<BasicInputField id="recipeName" label="Recipe Name" bind:value={recipeName} />

					<div class="mt-4 grid grid-cols-2 gap-4">
						<BasicInputField
							id="prepTime"
							label="Prep Time"
							placeholder="e.g., 10 minutes"
							bind:value={prepTime}
						/>
						<BasicInputField
							id="cookTime"
							label="Cook Time"
							placeholder="e.g., 20 minutes"
							bind:value={cookTime}
						/>
						<BasicInputField
							id="totalTime"
							label="Total Time"
							placeholder="e.g., 30 minutes"
							bind:value={totalTime}
						/>
						<BasicInputField
							id="servings"
							label="Servings"
							placeholder="e.g., 5 people"
							bind:value={servings}
						/>

						<Dropdown
							label="Difficulty"
							options={difficultyOptions}
							bind:selectedOption={selectedDifficulty}
							shouldSearch={false}
						/>

						<BasicInputField id="calories" label="Calories" bind:value={calories} />
					</div>

					{#if groupList?.length > 0}
						<p class="mb-2 pt-4">Select group</p>

						<div class="flex items-center gap-3">
							{#each groupList as group}
								{@const isSelected = selectedGroupList?.find((item) => item.id === group._id)}
								<button
									class="font-lexend hover:bg-brand-rose inline-block rounded-md border bg-white px-4 py-2 text-[11px] font-light text-black capitalize"
									class:selected={isSelected}
									onclick={() => selectGroup(group)}
								>
									{group.name}
								</button>
							{/each}
						</div>
					{/if}

					<div class="mt-10">
						<p class="font-suez mb-4 text-lg">Images</p>

						<div class="grid grid-cols-2 gap-4 md:grid-cols-3">
							<button
								class="relative h-[120px] w-full rounded-lg border-2 border-black"
								type="button"
								onclick={() => handleBrowseClick('#image_one')}
							>
								{#if base64Image}
									<img
										src={base64Image}
										class="h-full max-h-full w-full max-w-full rounded-lg object-cover"
										alt="Recipe shot"
									/>
								{/if}

								<div
									class="absolute top-[45%] left-1/2 z-40 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1"
								>
									<div>
										<Plus size="24px" />
									</div>
								</div>
							</button>

							<button
								class="relative h-[120px] w-full rounded-lg border-2 border-black"
								type="button"
								onclick={() => handleBrowseClick('#image_two')}
							>
								{#if base64Image}
									<img
										src={base64Image}
										class="h-full max-h-full w-full max-w-full rounded-lg object-cover"
										alt="Recipe shot"
									/>
								{/if}

								<div
									class="absolute top-[45%] left-1/2 z-40 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1"
								>
									<div>
										<Plus size="20px" />
									</div>
								</div>
							</button>
							<button
								class="relative h-[120px] w-full rounded-lg border-2 border-black"
								type="button"
								onclick={() => handleBrowseClick('#image_three')}
							>
								{#if base64Image}
									<img
										src={base64Image}
										class="h-full max-h-full w-full max-w-full rounded-lg object-cover"
										alt="Recipe shot"
									/>
								{/if}

								<div
									class="absolute top-[45%] left-1/2 z-40 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1"
								>
									<div>
										<Plus size="20px" />
									</div>
								</div>
							</button>
						</div>
					</div>

					<div class="mt-10">
						<p class="font-suez mb-4 text-lg">Recipe sections</p>

						<div>
							<div class="space-y-8">
								{#each sections as section, index (index)}
									<div class="space-y-4 border-b border-gray-400 pb-4">
										<div class="flex items-center justify-between gap-4">
											<p class="font-suez">
												Section {index + 1}
											</p>

											<div>
												<button
													type="button"
													class="shadow_button_red shadow_button_thin_red"
													onclick={() => removeMethod(index)}
												>
													Remove section
												</button>
											</div>
										</div>
										<BasicInputField
											placeholder="e.g., Ingredients, Instructions, Tips"
											label="Section name"
											bind:value={section.name}
										/>
										<Dropdown
											label="Type"
											options={typeOptions}
											withClearButton={false}
											selectedOption={getSectionTypeOption(section.type)}
											handleSelectChange={(event: any) => handleSectionTypeChange(index, event)}
											shouldSearch={false}
										/>

										{#if section.type == SectionType.CHECKLIST}
											<p class="mb-2">Checklist items</p>

											{#if section.list}
												{#each section.list as list, idx (idx)}
													<div class="flex items-center gap-2">
														<div class="flex-1">
															<BasicInputField
																bind:value={list.value}
																placeholder="Checklist item"
															/>
														</div>

														<div>
															<button
																onclick={() => removeListItem(index, idx)}
																type="button"
																class="create_button_sm shadow_button minus_btn"
															>
																<Minus size="18px" strokeWidth="4px" color="#FFFFFF" />
															</button>
														</div>
													</div>
												{/each}
											{/if}

											<div class="mt-4">
												<TextButton
													action={() => addListItem(index)}
													label="Add Item"
													RightIcon={Plus}
												/>
											</div>
										{/if}

										{#if section.type == SectionType.LIST}
											<p class="mb-2">List items (steps)</p>

											{#if section.list}
												{#each section.list as list, idx (idx)}
													<div class="flex items-center gap-2">
														<div class="flex-1">
															<TextArea
																placeholder="List item"
																bind:value={list.value}
																className="min-h-[50px]"
																rows={1}
															/>
														</div>

														<div>
															<button
																onclick={() => removeListItem(index, idx)}
																type="button"
																class="create_button_sm shadow_button minus_btn"
															>
																<Minus size="18px" strokeWidth="4px" color="#FFFFFF" />
															</button>
														</div>
													</div>
												{/each}
											{/if}

											<div class="mt-4">
												<TextButton
													action={() => addListItem(index)}
													label="Add Item"
													RightIcon={Plus}
												/>
											</div>
										{/if}

										{#if section.type == SectionType.PARAGRAPH}
											<TextArea
												label="Paragraph Text"
												helperText="Use for paragraph-type sections"
												bind:value={section.paragraph}
											/>
										{/if}
									</div>
								{/each}
							</div>

							<div class="mt-4 flex justify-end">
								<TextButton action={() => addSection()} label="Add Section" RightIcon={Plus} />
							</div>
						</div>
					</div>

					<div>
						<label for="notes" class="mb-2">Private</label>

						<div class="flex items-center gap-2">
							<button
								class="button_active relative flex h-7 w-7 items-center justify-center rounded-md border-2 p-0"
								aria-label="Checklist"
								type="button"
								onclick={() => (isPrivate = !isPrivate)}
							>
								{#if isPrivate}
									<Check size="22px" />
								{/if}
							</button>

							<p class="font-lexend text-sm font-light">Hide from others</p>
						</div>
					</div>
				</div>

				<div>
					<button class="shadow_button" type="button" onclick={handleSubmit}>
						{#if isSubmitting}
							<div class="spinner_white border-2 border-black"></div>
						{:else}
							Save
						{/if}
					</button>
				</div>
			</div>
		</div>
	</div>
</div>

<style>
	.minus_btn {
		width: 30px !important;
		height: 30px !important;
		background-color: #e7000b;
	}

	.selected {
		background-color: #dcbec5 !important;
	}
</style>
