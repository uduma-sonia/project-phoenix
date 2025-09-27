export type Trip = {
	ownerId?: string;
	name: string;
	country?: string;
	city?: string;
	start: Date;
	end: Date;
	address?: string;
	hotelName?: string;
	currency?: string;
	numOfPersons?: number;
	budget?: string;
	createdAt?: Date;
	updatedAt?: Date;
};
