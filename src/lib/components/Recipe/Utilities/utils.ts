import { PINTEREST_BASE_URL } from '$lib/constants/global';
import Helpers from '$lib/utils/helpers';
import { RecipeStandardMeasurements, type RecipeResponse } from '../../../../types/recipe';

class RecipeUtils {
	static getlist(arr: RecipeResponse[], currentTab: string, ownerId: string, searchQuery: string) {
		const result = arr?.filter((item) => {
			const groupList: string[] = item?.groups?.length
				? item?.groups.map((item: { name: string }) => item.name)
				: [];

			if (currentTab === 'All') {
				return item;
			} else if (currentTab === 'Saved') {
				if (item.savedBy.includes(ownerId)) {
					return item;
				}
			} else {
				if (groupList.includes(currentTab)) {
					return item;
				}
			}
		});

		return result?.filter((item) => item.name.toUpperCase().includes(searchQuery?.toUpperCase()));
	}

	static generateMeasurementsOptions() {
		return Object.entries(RecipeStandardMeasurements).map(([id, value]) => ({
			id,
			value
		}));
	}

	static shareToPinterest(images: string[], name: string) {
		const baseUrl = PINTEREST_BASE_URL;
		const url = 'https://laniva.app' + window.location.pathname;
		const media = images?.length ? images[0] : '';
		const description = name || '';
		const pinterestUrl = `${baseUrl}?${Helpers.formatQueryParams({ url, media, description })}`;
		window.open(pinterestUrl, '_blank', 'noopener,noreferrer');
	}

	static parseQuantity(quantityStr: string): number {
		if (!quantityStr || quantityStr.trim() === '') return 0;

		quantityStr = quantityStr.trim();

		if (quantityStr.includes(' ')) {
			const parts = quantityStr.split(' ');
			const wholeNumber = parseFloat(parts[0]) || 0;
			const fraction = parts[1];

			if (fraction.includes('/')) {
				const [numerator, denominator] = fraction.split('/').map(Number);
				return wholeNumber + numerator / denominator;
			}
			return wholeNumber;
		}

		if (quantityStr.includes('/')) {
			const [numerator, denominator] = quantityStr.split('/').map(Number);
			return numerator / denominator;
		}

		return parseFloat(quantityStr) || 0;
	}

	static decimalToFraction(decimal: number): string {
		if (decimal === 0) return '0';

		const wholeNumber = Math.floor(decimal);
		const fractionalPart = decimal - wholeNumber;

		if (fractionalPart === 0) return wholeNumber.toString();

		const fractions: [number, number][] = [
			[1, 8],
			[1, 6],
			[1, 4],
			[1, 3],
			[3, 8],
			[1, 2],
			[5, 8],
			[2, 3],
			[3, 4],
			[5, 6],
			[7, 8]
		];

		let closest = fractions[0];
		let minDiff = Math.abs(fractionalPart - closest[0] / closest[1]);

		for (const frac of fractions) {
			const diff = Math.abs(fractionalPart - frac[0] / frac[1]);
			if (diff < minDiff) {
				minDiff = diff;
				closest = frac;
			}
		}

		if (minDiff < 0.02) {
			const fractionStr = `${closest[0]}/${closest[1]}`;
			return wholeNumber > 0 ? `${wholeNumber} ${fractionStr}` : fractionStr;
		}

		return decimal.toFixed(2);
	}

	static multiplyRecipeQuantity(quantityStr?: string, multiplier?: number): string {
		if (quantityStr && multiplier) {
			const quantity = this.parseQuantity(quantityStr);
			const result = quantity * multiplier;
			return this.decimalToFraction(result);
		}

		return '';
	}
}

export default RecipeUtils;
