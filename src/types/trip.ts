export type Trip = {
	ownerId?: string;
	name: string;
	country?: string;
	city?: string;
	start?: string;
	end?: string;
	address?: string;
	hotelName?: string;
	currency?: string;
	numOfPersons?: number;
	budget?: string;
	createdAt?: Date;
	updatedAt?: Date;
};
