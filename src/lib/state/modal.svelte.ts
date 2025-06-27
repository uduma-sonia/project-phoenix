export const modalsState = $state({
	data: {
		isOpen: false
	}
});

export function openModal() {
	modalsState.data.isOpen = true;
}
export function closeModal() {
	modalsState.data.isOpen = false;
}
