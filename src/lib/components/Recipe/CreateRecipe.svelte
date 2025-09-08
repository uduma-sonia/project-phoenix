<script lang="ts">
	import { Check, Minus, Plus } from '@lucide/svelte';
	import BackComponent from '../Common/BackComponent.svelte';
	import Helpers from '$lib/utils/helpers';
	import { addToast } from '$lib/store/toast';
	import { recipeRequest } from '$lib/requests';
	import { goto } from '$app/navigation';
	import { useQueryClient } from '@tanstack/svelte-query';
	import { queryKeys } from '$lib/utils/queryKeys';

	const queryClient = useQueryClient();

	let textarea: any = $state(null);
	let inputElement: any = $state(null);
	let fileName = $state('');
	let base64Image = $state('');
	let recipeName = $state('');
	let notes = $state('');
	let isSubmitting = $state(false);
	let isPrivate = $state(false);

	let ingredientsList = $state([
		{
			value: ''
		}
	]);
	let methodsList = $state([
		{
			value: ''
		}
	]);

	function removeIngredient(idx: number) {
		const _filter = ingredientsList.filter((_, index) => index !== idx);
		ingredientsList = _filter;
	}

	function addIngredient() {
		const newObj = {
			value: ''
		};
		ingredientsList = [...ingredientsList, newObj];
	}

	function removeMethod(idx: number) {
		const _filter = methodsList.filter((_, index) => index !== idx);
		methodsList = _filter;
	}

	function addMethod() {
		const newObj = {
			value: ''
		};
		methodsList = [...methodsList, newObj];
	}

	const resizeTextarea = () => {
		textarea.style.height = 'auto';
		textarea.style.height = textarea.scrollHeight + 'px';
	};

	const handleBrowseClick = () => {
		document.querySelector<HTMLInputElement>('#media')?.click();
	};

	const handleFileChange = () => {
		const file = inputElement?.files[0];
		const _fileName = file?.name;
		const reader = new FileReader();

		if (file) {
			fileName = _fileName;
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
	};

	function getValue(arr: any) {
		const mappedArr = arr?.map((item: any) => {
			return {
				value: item?.value
			};
		});

		const filteredArr = mappedArr.filter((item: { value: string }) => item.value);

		return filteredArr;
	}

	async function handleSubmit(e: any) {
		e.preventDefault();

		try {
			isSubmitting = true;

			const payload = {
				name: recipeName,
				note: notes,
				imageUrl:
					'https://res.cloudinary.com/dbqgv8zl7/image/upload/v1757271882/sweettreatsrecipes_-_Best_dessert_recipes_veeqp4.jpg',
				isPrivate: isPrivate,
				ingredients: getValue(ingredientsList),
				method: getValue(methodsList),
				slug: Helpers.createSlug(recipeName)
			};

			const result = await recipeRequest.createRecipe(payload);

			if (result) {
				queryClient.invalidateQueries({ queryKey: queryKeys.getRecipes });
				goto('/recipe');
			}
		} catch (error: any) {
			addToast(error || 'An error occured', 'error');
		} finally {
			isSubmitting = false;
		}
	}
</script>

<input
	type="file"
	id="media"
	name="media"
	accept="image/*"
	class="invisible absolute bottom-0 left-0"
	bind:this={inputElement}
	onchange={handleFileChange}
/>

<div>
	<div class="mx-auto w-full px-4 md:max-w-[500px]">
		<BackComponent backLink="/recipe" />
	</div>

	<div class="mt-4 flex items-center justify-center px-4 pb-52">
		<div class="login_form_wrapper w-full md:max-w-[500px]">
			<form class="login_form h-full rounded-3xl border-2 bg-white" onsubmit={handleSubmit}>
				<div class="pb-3">
					<p class="font-suez text-2xl">Create Recipe</p>
				</div>

				<hr />

				<div class="mb-10 space-y-4 pt-5">
					<div>
						<label for="recipeName" class="mb-2">Name</label>
						<input
							type="text"
							id="recipeName"
							name="recipeName"
							required
							bind:value={recipeName}
							class="h-[50px] w-full rounded-lg border-2 border-black px-3 outline-none"
						/>
					</div>

					<div>
						<div>
							<p class="mb-2">Ingredients</p>

							<div class="space-y-3">
								{#each ingredientsList as ingredient, index (index)}
									<div class="flex items-center gap-3">
										<input
											type="text"
											bind:value={ingredient.value}
											class="h-[50px] w-full rounded-lg border-2 border-black px-3 outline-none"
										/>

										<div class="flex justify-center">
											<button
												type="button"
												class="create_button_sm shadow_button minus_btn"
												onclick={() => removeIngredient(index)}
											>
												<Minus size="16px" />
											</button>
										</div>
									</div>
								{/each}
							</div>
						</div>

						<div class="mt-4">
							<button
								type="button"
								class="text-brand-green flex items-center"
								onclick={() => addIngredient()}
							>
								Add Ingredient

								<Plus size="20px" />
							</button>
						</div>
					</div>

					<div>
						<div>
							<p class="mb-2">Instructions</p>

							<div class="space-y-3">
								{#each methodsList as method, index (index)}
									<div class="flex items-center gap-3">
										<input
											type="text"
											bind:value={method.value}
											class="h-[50px] w-full rounded-lg border-2 border-black px-3 outline-none"
										/>

										<div class="flex justify-center">
											<button
												type="button"
												class="create_button_sm shadow_button minus_btn"
												onclick={() => removeMethod(index)}
											>
												<Minus size="16px" />
											</button>
										</div>
									</div>
								{/each}
							</div>
						</div>

						<div class="mt-4">
							<button
								type="button"
								class="text-brand-green flex items-center"
								onclick={() => addMethod()}
							>
								Add Instruction

								<Plus size="20px" />
							</button>
						</div>
					</div>

					<div>
						<label for="notes" class="mb-2">Notes</label>
						<!-- svelte-ignore element_invalid_self_closing_tag -->
						<textarea
							id="notes"
							oninput={resizeTextarea}
							bind:this={textarea}
							rows={5}
							bind:value={notes}
							class="font-lexend w-full rounded-lg border-2 border-black p-3 text-left font-light outline-none"
						/>
					</div>

					<div>
						<label for="notes" class="mb-2">Image</label>

						<button
							class="relative h-[200px] w-full rounded-lg border-2 border-black"
							onclick={handleBrowseClick}
							type="button"
						>
							{#if base64Image}
								<img
									src={base64Image}
									class="h-full max-h-full w-full max-w-full rounded-lg object-cover"
									alt=""
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
					<button class="shadow_button" type="submit">
						{#if isSubmitting}
							<div class="spinner_white border-2 border-black"></div>
						{:else}
							Save
						{/if}
					</button>
				</div>
			</form>
		</div>
	</div>
</div>

<style>
	.minus_btn {
		width: 30px !important;
		height: 30px !important;
	}
</style>
