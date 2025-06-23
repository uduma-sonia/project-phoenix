import { browser } from '$app/environment';

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
		if (!browser) return null;
		const cookieName = `${name}=`;
		const decodedCookie = decodeURIComponent(document.cookie);
		const cookies = decodedCookie.split(';');

		for (let cookie of cookies) {
			cookie = cookie.trim();
			if (cookie.startsWith(cookieName)) {
				return cookie.substring(cookieName.length);
			}
		}
		return null;
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

	static copyToClipboard = (value: string): boolean => {
		try {
			const textarea = document.createElement('textarea');
			textarea.value = value;
			document.body.appendChild(textarea);
			textarea.select();
			document.execCommand('copy');
			document.body.removeChild(textarea);
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
}

export default Helpers;
