export const modalsState = $state({
	data: {
		isOpen: false,
		isOpenProfile: false,
		isOpenHabitDetails: false,
		isOpenDeleteModal: false,
		isOpenTripDeleteModal: false,
		isOpenBoardDeleteModal: false,
		isOpenImageCarousel: false,
		isOpenPacking: false
	}
});

export const imageCarouselData = $state<{ images: string[]; currentSelectedIndex?: number }>({
	images: [],
	currentSelectedIndex: 0
});

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
