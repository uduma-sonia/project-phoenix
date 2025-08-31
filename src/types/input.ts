export type InputType =
	| 'text'
	| 'email'
	| 'password'
	| 'tel'
	| 'url'
	| 'search'
	| 'number'
	| 'date'
	| 'datetime-local'
	| 'time'
	| 'month'
	| 'week'
	| 'color'
	| 'file'
	| 'hidden'
	| 'range';

export interface InputFieldProps {
	label: string;
	value: string;
	id: string;
	name?: string;
	type?: InputType;
	placeholder?: string;
	required?: boolean;
	disabled?: boolean;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	[key: string]: any;
}

export interface InputFieldPropsExtended
	extends Omit<HTMLInputElement, 'value' | 'type' | 'name' | 'id'> {
	label: string;
	value: string;
	id: string;
	name?: string;
	type?: InputType;
}

export interface InputFieldPropsFromAttributes {
	label: string;
	value: string;
	id: string;
	name?: string;
	type?: InputType;
	placeholder?: string;
	required?: boolean;
	disabled?: boolean;
	readonly?: boolean;
	autocomplete?: string;
	pattern?: string;
	min?: string | number;
	max?: string | number;
	step?: string | number;
	minlength?: number;
	maxlength?: number;
	size?: number;
	multiple?: boolean;
	accept?: string;
}
