export type Variants =
	| 'primary'
	| 'outline'
	| 'danger'
	| 'icon-primary'
	| 'white'
	| 'warning'
	| 'purple'
	| 'blue'
	| 'grey'
	| 'green'
	| 'pink'
	| 'olive'
	| 'biloba'
	| 'orange'
	| 'white_outline'
	| 'outline_danger';

export type ButtonProps = {
	label?: string;
	bgColor?: string;
	variant?: Variants;
	action?: () => void;
	className?: string;
	isLoading?: boolean;
	size?: 's' | 'm' | 'l' | 'xs';
	type?: 'button' | 'reset' | 'submit' | null | undefined;
	Icon?: any;
	iconProps?: any;
	IsDisabled?: boolean;
	LeftIcon?: any;
	leftIconProps?: any;
	hasBadge?: boolean;
	RightIcon?: any;
	rightIconProps?: any;
};
