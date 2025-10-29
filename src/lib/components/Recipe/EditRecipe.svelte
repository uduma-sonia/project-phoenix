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
		type Directions,
		type Ingredient,
		type Recipe,
		type RecipeGroup,
		type RecipeResponse,
		type RecipeSection
	} from '../../../types/recipe';
	import TextArea from '../Common/Form/TextArea.svelte';
	import TextButton from '../Common/Form/TextButton.svelte';
	import { difficultyOptions, typeOptions } from '$lib/constants/recipe';
	import { queryKeys } from '$lib/utils/queryKeys';
	import { goto } from '$app/navigation';
	import { RecipeRequest, UtilsRequest } from '$lib/requests';
	import { page } from '$app/state';
	import type { User } from '../../../types/user';
	import { BUNNY_STORAGE_BASE } from '$lib/constants/global';
	import BasicButton from '../Common/Form/BasicButton.svelte';

	let {
		recipe,
		groupList,
		user
	}: { recipe: RecipeResponse; groupList: { name: string; _id: string }[]; user: User } = $props();

	const queryClient = useQueryClient();

	let ownerId = $derived(page.url.searchParams.get('owner'));

	let imageOneEl: any = $state(null);
	let imageTwoEl: any = $state(null);
	let imageThreeEl: any = $state(null);

	// Initialize with existing recipe images
	let imageOneUrl = $state(recipe?.images?.[0] || '');
	let imageTwoUrl = $state(recipe?.images?.[1] || '');
	let imageThreeUrl = $state(recipe?.images?.[2] || '');

	let recipeName = $state(recipe?.name);
	let isSubmitting = $state(false);
	let isPrivate = $state(recipe?.isPrivate);
	let withConverter = $state(recipe?.withConverter);
	let description = $state(recipe?.description || '');
	let prepNote = $state(recipe?.prepNote || '');
	let prepTimeHour = $state(recipe?.prepTime?.hour?.toString() || '');
	let prepTimeMinutes = $state(recipe?.prepTime?.minutes?.toString() || '');
	let cookTimeHour = $state(recipe?.cookTime?.hour?.toString() || '');
	let cookTimeMinutes = $state(recipe?.cookTime?.minutes?.toString() || '');
	let servings = $state(recipe?.servings?.toString() || '');
	let yieldValue = $state(recipe?.yield || '');
	let selectedDifficulty = $state({
		value: recipe?.difficulty || 'Easy',
		id: recipe?.difficulty || 'EASY'
	});

	// Nutrition fields
	let calories = $state(recipe?.nutrition?.calories || '');
	let totalFat = $state(recipe?.nutrition?.totalFat || '');
	let saturatedFat = $state(recipe?.nutrition?.saturatedFat || '');
	let cholesterol = $state(recipe?.nutrition?.cholesterol || '');
	let sodium = $state(recipe?.nutrition?.sodium || '');
	let carbonhydrate = $state(recipe?.nutrition?.carbonhydrate || '');
	let sugar = $state(recipe?.nutrition?.sugar || '');
	let protein = $state(recipe?.nutrition?.protein || '');
	let dietaryFibers = $state(recipe?.nutrition?.dietaryFibers || '');

	let selectedGroupList: RecipeGroup[] = $state(recipe?.groups || []);

	// Ingredients
	let ingredients = $state<Ingredient[]>(
		recipe?.ingredients || [
			{
				name: '',
				amount: '',
				unit: ''
			}
		]
	);

	let directions = $state<Directions[]>(
		recipe?.directions || [
			{
				name: ''
			}
		]
	);

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
		document.querySelector<HTMLInputElement>(id)?.click();
	}

	function addListItem(idx: number) {
		const _sections = $state.snapshot(sections);
		const result: any[] = _sections.map((section, index) => {
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

	const handleFileChange = (name: string) => {
		const fileOne = imageOneEl?.files[0];
		const fileTwo = imageTwoEl?.files[0];
		const fileThree = imageThreeEl?.files[0];
		const maxSizeInBytes = 1 * 1024 * 1024; // 1MB
		const reader = new FileReader();

		switch (name) {
			case 'recipe-image-one':
				if (fileOne) {
					if (fileOne.size > maxSizeInBytes) {
						addToast('File size exceeds the limit (1MB)', 'error');
						return;
					}

					reader.onload = (e: any) => {
						const base64String = e.target.result.split(',')[1];
						imageOneUrl = 'data:application/jpeg;base64,' + base64String;
					};
					reader.readAsDataURL(fileOne);
				}
				break;
			case 'recipe-image-two':
				if (fileTwo) {
					if (fileTwo.size > maxSizeInBytes) {
						addToast('File size exceeds the limit (1MB)', 'error');
						return;
					}

					reader.onload = (e: any) => {
						const base64String = e.target.result.split(',')[1];
						imageTwoUrl = 'data:application/jpeg;base64,' + base64String;
					};
					reader.readAsDataURL(fileTwo);
				}
				break;

			default:
				if (fileThree) {
					if (fileThree.size > maxSizeInBytes) {
						addToast('File size exceeds the limit (1MB)', 'error');
						return;
					}

					reader.onload = (e: any) => {
						const base64String = e.target.result.split(',')[1];
						imageThreeUrl = 'data:application/jpeg;base64,' + base64String;
					};
					reader.readAsDataURL(fileThree);
				}

				break;
		}
	};

	function filterSection(sections: RecipeSection[]) {
		return sections.filter((item) => item.name);
	}

	function filterIngredients(ingredients: Ingredient[]) {
		return ingredients.filter((item) => item.name);
	}

	function filterDirections(directions: Directions[]) {
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
		try {
			isSubmitting = true;

			const payload: Recipe = {
				name: recipeName,
				slug: Helpers.createSlug(recipeName),
				description,
				prepNote,
				prepTime: {
					hour: prepTimeHour ? Number(prepTimeHour) : 0,
					minutes: prepTimeMinutes ? Number(prepTimeMinutes) : 0
				},
				cookTime: {
					hour: cookTimeHour ? Number(cookTimeHour) : 0,
					minutes: cookTimeMinutes ? Number(cookTimeMinutes) : 0
				},
				servings: servings ? Number(servings) : 0,
				yield: yieldValue,
				difficulty: selectedDifficulty.id,
				groups: $state.snapshot(selectedGroupList),
				images: [imageOneUrl, imageTwoUrl, imageThreeUrl].filter((item) => item),
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
				withConverter: withConverter,
				sections: $state.snapshot(filterSection(sections))
			};

			const result = await RecipeRequest.updateRecipe(recipe?._id as string, payload);

			if (result) {
				queryClient.invalidateQueries({
					queryKey: queryKeys.getSingleRecipe(page.params.id, ownerId as string)
				});
				addToast('Recipe updated', 'success', { imgLink: '/images/confetti.svg' });
				goto(`/recipe/${Helpers.createSlug(recipeName)}?owner=${ownerId}`);
			}
		} catch (error: any) {
			addToast(error?.message || 'An error occured', 'error');
		} finally {
			isSubmitting = false;
		}
	}

	async function handleImageUpload() {
		const files = [imageOneEl?.files[0], imageTwoEl?.files[0], imageThreeEl?.files[0]];

		try {
			const results = await Promise.all(
				files.map((file) =>
					file
						? UtilsRequest.uploadImage({
								title: 'business',
								name: `${Helpers.createSlug(user.username)}_${file.name}`,
								image: file
							})
						: Promise.resolve(null)
				)
			);

			const [fileOne, fileTwo, fileThree] = files;

			// Only update URLs if new files were uploaded
			if (results[0])
				imageOneUrl = `${BUNNY_STORAGE_BASE}/business/${Helpers.createSlug(user.username)}_${fileOne.name}`;
			if (results[1])
				imageTwoUrl = `${BUNNY_STORAGE_BASE}/business/${Helpers.createSlug(user.username)}_${fileTwo.name}`;
			if (results[2])
				imageThreeUrl = `${BUNNY_STORAGE_BASE}/business/${Helpers.createSlug(user.username)}_${fileThree.name}`;

			await handleSubmit();
		} catch (error) {
			console.error(error);
			addToast('Image upload failed', 'error');
		}
	}

	function onSubmit() {
		if (!recipeName) {
			const recipeEl = document.getElementById('editRecipe');
			recipeEl?.scrollIntoView({ behavior: 'smooth', inline: 'center' });
			addToast('Name required', 'error');
			return;
		}

		handleImageUpload();
	}
</script>

<input
	type="file"
	id="image_one"
	name="image_one"
	accept="image/*"
	class="invisible absolute bottom-0 left-0"
	bind:this={imageOneEl}
	onchange={() => handleFileChange('recipe-image-one')}
/>
<input
	type="file"
	id="image_two"
	name="image_two"
	accept="image/*"
	class="invisible absolute bottom-0 left-0"
	bind:this={imageTwoEl}
	onchange={() => handleFileChange('recipe-image-two')}
/>
<input
	type="file"
	id="image_three"
	name="image_three"
	accept="image/*"
	class="invisible absolute bottom-0 left-0"
	bind:this={imageThreeEl}
	onchange={() => handleFileChange('recipe-image-three')}
/>

<div id="editRecipe">
	<div class="mx-auto w-full md:max-w-[600px]">
		<BackComponent backLink="/recipe" />
	</div>

	<div class="mt-4 flex items-center justify-center px-4 pb-52">
		<div class="login_form_wrapper w-full md:max-w-[600px]">
			<div class="login_form h-full rounded-3xl border-2 bg-white" id="edit-recipe-form">
				<div class="pb-3">
					<p class="font-suez text-2xl">Edit Recipe</p>
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
								class="relative h-[120px] w-full rounded-lg border"
								type="button"
								onclick={() => handleBrowseClick('#image_one')}
							>
								{#if imageOneUrl}
									<img
										src={imageOneUrl}
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
								class="relative h-[120px] w-full rounded-lg border"
								type="button"
								onclick={() => handleBrowseClick('#image_two')}
							>
								{#if imageTwoUrl}
									<img
										src={imageTwoUrl}
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
								class="relative h-[120px] w-full rounded-lg border"
								type="button"
								onclick={() => handleBrowseClick('#image_three')}
							>
								{#if imageThreeUrl}
									<img
										src={imageThreeUrl}
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

						<div class="space-y-6">
							{#each ingredients as ingredient, index (index)}
								<div class="flex items-start gap-2">
									<div class="pt-1">
										<button class="grid grid-cols-2 gap-1">
											{#each [...new Array(4)] as _, index}
												<span class="block h-1.5 w-1.5 rounded-lg bg-gray-800"> </span>
											{/each}
										</button>
									</div>
									<div class="flex-1 space-y-2">
										<BasicInputField
											placeholder="Ingredient name"
											bind:value={ingredient.name}
											id={`ingredient-name-${index}`}
										/>
										<div class="grid flex-1 grid-cols-2 gap-2">
											<BasicInputField
												placeholder="Amount. eg., 1 , 1/2"
												bind:value={ingredient.amount}
												id={`ingredient-amount-${index}`}
											/>
											<BasicInputField
												placeholder="Unit, eg., cup, teaspoon"
												bind:value={ingredient.unit}
												id={`ingredient-unit-${index}`}
											/>
										</div>
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
														<div class="flex-1">
															<BasicInputField
																bind:value={list.value}
																placeholder="Checklist item"
																id={`checklist-${list.value}-${idx}`}
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

					<div class="mt-6">
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

					<div class="mt-4">
						<div class="flex items-center gap-2">
							<button
								class="button_active relative flex h-7 w-7 items-center justify-center rounded-md border-2 p-0"
								aria-label="withConverter"
								type="button"
								onclick={() => (withConverter = !withConverter)}
							>
								{#if withConverter}
									<Check size="22px" />
								{/if}
							</button>

							<p class="font-lexend text-sm font-light">Allow ingredients to be multiplied</p>
						</div>
					</div>
				</div>

				<div>
					<BasicButton label="Update" type="button" action={onSubmit} isLoading={isSubmitting} />
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
