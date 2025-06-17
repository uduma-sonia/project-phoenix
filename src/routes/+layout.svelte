<script lang="ts">
	import '../app.css';

	let { children } = $props();

	// const cat = [
	// 	{
	// 		id: '6883303096366',
	// 		name: 'Not Your Basic Tennis Necklace 16" - Gold|White Diamondettes',
	// 		category: 'Necklace',
	// 		url: 'https://www.melindamaria.com/products/not-your-basic-tennis-necklace-gold',
	// 		image_url:
	// 			'https://cdn.shopify.com/s/files/1/0019/7135/5694/files/image_1_copy_bd3e531e-2159-4104-8391-2fd7e63e52da.jpg?v=1694814447',
	// 		price: None,
	// 		team: None,
	// 		tags: [
	// 			'allisonxmelinda',
	// 			'betterthandiamonds',
	// 			'Gold',
	// 			"Mother's Day 2023",
	// 			'NECKLACE',
	// 			'New',
	// 			'notyourbasic',
	// 			'restricted_intl',
	// 			'tennis-necklace',
	// 			'vproject',
	// 			'YGroup_nybtn16'
	// 		]
	// 	},
	// 	{
	// 		id: '6885826527278',
	// 		name: 'Ashley Hinge Cuff - Gold|White Diamondettes',
	// 		category: 'Bracelet',
	// 		url: 'https://www.melindamaria.com/products/ashley-hinge-cuff-gold-white-diamondettes',
	// 		image_url:
	// 			'https://cdn.shopify.com/s/files/1/0019/7135/5694/files/B1302GWTCZ-FRONT_96066bad-32ff-4bde-82e7-0e054f2606a3.jpg?v=1686110341',
	// 		price: None,
	// 		team: None,
	// 		tags: [
	// 			'active',
	// 			'all',
	// 			'Bangles',
	// 			'Bracelets',
	// 			'Cuffs',
	// 			'fromthevault',
	// 			'Gold',
	// 			'restricted_intl',
	// 			'vproject',
	// 			'White',
	// 			'YGroup_ahc'
	// 		]
	// 	},
	// 	{
	// 		id: '6960233742382',
	// 		name: 'Baby Love Letters Medallion Necklace - Silver|White Diamondettes',
	// 		category: 'Necklace',
	// 		url: 'https://www.melindamaria.com/products/baby-love-letters-medallion-necklace-silver-white-diamondettes',
	// 		image_url:
	// 			'https://cdn.shopify.com/s/files/1/0019/7135/5694/files/BabyLoveLettersMedallionNecklace_N6354_P_S_A_v1.jpg?v=1712161680',
	// 		price: None,
	// 		team: None,
	// 		tags: [
	// 			'april2024',
	// 			'engraving',
	// 			'Layer Necklace',
	// 			'Layering Necklaces',
	// 			'Love Letters',
	// 			'meaningful',
	// 			"Mother's Day 2023",
	// 			'NECKLACE',
	// 			'Necklace Collection',
	// 			'Necklaces',
	// 			'pendant',
	// 			'restricted_aus',
	// 			'restricted_intl',
	// 			'Silver',
	// 			'YGroup_bllmn'
	// 		]
	// 	},
	// 	{
	// 		id: '7059450855470',
	// 		name: 'Hello Gorgeous 6mm Studs - Silver|White Diamondettes',
	// 		category: 'Earring',
	// 		url: 'https://www.melindamaria.com/products/hello-gorgeous-6mm-studs-silver-white-diamondettes-1',
	// 		image_url:
	// 			'https://cdn.shopify.com/s/files/1/0019/7135/5694/files/HelloGorgeous5mmStuds_E7104_S_WT_P_V1.jpg?v=1729620367',
	// 		price: None,
	// 		team: None,
	// 		tags: [
	// 			'betterthandiamonds',
	// 			'earrings',
	// 			'hellogorgeous',
	// 			'holiday2024',
	// 			"Mother's Day 2023",
	// 			'Silver',
	// 			'Stud Collection',
	// 			'studs',
	// 			'YGroup_hgs6mm'
	// 		]
	// 	},
	// 	{
	// 		id: '7078829195310',
	// 		name: 'Black Evil Eye Necklace - Gold|Black Diamondettes',
	// 		category: 'Necklace',
	// 		url: 'https://www.melindamaria.com/products/black-evil-eye-necklace-gold-black-diamondettes',
	// 		image_url:
	// 			'https://cdn.shopify.com/s/files/1/0019/7135/5694/files/BlackEvilEyeNecklace_N6374_G_P_V1_427f7151-9646-4959-8a16-3a701d7feec1.jpg?v=1724713164',
	// 		price: None,
	// 		team: None,
	// 		tags: ['Gold', 'meaningful', 'Necklaces', 'pendant', 'september2024', 'YGroup_bleen']
	// 	},
	// 	{
	// 		id: '7078829457454',
	// 		name: 'Black Evil Eye Ring - Gold|Black Diamondettes',
	// 		category: 'Ring',
	// 		url: 'https://www.melindamaria.com/products/black-evil-eye-ring-gold-black-diamondettes',
	// 		image_url:
	// 			'https://cdn.shopify.com/s/files/1/0019/7135/5694/files/BlackEvilEyeRing_R6119_G_P_V1.jpg?v=1722381780',
	// 		price: None,
	// 		team: None,
	// 		tags: ['goinggoinggone', 'Gold', 'meaningful', 'rings', 'september2024', 'YGroup_bleer']
	// 	},
	// 	{
	// 		id: '7093525250094',
	// 		name: 'Nina Stacked Ring - Silver|White Diamondettes',
	// 		category: 'Ring',
	// 		url: 'https://www.melindamaria.com/products/nina-stacked-ring-silver-white-diamondettes',
	// 		image_url:
	// 			'https://cdn.shopify.com/s/files/1/0019/7135/5694/files/NinaStackedRing_R6123_S_WT_P_V1.jpg?v=1729619996',
	// 		price: None,
	// 		team: None,
	// 		tags: [
	// 			'betterthandiamonds',
	// 			'holiday2024',
	// 			"Mother's Day 2023",
	// 			'rings',
	// 			'Rings Collection',
	// 			'Silver',
	// 			'stacking-ring',
	// 			'YGroup_nsr'
	// 		]
	// 	},
	// 	{
	// 		id: '7124219068462',
	// 		name: 'Samantha Loves You More Necklace - Gold|White Diamondettes',
	// 		category: 'Necklace',
	// 		url: 'https://www.melindamaria.com/products/samantha-loves-you-more-necklace-gold-white-diamondettes',
	// 		image_url:
	// 			'https://cdn.shopify.com/s/files/1/0019/7135/5694/files/SamanthaLovesYouMoreNecklace_N6402_G_WTCZ_P_V1.jpg?v=1735671216',
	// 		price: None,
	// 		team: None,
	// 		tags: [
	// 			'chain',
	// 			'chains',
	// 			'chains collection',
	// 			'Gold',
	// 			'Necklaces',
	// 			'pendant',
	// 			'the heart collection',
	// 			'YGroup_slymn'
	// 		]
	// 	},
	// 	{
	// 		id: '7124219101230',
	// 		name: 'Samantha Loves You More Necklace - Silver|White Diamondettes',
	// 		category: 'Necklace',
	// 		url: 'https://www.melindamaria.com/products/samantha-loves-you-more-necklace-silver-white-diamondettes',
	// 		image_url:
	// 			'https://cdn.shopify.com/s/files/1/0019/7135/5694/files/SamanthaLovesYouMoreNecklace_N6402_S_WTCZ_P_V1.jpg?v=1735671267',
	// 		price: None,
	// 		team: None,
	// 		tags: [
	// 			'chain',
	// 			'chains',
	// 			'chains collection',
	// 			'Necklaces',
	// 			'pendant',
	// 			'Silver',
	// 			'the heart collection',
	// 			'YGroup_slymn'
	// 		]
	// 	}
	// ];
	// 2025-06-17 13:04:26,790 INFO [mobius] [recent_item_pickers.py:200] - Found recently purchased product for gmetlov94@gmail.com: id='6883303096366' name='Not Your Basic Tennis Necklace 16" - Gold|White Diamondettes' category='Necklace' url='https://www.melindamaria.com/products/not-your-basic-tennis-necklace-gold' image_url='https://cdn.shopify.com/s/files/1/0019/7135/5694/files/image_1_copy_bd3e531e-2159-4104-8391-2fd7e63e52da.jpg?v=1694814447' price=None team=None tags=['allisonxmelinda', 'betterthandiamonds', 'Gold', "Mother's Day 2023", 'NECKLACE', 'New', 'notyourbasic', 'restricted_intl', 'tennis-necklace', 'vproject', 'YGroup_nybtn16']
</script>

{@render children()}
<!-- 

    def is_product_match(self, product: Product) -> ProductMatchInfo:
        name = (product.name or "").lower()
        category = (product.category or "").lower()
        tags = [t.lower() for t in (product.tags or [])]
        is_gold_necklace = (
            ("gold" in name and "necklace" in name) or
            ("gold" in category and "necklace" in category) or
            any("gold" in tag and "necklace" in tag for tag in tags)
        )
        return ProductMatchInfo(is_match=is_gold_necklace) -->
