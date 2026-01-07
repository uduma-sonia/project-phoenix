import { browser } from '$app/environment';
import { addToast } from '$lib/store/toast';
import {
	startOfMonth,
	endOfMonth,
	eachDayOfInterval,
	setHours,
	setMinutes,
	setSeconds,
	setMilliseconds,
	isToday,
	format,
	isTomorrow,
	isYesterday,
	startOfToday,
	addDays,
	endOfDay,
	formatISO,
	startOfDay,
	endOfWeek,
	endOfYear,
	startOfWeek,
	startOfYear,
	getHours,
	eachWeekOfInterval,
	subYears,
	addYears,
	getISOWeek,
	isThisISOWeek,
	subWeeks,
	addWeeks
} from 'date-fns';
import { Permissions, type BoardMember } from '../../types/shopping';
import type { User } from '../../types/user';
import { currencyLocales } from '$lib/constants/currency';

class Helpers {
	static setCookie(name: string, value: string, minutes: number) {
		const d = new Date();
		d.setTime(d.getTime() + minutes * 60 * 1000); // milliseconds
		const expires = 'expires=' + d.toUTCString();
		document.cookie = `${name}=${encodeURIComponent(
			value
		)}; ${expires}; path=/; Secure; SameSite=Strict`;
	}

	static getCookie(name: string) {
		if (!browser) return '';
		const cookieName = `${name}=`;
		const decodedCookie = decodeURIComponent(document.cookie);
		const cookies = decodedCookie.split(';');

		for (let cookie of cookies) {
			cookie = cookie.trim();
			if (cookie.startsWith(cookieName)) {
				return cookie.substring(cookieName.length);
			}
		}
		return '';
	}

	static deleteCookie(name: string) {
		if (!browser) return;
		document.cookie = name + '=; Max-Age=-99999999;';
	}

	static formatQueryParams = (params: Record<string, string | number | boolean>) => {
		return params
			? Object.keys(params)
					.filter((key) => params[key] !== undefined && params[key] !== null && params[key] !== '')
					.map((key) => `${key}=${encodeURIComponent(params[key])}`)
					.join('&')
			: '';
	};

	static cutText(text: string, textLength: number) {
		if (text.length <= textLength) {
			return text;
		} else {
			return text.substring(0, textLength) + '...';
		}
	}

	static copyToClipboard = (value: string, successMsg: string = 'Copied!'): boolean => {
		try {
			const textarea = document.createElement('textarea');
			textarea.value = value;
			document.body.appendChild(textarea);
			textarea.select();
			document.execCommand('copy');
			document.body.removeChild(textarea);
			addToast(successMsg, 'success');
			return true;
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (error: any) {
			console.error(error);
			addToast('Failed', 'error');
			return false;
		}
	};

	static capitalizeFirstLetter = (value: string) => {
		return value.charAt(0).toUpperCase() + value.slice(1);
	};

	static getUserFirstNameAndLastName(user: { fname: string; lname: string }) {
		const firstName = user?.fname;
		const lastName = user?.lname;
		return firstName || lastName ? `${firstName || ''} ${lastName || ''}`.trim() : '';
	}

	static currencyInputFormatter = new Intl.NumberFormat('en-NG', {
		style: 'currency',
		currency: 'NGN',
		minimumFractionDigits: 0,
		maximumFractionDigits: 3
	});

	static currencyFormatter = ({
		currency,
		maximumFractionDigits,
		minimumFractionDigits
	}: {
		currency: string;
		maximumFractionDigits: number;
		minimumFractionDigits: number;
	}) => {
		const locale = currencyLocales[currency] || 'en-NG';
		return new Intl.NumberFormat(locale, {
			style: 'currency',
			currency: currency,
			minimumFractionDigits: minimumFractionDigits,
			maximumFractionDigits: maximumFractionDigits
		});
	};

	/** Dispatch event on click outside of node */
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	static clickOutside(node: any) {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		const handleClick = (event: any) => {
			if (node && !node.contains(event.target) && !event.defaultPrevented) {
				node.dispatchEvent(new CustomEvent('click_outside', node));
			}
		};

		document.addEventListener('click', handleClick, true);

		return {
			destroy() {
				document.removeEventListener('click', handleClick, true);
			}
		};
	}

	static removeEmptyFields(data: Record<string, unknown>) {
		Object.keys(data).forEach((key) => {
			if (data[key] === '' || data[key] == null) {
				delete data[key];
			}
		});
	}

	static generateDaysOfMonth(dateInput: string | Date): Date[] {
		const date = new Date(dateInput);

		const hours = date.getHours();
		const minutes = date.getMinutes();
		const seconds = date.getSeconds();
		const milliseconds = date.getMilliseconds();

		const days = eachDayOfInterval({
			start: startOfMonth(date),
			end: endOfMonth(date)
		});

		return days.map((day) =>
			setMilliseconds(setSeconds(setMinutes(setHours(day, hours), minutes), seconds), milliseconds)
		);
	}

	static getRelativeDate(date: Date, _format = 'dd MMM, yyyy'): string {
		if (isToday(date)) {
			return 'Today';
		} else if (isYesterday(date)) {
			return 'Yesterday';
		} else if (isTomorrow(date)) {
			return 'Tomorrow';
		} else {
			return format(date, _format);
		}
	}

	static getRelativeWeek(date: Date): string {
		if (isThisISOWeek(date)) {
			return 'This week';
		} else if (isThisISOWeek(subWeeks(date, 1))) {
			return 'Next week';
		} else if (isThisISOWeek(addWeeks(date, 1))) {
			return 'Last week';
		} else {
			return `Week ${getISOWeek(date)}`;
		}
	}

	static generateScrollableDays(range = 180) {
		const days = [];
		const today = startOfToday();

		for (let i = -range; i <= range; i++) {
			const date = addDays(today, i);
			days.push(date);
		}

		return days;
	}

	static getStartAndEndDates({
		startDate,
		endDate,
		dateViewing
	}: {
		startDate?: string | Date;
		endDate?: string | Date;
		dateViewing?: string | Date;
	}) {
		if (dateViewing) {
			return {
				start: formatISO(startOfDay(new Date(dateViewing))),
				end: formatISO(endOfDay(new Date(dateViewing)))
			};
		}

		if (startDate && endDate) {
			return {
				start: formatISO(startOfDay(new Date(startDate))),
				end: formatISO(endOfDay(new Date(endDate)))
			};
		}

		return {
			start: formatISO(startOfDay(new Date())),
			end: formatISO(endOfDay(new Date()))
		};
	}

	static returnS(arg: number) {
		if (arg === 1) {
			return '';
		} else {
			return 's';
		}
	}

	static generateYearRange(date: Date) {
		const months = [
			{ name: 'january', index: 0 },
			{ name: 'february', index: 1 },
			{ name: 'march', index: 2 },
			{ name: 'april', index: 3 },
			{ name: 'may', index: 4 },
			{ name: 'june', index: 5 },
			{ name: 'july', index: 6 },
			{ name: 'august', index: 7 },
			{ name: 'september', index: 8 },
			{ name: 'october', index: 9 },
			{ name: 'november', index: 10 },
			{ name: 'december', index: 11 }
		];

		const allDays = eachDayOfInterval({
			start: startOfYear(date),
			end: endOfYear(date)
		});

		const grouped = months.map(({ name, index }) => {
			const days = allDays.filter((d) => d.getMonth() === index);
			return { month: name, days };
		});

		return grouped;
	}

	static getDateRange(dateType: string, dateValue?: string | Date) {
		const today = dateValue || new Date();

		switch (dateType) {
			case 'today':
				return {
					startDate: formatISO(startOfDay(today)),
					endDate: formatISO(endOfDay(today))
				};

			case 'week':
				return {
					startDate: formatISO(startOfWeek(today, { weekStartsOn: 0 })),
					endDate: formatISO(endOfWeek(today, { weekStartsOn: 0 }))
				};

			case 'month':
				return {
					startDate: formatISO(startOfMonth(today)),
					endDate: formatISO(endOfMonth(today))
				};

			case 'year':
				return {
					startDate: formatISO(startOfYear(today)),
					endDate: formatISO(endOfYear(today))
				};

			default:
				return {
					startDate: formatISO(startOfDay(today)),
					endDate: formatISO(endOfDay(today))
				};
		}
	}

	static checkFileSize(file: File, size: number) {
		const sizeInMB = file.size / (1024 * 1024);
		return sizeInMB > size;
	}

	static createSlug(str?: string) {
		if (!str) return '';

		return str
			.toLowerCase()
			.replace(/[^\w\s]/g, '')
			.replace(/\s+/g, '-');
	}

	static generateRandomNumber(min: number, max: number) {
		return Math.floor(Math.random() * max) + min;
	}

	static toISOString(arg: Date) {
		if (arg) {
			const date = new Date(arg); // Current date and time

			const year = date.getFullYear();
			const month = (date.getMonth() + 1).toString().padStart(2, '0');
			const day = date.getDate().toString().padStart(2, '0');
			const hours = date.getHours().toString().padStart(2, '0');
			const minutes = date.getMinutes().toString().padStart(2, '0');
			const seconds = date.getSeconds().toString().padStart(2, '0');
			const milliseconds = date.getMilliseconds().toString().padStart(3, '0');

			const tzOffset = -date.getTimezoneOffset();
			const tzSign = tzOffset >= 0 ? '+' : '-';
			const tzHours = Math.floor(Math.abs(tzOffset) / 60)
				.toString()
				.padStart(2, '0');
			const tzMinutes = (Math.abs(tzOffset) % 60).toString().padStart(2, '0');

			const isoStringWithTimezone = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.${milliseconds}${tzSign}${tzHours}:${tzMinutes}`;

			return isoStringWithTimezone;
		}
	}

	static transformObjectToList(arg: Record<string, unknown>) {
		if (arg) {
			return Object.keys(arg).map((item) => {
				return {
					id: item,
					details: arg[item]
				};
			});
		}
	}

	static sumArray(numbers: number[] = []): number {
		return numbers.reduce((sum, num) => sum + num, 0);
	}

	static getPermission(membersList: BoardMember[], user: User, ownerId?: string) {
		const memberIdList = membersList?.map((item: { memberId: string }) => item.memberId);

		if (user?._id) {
			if (ownerId === user?._id) {
				return Permissions.OWNER;
			}

			if (memberIdList) {
				if (user?.email) {
					if (memberIdList.includes(user.email)) {
						const getMember = membersList.find(
							(item: { memberId: string }) => item.memberId === user?.email
						);

						if (getMember?.permissions === Permissions.CAN_EDIT) {
							return Permissions.CAN_EDIT;
						} else {
							return Permissions.READ_ONLY;
						}
					}
				} else {
					return Permissions.UNAUTHORIZED;
				}
			}
		}
	}

	static getTimeOfDay(date: Date = new Date()): 'morning' | 'afternoon' | 'evening' {
		const hour = getHours(date);
		if (hour >= 5 && hour < 12) return 'morning';
		if (hour >= 12 && hour < 18) return 'afternoon';
		return 'evening';
	}
	static generateRandomCharacters(length: number) {
		let result = '';
		const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
		const charactersLength = characters.length;
		let counter = 0;
		while (counter < length) {
			result += characters.charAt(Math.floor(Math.random() * charactersLength));
			counter += 1;
		}
		return result;
	}

	static scrollTo(id: string) {
		const el = document.getElementById(id);
		el?.scrollIntoView({ behavior: 'smooth', inline: 'center' });
	}

	static generateWeekList() {
		const today = new Date();

		const start = subYears(today, 1);
		const end = addYears(today, 1);

		// Generate array of the start date for each week
		const weeks = eachWeekOfInterval(
			{ start, end },
			{ weekStartsOn: 1 } // ISO week (Monday start)
		);

		// Convert each to ISO week number and string
		return weeks.map((date) => String(getISOWeek(date)));
	}

	static convertNumber(num: number) {
		if (num >= 1e9) {
			return (num / 1e9).toFixed(1).replace(/\.0$/, '') + 'B';
		}
		if (num >= 1e6) {
			return (num / 1e6).toFixed(1).replace(/\.0$/, '') + 'M';
		}
		if (num >= 1e3) {
			return (num / 1e3).toFixed(1).replace(/\.0$/, '') + 'k';
		}
		return num.toString();
	}
}

export default Helpers;
