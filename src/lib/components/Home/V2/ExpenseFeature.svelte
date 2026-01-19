<script lang="ts">
	import Image from '../../Common/Image.svelte';
</script>

<div class="font-lexend mx-auto max-w-[500px] items-center gap-8 lg:flex lg:max-w-full">
	<div class="mb-16 w-full lg:mb-0 lg:w-1/2">
		<div>
			<h3 class="text-2xl font-semibold md:text-3xl lg:text-4xl">
				A simple way to track your personal finance
			</h3>

			<p class="font-lexend mt-5 max-w-[450px] text-sm font-light lg:text-base">
				Laniva provides a simple interface to log and track your transactions, set budgeting limits
				and cycles. Get a clear visualization of where your money is going to and who is spending
				it.
			</p>
		</div>
	</div>

	<div class="w-full lg:w-1/2">
		<div
			class="feature_img_wrapper mx-auto h-[350px] w-full md:h-[600px] md:max-w-4xl lg:h-[550px]"
		>
			<div class="feature_img_inner bg-brand-light h-full overflow-hidden rounded-3xl border-2 p-4">
				<Image
					src={'/images/expense_img.jpg'}
					alt={'Expense tracker dashboard showing transactions'}
				/>
			</div>

			<div class="absolute -top-6 -right-2 z-50 md:-right-10">
				<div
					class="bg-brand-light max-w-[270px] overflow-hidden rounded-lg border-2 p-1.5 shadow-xl md:max-w-[400px]"
				>
					<Image src="/images/balance_strip.jpg" className="w-full h-full object-cover" />
				</div>
			</div>
		</div>
	</div>
</div>

<style>
	.feature_img_wrapper {
		position: relative;
	}

	.feature_img_wrapper::before {
		content: '';
		position: absolute;
		top: 6px;
		left: 6px;
		border: 2px solid black;
		width: 100%;
		height: 100%;
		background-color: #fff;

		z-index: 1;
		border-radius: 24px;
	}

	.feature_img_inner {
		position: relative;
		z-index: 2;
		border-radius: 24px;
		padding: 20px;
	}
</style>
