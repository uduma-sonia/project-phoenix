export const modalsState = $state({
	data: {
		isOpen: false,
		isOpenProfile: false,
		isOpenHabitDetails: false,
		isOpenDeleteModal: false
	}
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
