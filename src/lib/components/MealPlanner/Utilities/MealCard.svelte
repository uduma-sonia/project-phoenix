<script lang="ts">
	import { Pen } from '@lucide/svelte';
	import type { Meal, MealResponse } from '../../../../types/meal';
	import CheckBox from '$lib/components/Common/CheckBox.svelte';
	import MealsUtils from './utils';
	import RecipeUsed from './RecipeUsed.svelte';
	import { format } from 'date-fns';
	import { addToast } from '$lib/store/toast';
	import { MealRequest } from '$lib/requests';
	import TimeOfDayTitle from './TimeOfDayTitle.svelte';
	import MealName from './MealName.svelte';

	let {
		timeOfDay,
		meal,
		handleMealItemUpdate,
		currentDay,
		selectedPlan,
		handleSaveNote,
		handleHasEaten
	}: {
		meal: MealResponse;
		timeOfDay: string;
		handleMealItemUpdate: (data: Meal, mealId?: string) => void;
		handleSaveNote: (data: { note: string }, mealId: string) => void;
		handleHasEaten: (mealId: string) => void;
		currentDay: any;
		selectedPlan: { id: string };
	} = $props();

	let isEditingName = $state(false);
	let isEditingNote = $state(false);
	let inputRef: HTMLInputElement | null = $state(null);
	let noteInputRef: HTMLTextAreaElement | null = $state(null);

	let _location = $state(meal?.location || '');
	let _image = $derived(MealsUtils.getFirstRecipeImage(meal?.recipeDetails));
	let recipeList = $derived(MealsUtils.getRecipes(meal?.recipeDetails));
	let mealInput = $state('');
	let noteInput = $state('');
	let mealName = $derived(meal?.name);
	let mealNote = $derived(meal?.note);
	// Prevent double meal creation
	let hasCreated = $state(false);

	function toggleEdit() {
		isEditingName = true;
		setTimeout(() => {
			inputRef?.focus();
		}, 5);
	}

	function toggleEditNote() {
		isEditingNote = true;
		setTimeout(() => {
			noteInputRef?.focus();
		}, 5);
	}

	function resizeTextarea() {
		if (noteInputRef) {
			noteInputRef.style.height = 'auto';
			noteInputRef.style.height = noteInputRef.scrollHeight + 'px';
		}
	}

	function handleUpdateName(mealId: string) {
		if (!hasCreated) {
			let payload = {
				name: mealInput,
				timeOfDay: timeOfDay,
				mealPlanId: selectedPlan?.id,
				date: format(currentDay, 'yyyy-MM-dd'),
				day: format(currentDay, 'iiii'),
				hasEaten: false
			};

			handleMealItemUpdate(payload as Meal, mealId);
			hasCreated = true;
			isEditingName = false;
		}
	}

	function _handleSaveNote(mealId: string) {
		if (!hasCreated) {
			let payload = {
				note: noteInput
			};

			handleSaveNote(payload, mealId);
			hasCreated = true;
			isEditingNote = false;
		}
	}

	function handleBlur(_: any, mealId = '', type: string = 'saveMeal') {
		if (type === 'saveMeal') {
			handleUpdateName(mealId);
		}
		if (type === 'saveNote') {
			_handleSaveNote(mealId);
		}
	}

	function handleKeyDown(event: KeyboardEvent, mealId = '', type: string = 'saveMeal') {
		switch (event.key) {
			case 'Enter':
				if (type === 'saveMeal') {
					handleUpdateName(mealId);
				}
				if (type === 'saveNote') {
					_handleSaveNote(mealId);
				}
				break;
			case 'Escape':
				if (type === 'saveMeal') {
					isEditingName = false;
				}
				if (type === 'saveNote') {
					isEditingNote = false;
				}
				break;
			default:
				if (hasCreated) {
					hasCreated = false;
				}
				break;
		}
	}

	async function handleUpdateLocation(location: string, mealId: string) {
		try {
			if (location) {
				_location = location;
				await MealRequest.updateMealLocation(mealId, { location });
			}
		} catch (error: any) {
			addToast(error?.message || 'An error occured', 'error');
		}
	}

	$effect(() => {
		if (meal?.name) {
			mealInput = meal.name;
		}
		if (meal?.note) {
			noteInput = meal.note;
		}
	});
</script>

<div class="mb-8 max-w-[550px] space-y-2">
	<TimeOfDayTitle {handleHasEaten} {meal} {timeOfDay} {mealName} />

	<div class="flex-1">
		<div class="retro_wrapper balanceCard">
			<div class="retro_wrapper_inner_iwjd">
				<div class="h-auto py-2">
					{#if mealName}
						<MealName
							{isEditingName}
							bind:mealInput
							bind:inputRef
							{handleBlur}
							{handleKeyDown}
							{meal}
							{toggleEdit}
							{mealName}
						/>

						{#if _image}
							<div class="mt-4 block h-18 w-18 rounded-xl">
								<img
									src={_image}
									class="text-10 h-full w-full rounded-xl border object-cover"
									alt="First recipe"
								/>
							</div>
						{/if}

						<RecipeUsed {recipeList} />

						{#if isEditingNote}
							<textarea
								id={`meal-${meal._id}`}
								oninput={resizeTextarea}
								placeholder="Start writing..."
								bind:this={noteInputRef}
								bind:value={noteInput}
								onblur={(e) => handleBlur(e, meal?._id, 'saveNote')}
								onkeydown={(e) => handleKeyDown(e, meal?._id, 'saveNote')}
								class="font-lexend text-15 h-auto w-full resize-none border-none p-0 pt-2 font-light outline-none placeholder:italic"
							>
							</textarea>
						{:else if meal.note}
							<button
								onclick={toggleEditNote}
								class="font-lexend text-15 block h-auto w-full border-none p-0 pt-2 text-left font-light outline-none"
							>
								{mealNote}
							</button>
						{:else}
							<button
								onclick={toggleEditNote}
								class="font-lexend text-15 flex items-center gap-1 border-none py-2 font-light italic"
							>
								Notes <Pen size="13" />
							</button>
						{/if}

						<div class="mt-4 flex gap-3">
							<CheckBox
								isChecked={_location === 'homemade'}
								action={() => handleUpdateLocation('homemade', meal?._id)}
								id="homemade"
								variant="circle"
								color="pink"
								title="Homemade"
							/>
							<CheckBox
								isChecked={_location === 'delivery'}
								action={() => handleUpdateLocation('delivery', meal?._id)}
								id="Delivery"
								title="Delivery"
								variant="circle"
								color="pink"
							/>
							<CheckBox
								isChecked={_location === 'dine_out'}
								action={() => handleUpdateLocation('dine_out', meal?._id)}
								id="dineOut"
								title="Dine out"
								variant="circle"
								color="pink"
							/>
						</div>
					{:else}
						<div>
							{#if isEditingName}
								<div>
									<input
										id={`meal-${crypto.randomUUID()}`}
										bind:value={mealInput}
										bind:this={inputRef}
										type="text"
										class="font-lexend h-auto w-full border-none p-0 text-base font-normal outline-none md:text-lg"
										placeholder="Start writing..."
										onblur={(e) => handleBlur(e, meal?._id)}
										onkeydown={(e) => handleKeyDown(e, meal?._id)}
									/>
								</div>
							{:else}
								<button
									onclick={toggleEdit}
									class="font-lexend flex items-center gap-2 rounded-lg text-base font-light italic md:text-lg"
								>
									No meal recorded or planned
									<Pen size="13" />
								</button>
							{/if}
						</div>
					{/if}
				</div>
			</div>
		</div>
	</div>
</div>

<style>
	.retro_wrapper_inner_iwjd {
		position: relative;
		z-index: 10;
		width: 100%;
		border-radius: 12px !important;
		border: 2px solid black;
		background-color: #fff;
		padding: 2px 12px;
	}

	.balanceCard {
		border-radius: 12px !important;
	}
	.balanceCard::before,
	.balanceCard::after {
		border-radius: 12px !important;
	}
</style>
