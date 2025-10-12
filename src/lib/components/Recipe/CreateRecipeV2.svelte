<script lang="ts">
	import { Check, Minus, Plus } from '@lucide/svelte';
	import BackComponent from '../Common/BackComponent.svelte';
	import Helpers from '$lib/utils/helpers';
	import { addToast } from '$lib/store/toast';
	import { useQueryClient } from '@tanstack/svelte-query';
	import BasicInputField from '../Common/Form/BasicInputField.svelte';
	import Dropdown from '../Common/Form/Dropdown.svelte';
	import {
		RecipeStandardMeasurements,
		SectionType,
		type RecipeSection
	} from '../../../types/recipe';
	import TextArea from '../Common/Form/TextArea.svelte';
	import TextButton from '../Common/Form/TextButton.svelte';
	import { difficultyOptions, typeOptions } from '$lib/constants/recipe';
	import { recipeRequest } from '$lib/requests';
	import { queryKeys } from '$lib/utils/queryKeys';
	import { goto } from '$app/navigation';
	import RecipeUtils from './Utilities/utils';

	type Group = { name: string; id: string };
	type Ingredient = { name: string; amount: string; unit: string };
	type Direction = { name: string };

	let { groupList } = $props();

	const queryClient = useQueryClient();

	let imageOneEl: any = $state(null);
	let imageTwoEl: any = $state(null);
	let imageThreeEl: any = $state(null);

	let base64Image = $state('');
	let recipeName = $state('');
	let isSubmitting = $state(false);
	let isPrivate = $state(false);
	let description = $state('');
	let prepNote = $state('');
	let prepTimeHour = $state('');
	let prepTimeMinutes = $state('');
	let cookTimeHour = $state('');
	let cookTimeMinutes = $state('');
	let servings = $state('');
	let yieldValue = $state('');
	let selectedDifficulty = $state({
		value: 'Easy',
		id: 'EASY'
	});

	// Nutrition fields
	let calories = $state('');
	let totalFat = $state('');
	let saturatedFat = $state('');
	let cholesterol = $state('');
	let sodium = $state('');
	let carbonhydrate = $state('');
	let sugar = $state('');
	let protein = $state('');
	let dietaryFibers = $state('');

	let selectedGroupList: Group[] = $state([]);
	let measurementOptions = RecipeUtils.generateMeasurementsOptions();

	// Ingredients
	let ingredients = $state<Ingredient[]>([
		{
			name: '',
			amount: '',
			unit: ''
		}
	]);

	// Directions
	let directions = $state<Direction[]>([
		{
			name: ''
		}
	]);

	let sections = $state<RecipeSection[]>([
		{
			name: '',
			type: SectionType.CHECKLIST,
			list: [
				{
					value: '',
					measurement: RecipeStandardMeasurements.NONE
				}
			]
		}
	]);

	function addIngredient() {
		ingredients = [...ingredients, { name: '', amount: '', unit: '' }];
	}

	function removeIngredient(idx: number) {
		ingredients = ingredients.filter((_, index) => index !== idx);
	}

	function addDirection() {
		directions = [...directions, { name: '' }];
	}

	function removeDirection(idx: number) {
		directions = directions.filter((_, index) => index !== idx);
	}

	function addSection() {
		const newObj: RecipeSection = {
			name: '',
			type: SectionType.CHECKLIST,
			paragraph: '',
			list: [
				{
					value: '',
					measurement: RecipeStandardMeasurements.NONE
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
		const result: any[] = _sections.map((section, index) => {
			if (index === idx) {
				const _list = section?.list
					? [...section.list, { value: '', measurement: RecipeStandardMeasurements.NONE }]
					: [{ value: '', measurement: RecipeStandardMeasurements.NONE }];

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

	function filterSection(sections: RecipeSection[]) {
		return sections.filter((item) => item.name);
	}

	function filterIngredients(ingredients: Ingredient[]) {
		return ingredients.filter((item) => item.name);
	}

	function filterDirections(directions: Direction[]) {
		return directions.filter((item) => item.name);
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

	function getMeasurement(type: string) {
		const key = type.toUpperCase() as keyof typeof RecipeStandardMeasurements;

		if (key in RecipeStandardMeasurements) {
			return {
				id: type,
				value: RecipeStandardMeasurements[key]
			};
		}

		return null;
	}

	function handleListMeasurementChange(index: number, listIndex: number, option: any) {
		if (sections[index].list) {
			sections[index].list[listIndex].measurement = option.id;
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
				slug: Helpers.createSlug(recipeName),
				description,
				prepNote,
				prepTime: {
					hour: prepTimeHour ? Number(prepTimeHour) : undefined,
					minutes: prepTimeMinutes ? Number(prepTimeMinutes) : undefined
				},
				cookTime: {
					hour: cookTimeHour ? Number(cookTimeHour) : undefined,
					minutes: cookTimeMinutes ? Number(cookTimeMinutes) : undefined
				},
				servings: servings ? Number(servings) : undefined,
				yield: yieldValue,
				difficulty: selectedDifficulty.id,
				groups: $state.snapshot(selectedGroupList),
				images: [
					// 'https://res.cloudinary.com/dbqgv8zl7/image/upload/v1757271882/sweettreatsrecipes_-_Best_dessert_recipes_veeqp4.jpg',
				],
				isPrivate: isPrivate,
				ingredients: $state.snapshot(filterIngredients(ingredients)),
				directions: $state.snapshot(filterDirections(directions)),
				nutrition: {
					calories,
					totalFat,
					saturatedFat,
					cholesterol,
					sodium,
					carbonhydrate,
					sugar,
					protein,
					dietaryFibers
				},
				sections: $state.snapshot(filterSection(sections))
			};

			console.log(payload);

			// const result = await recipeRequest.createRecipe(payload);

			// if (result) {
			// 	addToast('Recipe created', 'success', { imgLink: '/images/confetti.svg' });
			// 	queryClient.invalidateQueries({ queryKey: queryKeys.getRecipes });
			// 	goto('/recipe');
			// }
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

					<div class="mt-4">
						<TextArea
							label="Description"
							placeholder="Brief description of your recipe"
							bind:value={description}
						/>
					</div>

					<div class="mt-4">
						<TextArea
							label="Prep Note"
							placeholder="Any notes or tips before starting"
							bind:value={prepNote}
						/>
					</div>

					<div class="mt-4 grid grid-cols-2 gap-4">
						<BasicInputField
							id="prepTimeHour"
							label="Prep Time (Hours)"
							type="number"
							placeholder="0"
							bind:value={prepTimeHour}
						/>
						<BasicInputField
							id="prepTimeMinutes"
							label="Prep Time (Minutes)"
							type="number"
							placeholder="20"
							bind:value={prepTimeMinutes}
						/>
						<BasicInputField
							id="cookTimeHour"
							label="Cook Time (Hours)"
							type="number"
							placeholder="0"
							bind:value={cookTimeHour}
						/>
						<BasicInputField
							id="cookTimeMinutes"
							label="Cook Time (Minutes)"
							type="number"
							placeholder="30"
							bind:value={cookTimeMinutes}
						/>

						<BasicInputField
							id="servings"
							label="Servings"
							type="number"
							placeholder="4"
							bind:value={servings}
						/>

						<BasicInputField
							id="yield"
							label="Yield"
							placeholder="e.g., 1 cake, 12 cookies"
							bind:value={yieldValue}
						/>

						<Dropdown
							label="Difficulty"
							options={difficultyOptions}
							bind:selectedOption={selectedDifficulty}
							shouldSearch={false}
						/>
					</div>

					{#if groupList?.length > 0}
						<div class="flex items-center gap-3 pt-4">
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
						<p class="font-suez mb-4 text-lg">Ingredients</p>

						<div class="space-y-4">
							{#each ingredients as ingredient, index (index)}
								<div class="flex items-end gap-2">
									<div class="grid flex-1 grid-cols-3 gap-2">
										<div class="col-span-2">
											<BasicInputField
												placeholder="Ingredient name"
												bind:value={ingredient.name}
												id={`ingredient-name-${index}`}
											/>
										</div>
										<BasicInputField
											placeholder="Amount"
											bind:value={ingredient.amount}
											id={`ingredient-amount-${index}`}
										/>
										<BasicInputField
											placeholder="Unit"
											bind:value={ingredient.unit}
											id={`ingredient-unit-${index}`}
										/>
									</div>

									<div>
										<button
											onclick={() => removeIngredient(index)}
											type="button"
											class="create_button_sm shadow_button minus_btn"
										>
											<Minus size="18px" strokeWidth="4px" color="#FFFFFF" />
										</button>
									</div>
								</div>
							{/each}
						</div>

						<div class="mt-4">
							<TextButton action={addIngredient} label="Add Ingredient" RightIcon={Plus} />
						</div>
					</div>

					<div class="mt-10">
						<p class="font-suez mb-4 text-lg">Directions</p>

						<div class="space-y-4">
							{#each directions as direction, index (index)}
								<div class="flex items-start gap-2">
									<div class="flex-1">
										<TextArea
											bind:value={direction.name}
											className="min-h-[80px]"
											placeholder={`Step ${index + 1}`}
											rows={2}
										/>
									</div>

									<div>
										<button
											onclick={() => removeDirection(index)}
											type="button"
											class="create_button_sm shadow_button minus_btn"
										>
											<Minus size="18px" strokeWidth="4px" color="#FFFFFF" />
										</button>
									</div>
								</div>
							{/each}
						</div>

						<div class="mt-4">
							<TextButton action={addDirection} label="Add Direction" RightIcon={Plus} />
						</div>
					</div>

					<div class="mt-10">
						<p class="font-suez mb-4 text-lg">Nutrition Information</p>

						<div class="grid grid-cols-2 gap-4">
							<BasicInputField id="calories" label="Calories" bind:value={calories} />
							<BasicInputField id="totalFat" label="Total Fat" bind:value={totalFat} />
							<BasicInputField id="saturatedFat" label="Saturated Fat" bind:value={saturatedFat} />
							<BasicInputField id="cholesterol" label="Cholesterol" bind:value={cholesterol} />
							<BasicInputField id="sodium" label="Sodium" bind:value={sodium} />
							<BasicInputField id="carbonhydrate" label="Carbohydrate" bind:value={carbonhydrate} />
							<BasicInputField id="sugar" label="Sugar" bind:value={sugar} />
							<BasicInputField id="protein" label="Protein" bind:value={protein} />
							<BasicInputField
								id="dietaryFibers"
								label="Dietary Fibers"
								bind:value={dietaryFibers}
							/>
						</div>
					</div>

					<div class="mt-10">
						<p class="font-suez mb-4 text-lg">Additional Sections</p>

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
											placeholder="e.g., Tips, Storage Instructions"
											label="Section name"
											bind:value={section.name}
											id={`${section.name}-${index}`}
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
													<div class="flex items-end gap-4 md:items-center">
														<div class="flex flex-1 flex-col gap-2 md:flex-row">
															<div class="w-[150px]">
																<Dropdown
																	options={measurementOptions}
																	withClearButton={false}
																	selectedOption={getMeasurement(list.measurement || '')}
																	shouldSearch={false}
																	handleSelectChange={(event: any) =>
																		handleListMeasurementChange(index, idx, event)}
																/>
															</div>

															<div class="flex-1">
																<BasicInputField
																	bind:value={list.value}
																	placeholder="Checklist item"
																	id={`checklist-${list.value}-${idx}`}
																/>
															</div>
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

											<div class="mt-8">
												<TextButton
													action={() => addListItem(index)}
													label="Add Item"
													RightIcon={Plus}
												/>
											</div>
										{/if}

										{#if section.type == SectionType.LIST}
											<p class="mb-2">List items</p>

											{#if section.list}
												{#each section.list as list, idx (idx)}
													<div class="flex items-center gap-2">
														<div class="flex-1">
															<TextArea
																bind:value={list.value}
																className="min-h-[50px]"
																placeholder="List item"
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
											<TextArea label="Paragraph Text" bind:value={section.paragraph} />
										{/if}
									</div>
								{/each}
							</div>

							<div class="mt-4 flex justify-end">
								<div class="w-[150px]">
									<button
										class="shadow_button shadow_button_thin shadow_button_sm flex items-center justify-center"
										type="button"
										onclick={() => addSection()}
									>
										Add Section
										<Plus />
									</button>
								</div>
							</div>
						</div>
					</div>

					<div class="mt-4">
						<label for="notes" class="mb-2">Private</label>

						<div class="flex items-center gap-2">
							<button
								class="button_active relative flex h-7 w-7 items-center justify-center rounded-md border-2 p-0"
								aria-label="Private"
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
