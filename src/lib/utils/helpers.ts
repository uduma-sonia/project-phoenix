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
	startOfYear
} from 'date-fns';

class Helpers {
	static setCookie(name: string, value: string, minutes: number) {
		const d = new Date();
		d.setTime(d.getTime() + minutes * 60 * 1000); // Calculate expiration time in milliseconds
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

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	static formatQueryParams = (params: any) => {
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
			// customErrorToast(error);
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

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	static removeEmptyFields(data: any) {
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

		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		const grouped: any = months.map(({ name, index }) => {
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

	static createSlug(str: string) {
		return str
			.toLowerCase()
			.replace(/[^\w\s]/g, '')
			.replace(/\s+/g, '-');
	}
}

export default Helpers;
