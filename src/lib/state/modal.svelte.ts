import type { Meal } from '../../types/meal';
import type { TripActivity } from '../../types/trip';

export const modalsState = $state({
	data: {
		isOpen: false,
		isOpenProfile: false,
		isOpenHabitDetails: false,
		isOpenDeleteModal: false,
		isOpenTripDeleteModal: false,
		isOpenBoardDeleteModal: false,
		isOpenImageCarousel: false,
		isOpenPacking: false,
		isOpenAddToList: false,
		isOpenCreateActivity: false,
		isOpenUpdateActivity: false,
		isOpenInstall: false,
		isDeleteMealPlan: false,
		isOpenCreateMealPlan: false,
		isOpenLogValueModal: false,

		isOpenAddTxn: false,
		isOpenTxnCategory: false,
		isOpenTxnSettings: false,

		isOpenMealPlanner: false
	}
});

export const imageCarouselData = $state<{ images: string[]; currentSelectedIndex?: number }>({
	images: [],
	currentSelectedIndex: 0
});

export const selectedActivity = $state<{ data: TripActivity | null }>({
	data: null
});

export const selectedMealPlan = $state<{
	data: { id: string; value: string; description?: string; isEditing?: boolean } | null;
}>({
	data: null
});

export const selectedMeal = $state<{ data: Meal | null }>({
	data: null
});

export function handleSelectMeal(meal: Meal) {
	selectedMeal.data = meal;
}

export function selectActivity(activity: TripActivity) {
	selectedActivity.data = activity;
}

export function openModal() {
	modalsState.data.isOpen = true;
}
export function closeModal() {
	modalsState.data.isOpen = false;
}

export function openProfile() {
	modalsState.data.isOpenProfile = true;
}
export function closeProfile() {
	modalsState.data.isOpenProfile = false;
}

export function openHabitDetails() {
	modalsState.data.isOpenHabitDetails = true;
}
export function closeHabitDetails() {
	modalsState.data.isOpenHabitDetails = false;
}

export function openDeleteModal() {
	modalsState.data.isOpenDeleteModal = true;
}
export function closeDeleteModal() {
	modalsState.data.isOpenDeleteModal = false;
}

export function openTripDeleteModal() {
	modalsState.data.isOpenTripDeleteModal = true;
}
export function closeTripDeleteModal() {
	modalsState.data.isOpenTripDeleteModal = false;
}

export function openBoardDeleteModal() {
	modalsState.data.isOpenBoardDeleteModal = true;
}
export function closeBoardDeleteModal() {
	modalsState.data.isOpenBoardDeleteModal = false;
}

export function openImageCarouselModal() {
	modalsState.data.isOpenImageCarousel = true;
}
export function closeImageCarouselModal() {
	modalsState.data.isOpenImageCarousel = false;
}

export function updateSelectedImage(images: string[], currentSelectedIndex?: number) {
	imageCarouselData.images = images;

	if (currentSelectedIndex) {
		imageCarouselData.currentSelectedIndex = currentSelectedIndex;
	}
}
export function openPackingModal() {
	modalsState.data.isOpenPacking = true;
}
export function closePackingModal() {
	modalsState.data.isOpenPacking = false;
}

export function openAddToListModal() {
	modalsState.data.isOpenAddToList = true;
}
export function closeAddToListModal() {
	modalsState.data.isOpenAddToList = false;
}

export function openCreateActivityModal() {
	modalsState.data.isOpenCreateActivity = true;
}
export function closeCreateActivityModal() {
	modalsState.data.isOpenCreateActivity = false;
}

export function openUpdateActivityModal() {
	modalsState.data.isOpenUpdateActivity = true;
}
export function closeUpdateActivityModal() {
	modalsState.data.isOpenUpdateActivity = false;
}

export function openInstallModal() {
	modalsState.data.isOpenInstall = true;
}
export function closeInstallModal() {
	modalsState.data.isOpenInstall = false;
	sessionStorage.setItem('install_banner_seen', '1');
}

export function openDeleteMealPlanModal(arg: { id: string; value: string }) {
	modalsState.data.isDeleteMealPlan = true;

	selectedMealPlan.data = arg;
}
export function closeDeleteMealPlanModal() {
	modalsState.data.isDeleteMealPlan = false;
	selectedMealPlan.data = null;
}

export function openCreateMealPlanModal(arg?: {
	id: string;
	value: string;
	description?: string;
	isEditing?: boolean;
}) {
	modalsState.data.isOpenCreateMealPlan = true;

	if (arg?.id) {
		selectedMealPlan.data = arg;
	}
}
export function closeCreateMealPlanModal() {
	modalsState.data.isOpenCreateMealPlan = false;
	selectedMealPlan.data = null;
}

export function openLogValueModal() {
	modalsState.data.isOpenLogValueModal = true;
}
export function closeLogValueModal() {
	modalsState.data.isOpenLogValueModal = false;
}

export function openAddTxnModal() {
	modalsState.data.isOpenAddTxn = true;
}
export function closeAddTxnModal() {
	modalsState.data.isOpenAddTxn = false;
}

export function openTxnCategoryModal() {
	modalsState.data.isOpenTxnCategory = true;
}
export function closeTxnCategoryModal() {
	modalsState.data.isOpenTxnCategory = false;
}

export function openTxnSettingsModal() {
	modalsState.data.isOpenTxnSettings = true;
}
export function closeTxnSettingsModal() {
	modalsState.data.isOpenTxnSettings = false;
}

export function openMealPlannerModal() {
	modalsState.data.isOpenMealPlanner = true;
}
export function closeMealPlannerModal() {
	modalsState.data.isOpenMealPlanner = false;
}
