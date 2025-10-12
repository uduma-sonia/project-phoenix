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
	tripCompleted?: boolean;
	createdAt?: Date;
	updatedAt?: Date;
	_id?: string;
};

export type TripActivity = {
	ownerId?: string;
	tripId: string;
	name: string;
	groupId?: string;
	instagramLink?: string;
	websiteLink?: string;
	address?: string;
	otherLink?: string;
	menuLink?: string;
	mobile?: string;
	visited?: boolean;
	note?: string;
	day?: string;
	createdAt?: Date;
	updatedAt?: Date;
	_id?: string;
};

export type TripMember = {
	tripId: string;
	ownerId: string;
	memberId: string;
	permissions: string;
};
