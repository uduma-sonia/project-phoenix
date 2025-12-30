/**
 * Type definition for attribution highlights
 */
type AttributionHighlight = {
	conversionOnly: boolean;
	lastTouch: boolean;
	orderedRecommendedCategory: boolean;
	orderedRecommendedProduct: boolean;
	orderedWithin5d: boolean;
	orderedWithin5dDays?: number;
	usedExactDiscountCode: boolean;
};

/**
 * Criteria matcher function - returns true if the highlight matches the criteria
 */
type CriteriaMatcher = (highlight: AttributionHighlight) => boolean;

/**
 * Message generator function - returns the message string for the matched criteria
 */
type MessageGenerator = (highlight: AttributionHighlight) => string;

/**
 * Criteria rule definition
 */
type CriteriaRule = {
	matcher: CriteriaMatcher;
	message: MessageGenerator;
};

/**
 * Priority-ordered list of criteria rules (most specific first)
 * Priority order based on CSV specification:
 * 1. Product + Discount Code
 * 2. Category + Discount Code
 * 3. Ordered within 5d (alone - no product, category, or lastTouch)
 * 4. Used exact discount code (alone - no product or category)
 * 5. Product + Last touch
 * 6. Category + Last touch
 * 7. Product + Ordered within 5d
 * 8. Product (alone - no orderedWithin5d, no lastTouch)
 * 9. Category + Product (product takes priority)
 * 10. Category + Ordered within 5d
 * 11. Category (alone - no orderedWithin5d, no lastTouch)
 * 12. Ordered within 5d + Last touch
 * 13. Last touch (alone)
 */

const ATTRIBUTION_CRITERIA_RULES = [
	{
		matcher: (h) =>
			!h.orderedRecommendedProduct &&
			!h.usedExactDiscountCode &&
			!h.orderedRecommendedCategory &&
			!h.orderedWithin5dDays,
		message: () => ''
	},
	{
		matcher: (h) => h.orderedRecommendedCategory && h.usedExactDiscountCode,
		message: () => 'Customer ordered the recommended category and used the exact discount code'
	},
	{
		matcher: (h) =>
			h.orderedWithin5d &&
			!h.orderedRecommendedProduct &&
			!h.orderedRecommendedCategory &&
			!h.lastTouch,
		message: (h) =>
			h.orderedWithin5dDays !== undefined
				? `Customer ordered within ${h.orderedWithin5dDays} days of the email`
				: 'Customer ordered within 5 days of the email'
	},
	{
		matcher: (h) =>
			h.usedExactDiscountCode && !h.orderedRecommendedProduct && !h.orderedRecommendedCategory,
		message: () => 'Customer used the exact discount code'
	},
	{
		matcher: (h) => h.orderedRecommendedProduct && h.lastTouch,
		message: () =>
			'Customer ordered the recommended product and Remarkable AI email was the last touch before their order'
	},
	{
		matcher: (h) => h.orderedRecommendedCategory && h.lastTouch && !h.orderedRecommendedProduct,
		message: () =>
			'Customer ordered the recommended category and Remarkable AI email was the last touch before their order'
	},
	{
		matcher: (h) => h.orderedRecommendedProduct && h.orderedWithin5d && !h.lastTouch,
		message: (h) =>
			h.orderedWithin5dDays !== undefined
				? `Customer ordered the recommended product within ${h.orderedWithin5dDays} days of the email`
				: 'Customer ordered the recommended product within 5 days of the email'
	},
	{
		matcher: (h) => h.orderedRecommendedProduct && !h.orderedWithin5d && !h.lastTouch,
		message: () => 'Customer ordered the recommended product'
	},
	{
		matcher: (h) =>
			h.orderedRecommendedCategory &&
			h.orderedRecommendedProduct &&
			!h.orderedWithin5d &&
			!h.lastTouch,
		message: () => 'Customer ordered the recommended product'
	},
	{
		matcher: (h) =>
			h.orderedRecommendedCategory &&
			h.orderedWithin5d &&
			!h.orderedRecommendedProduct &&
			!h.lastTouch,
		message: (h) =>
			h.orderedWithin5dDays !== undefined
				? `Customer ordered the recommended category within ${h.orderedWithin5dDays} days of the email`
				: 'Customer ordered the recommended category within 5 days of the email'
	},
	{
		matcher: (h) =>
			h.orderedRecommendedCategory &&
			!h.orderedWithin5d &&
			!h.lastTouch &&
			!h.orderedRecommendedProduct,
		message: () => 'Customer ordered the recommended category'
	},
	{
		matcher: (h) =>
			h.orderedWithin5d &&
			h.lastTouch &&
			!h.orderedRecommendedProduct &&
			!h.orderedRecommendedCategory,
		message: () => 'Remarkable AI email was the last touch before their order'
	},
	{
		matcher: (h) =>
			h.lastTouch &&
			!h.orderedRecommendedProduct &&
			!h.orderedRecommendedCategory &&
			!h.orderedWithin5d,
		message: () => 'Remarkable AI email was the last touch before their order'
	}
];

function getAttributionMessage(attributions) {
	const matchingRule = ATTRIBUTION_CRITERIA_RULES.find((rule) => rule.matcher(attributions));

	if (matchingRule) {
		return matchingRule.message(attributions);
	}

	return null;
}

const bb = {
	conversionOnly: false,
	lastTouch: true,
	orderedRecommendedCategory: true,
	orderedRecommendedProduct: true,
	orderedWithin5d: true,
	orderedWithin5dDays: 1,
	usedExactDiscountCode: false
};
