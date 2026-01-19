<script lang="ts">
	import BasicButton from '$lib/components/Common/Form/BasicButton.svelte';
	import Image from '../../Common/Image.svelte';
</script>

<div
	class="font-lexend mx-auto flex max-w-[500px] flex-col-reverse items-center gap-8 lg:max-w-full lg:flex-row lg:gap-14"
>
	<div class="mt-10 w-full lg:mb-0 lg:w-1/2">
		<div
			class="feature_img_wrapper mx-auto h-[300px] w-full md:h-[500px] md:max-w-4xl lg:h-[550px]"
		>
			<div class="feature_img_inner bg-brand-light h-full overflow-hidden rounded-3xl border-2 p-4">
				<Image
					src={'/images/expense_img.jpg'}
					alt={'Expense tracker dashboard showing transactions'}
				/>
			</div>
		</div>
	</div>

	<div class="w-full lg:w-1/2">
		<div>
			<h3
				class="font-crete text-center text-2xl font-semibold md:text-3xl lg:text-right lg:text-4xl"
			>
				A simple way to track <br /> your personal finance
			</h3>
			<p class="font-lexend mt-6 text-center text-sm font-light lg:text-right lg:text-base">
				Laniva provides a simple interface to log and track your transactions, set budgeting limits
				and cycles. Get a clear visualization of where your money is going to and who is spending
				it.
			</p>

			<div class="mt-7 flex justify-center lg:justify-end">
				<a href="/signup">
					<BasicButton label="Start For Free" />
				</a>
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
