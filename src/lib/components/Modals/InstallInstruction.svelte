<script lang="ts">
	import { closeInstallModal, modalsState } from '$lib/state/modal.svelte';
	import ModalWrapper from '../Common/ModalWrapper.svelte';
</script>

<ModalWrapper
	isOpen={modalsState.data.isOpenInstall}
	onClose={closeInstallModal}
	label={`Install web app`}
>
	<div class="p-5">
		<div>
			<p class="font-lexend flex items-center text-xs text-black">
				1. Tap on
				<svg
					width="52"
					height="52"
					viewBox="0 0 62 62"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<g filter="url(#filter0_d_3162_631)">
						<rect x="14" y="10" width="34" height="34" rx="17" fill="#fff" />
						<path
							d="M30.9932 29.2056C31.356 29.2056 31.6549 28.9067 31.6549 28.5581V21.3933L31.5979 20.3332L32.0391 20.8526L33.0423 21.9199C33.1561 22.0479 33.3198 22.112 33.4834 22.112C33.8036 22.112 34.0668 21.8772 34.0668 21.5428C34.0668 21.372 34.0028 21.2439 33.8818 21.123L31.4912 18.8248C31.3276 18.6541 31.171 18.5972 30.9932 18.5972C30.8224 18.5972 30.6659 18.6541 30.5022 18.8248L28.1116 21.123C27.9907 21.2439 27.9195 21.372 27.9195 21.5428C27.9195 21.8772 28.1828 22.112 28.5029 22.112C28.6666 22.112 28.8373 22.0479 28.9512 21.9199L29.9473 20.8526L30.3955 20.3332L30.3386 21.3933V28.5581C30.3386 28.9067 30.6374 29.2056 30.9932 29.2056ZM26.9021 34.8762H35.0914C36.6282 34.8762 37.4251 34.0864 37.4251 32.5709V25.5627C37.4251 24.0472 36.6282 23.2575 35.0914 23.2575H33.1632V24.652H35.006C35.6606 24.652 36.0306 24.9935 36.0306 25.6837V32.45C36.0306 33.1401 35.6606 33.4817 35.006 33.4817H26.9874C26.3258 33.4817 25.9629 33.1401 25.9629 32.45V25.6837C25.9629 24.9935 26.3258 24.652 26.9874 24.652H28.8444V23.2575H26.9021C25.3652 23.2575 24.5684 24.0472 24.5684 25.5627V32.5709C24.5684 34.0864 25.3652 34.8762 26.9021 34.8762Z"
							fill="#1A37F7"
						/>
					</g>
					<defs>
						<filter
							id="filter0_d_3162_631"
							x="0"
							y="0"
							width="62"
							height="62"
							filterUnits="userSpaceOnUse"
							color-interpolation-filters="sRGB"
						>
							<feFlood flood-opacity="0" result="BackgroundImageFix" />
							<feColorMatrix
								in="SourceAlpha"
								type="matrix"
								values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
								result="hardAlpha"
							/>
							<feOffset dy="4" />
							<feGaussianBlur stdDeviation="7" />
							<feComposite in2="hardAlpha" operator="out" />
							<feColorMatrix
								type="matrix"
								values="0 0 0 0 0.564219 0 0 0 0 0.578852 0 0 0 0 0.654167 0 0 0 0.3 0"
							/>
							<feBlend
								mode="normal"
								in2="BackgroundImageFix"
								result="effect1_dropShadow_3162_631"
							/>
							<feBlend
								mode="normal"
								in="SourceGraphic"
								in2="effect1_dropShadow_3162_631"
								result="shape"
							/>
						</filter>
					</defs>
				</svg>

				in the broswer menu
			</p>

			<div class="font-lexend mb-3 flex items-center gap-2 text-xs text-black">
				2. Scroll down and select

				<div
					class="flex items-center gap-4 rounded-[3px] border border-gray-300 bg-white px-2 shadow-lg"
				>
					<p class="font-lexend text-black">Add to home Screen</p>

					<svg
						width="20"
						height="20"
						viewBox="0 0 11 11"
						stroke="#FFFFFF"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M5.5 3V8M8 5.5L3 5.5M2 10H9C9.55228 10 10 9.55228 10 9V2C10 1.44772 9.55228 1 9 1H2C1.44772 1 1 1.44772 1 2V9C1 9.55228 1.44772 10 2 10Z"
							stroke="#FFFFFF"
							stroke-width="0.5"
						/>
					</svg>
				</div>
			</div>

			<div class="font-lexend flex items-center gap-2 text-xs text-black">
				3. Look for the

				<div>
					<img src="/images/laniva_logo_rounded_transparent.png" class="w-6 rounded-md" alt="" />
				</div>
				icon on your home screen
			</div>
		</div>
	</div>
</ModalWrapper>
