import { ChefHat, ShoppingCart, Sprout, WalletMinimal } from '@lucide/svelte';

export const AUTH_TOKEN = 'phoenix_token';
export const RECIPE_COUNT_TRACKER = 'recipe_ct';

export const avatarSets = [
	{
		id: 'set1'
	},
	{
		id: 'set1'
	},
	{
		id: 'set1'
	},
	{
		id: 'set1'
	},
	{
		id: 'set1'
	},
	{
		id: 'set1'
	},
	{
		id: 'set2'
	},
	{
		id: 'set2'
	},
	{
		id: 'set2'
	},
	{
		id: 'set2'
	},
	{
		id: 'set2'
	},
	{
		id: 'set2'
	},
	{
		id: 'set3'
	},
	{
		id: 'set3'
	},
	{
		id: 'set3'
	},
	{
		id: 'set3'
	},
	{
		id: 'set3'
	},
	{
		id: 'set3'
	},
	{
		id: 'set4'
	},
	{
		id: 'set4'
	},
	{
		id: 'set4'
	},
	{
		id: 'set4'
	},
	{
		id: 'set4'
	},
	{
		id: 'set4'
	}
];

export const PINTEREST_BASE_URL = 'https://www.pinterest.com/pin/create/button';

export const PAGE_REDIRECTED_FROM_KEY = 'p_redirect_key';

export const profileLinks = [
	{
		label: 'Profile',
		id: 'profile'
	},
	{
		label: 'Security',
		id: 'security'
	},
	// {
	// 	label: 'Subscription',
	// 	id: 'subscription'
	// },
	// {
	// 	label: 'Help',
	// 	id: 'help'
	// },
	{
		label: 'Help',
		id: 'help'
	}
];

export const publicRoutes = ['/', 'login', ' signup', 'forgot-password', 'reset-password'];

export const BUNNY_STORAGE_BASE = 'https://laniva.b-cdn.net';

export const homeFeaturesList = [
	{
		id: 'expense',
		title: 'Expense Tracker',
		icon: WalletMinimal,
		imageUrl: '/images/expense_img.jpg',
		features: [
			'Track income and expenses effortlessly',
			'Visualize spending trends with daily charts',
			'Categorize transactions and view breakdowns',
			'Monitor balance, totals, and financial insights'
			// 'Paginated transaction history',
			// 'Add, edit, and delete transactions easily'
		]
	},
	{
		id: 'tracker',
		title: 'Track your habits',
		icon: Sprout,
		imageUrl: '/images/tracker_img.jpg',
		isReverse: true,
		features: [
			'Straightfoward habit tracker without the distracting bits',
			'Build streaks and visualize progress with minimal setup',
			'Progress charts and monthly/yearly trends',
			'Streaks, streak freeze and streak history to keep momentum'
		]
	},
	{
		id: 'shopping',
		title: 'Shopping list',
		icon: ShoppingCart,
		imageUrl: '/images/shopping_list_img.jpg',
		features: [
			'Create collaborative lists for your home, and grocery runs',
			'Add items as you remember, never forget anything again',
			'Print/export lists and email or share invite links',
			'Shared boards with real-time sync'
		]
	},
	{
		id: 'recipe',
		title: 'Recipe manager',
		icon: ChefHat,
		imageUrl: '/images/recipe_img2.jpg',
		isReverse: true,

		features: [
			'Straightfoward recipe manager',
			'Generate shopping lists',
			'Scale ingredients by servings and auto-convert units',
			'Share recipes or publish public recipe pages'
		]
	}
	// {
	// 	id: 'trip',
	// 	title: 'Plan your trips',
	// 	icon: Plane,
	// 	imageUrl: '/images/trip_img.jpg',
	// 	isReverse: true,
	// 	features: [
	// 		'Plan perfect trips with itineraries, activities and packing list',
	// 		'Collaborate with others or go solo.',
	// 		'Packing lists',
	// 		'Build itineraries with days, activities and times'
	// 	]
	// }
];

export const plansList = [
	{
		amount: 'Free',
		interval: '',
		discount: '',
		offerings: [
			'Expense tracker with charts and insights',
			'Shopping lists with real-time collaboration',
			'Recipe manager with ingredient scaling',
			'Meal planner with recipe linking',
			'Shared recipes and shopping lists',
			'Unlimited habit tracker with analytics',
		],
		isFree: true
	}
	// {
	// 	amount: '$4',
	// 	interval: 'Monthly',
	// 	discount: '',
	// 	offerings: [
	// 		'Shared shopping list',
	// 		'Unlimited recipes',
	// 		'Group trip planner',
	// 		'Streak protection',
	// 		'Meal planner'
	// 	]
	// }
];
