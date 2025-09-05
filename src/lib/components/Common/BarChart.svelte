<script lang="ts">
	let { title, xLabels, yValues, textColor } = $props();

	let canvas: any;
	const devicePixelRatio = $derived(
		typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1
	);

	function drawChart() {
		const ctx = canvas.getContext('2d');
		const styleWidth = canvas.clientWidth;
		const styleHeight = canvas.clientHeight;

		// Scale canvas for high-DPI displays
		canvas.width = styleWidth * devicePixelRatio;
		canvas.height = styleHeight * devicePixelRatio;
		ctx.scale(devicePixelRatio, devicePixelRatio);

		ctx.clearRect(0, 0, styleWidth, styleHeight);

		ctx.font = '12px sans-serif';
		ctx.fillStyle = textColor;

		const padding = 40;
		const width = styleWidth;
		const height = styleHeight;
		const chartWidth = width - padding * 2;
		const chartHeight = height - padding * 2;

		const barWidth = chartWidth / xLabels.length;
		const maxValue = Math.max(...yValues) || 1;

		// Y-axis steps
		const steps = 5;
		for (let i = 0; i <= steps; i++) {
			const val = Math.round((maxValue / steps) * i);
			const y = height - padding - (val / maxValue) * chartHeight;

			ctx.fillText(val.toString(), 5, y + 4);
			ctx.strokeStyle = '#ddd';
			ctx.beginPath();
			ctx.moveTo(padding, y);
			ctx.lineTo(width - padding, y);
			ctx.stroke();
		}

		// Bars and x-axis labels
		xLabels.forEach((label: any, i: any) => {
			const barHeight = (yValues[i] / maxValue) * chartHeight;
			const x = padding + i * barWidth + barWidth * 0.2;
			const y = height - padding - barHeight;

			ctx.fillStyle = '#74b9ff';
			ctx.fillRect(x, y, barWidth * 0.6, barHeight);

			ctx.fillStyle = textColor;
			ctx.textAlign = 'center';
			ctx.fillText(label, x + barWidth * 0.3, height - 10);
		});

		// Title
		ctx.font = 'bold 16px sans-serif';
		ctx.textAlign = 'center';
		ctx.fillText(title, width / 2, 25);
	}

	$effect(() => drawChart());
</script>

<div class="chart-container">
	<canvas bind:this={canvas}></canvas>
</div>

<!-- <script lang="ts">
	let { title, xLabels, yValues, textColor } = $props();

	let canvas: HTMLCanvasElement;
	const devicePixelRatio = window.devicePixelRatio || 1;

	function drawChart() {
		const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
		if (!ctx) return;

		const styleWidth = canvas.clientWidth;
		const styleHeight = canvas.clientHeight;

		canvas.width = styleWidth * devicePixelRatio;
		canvas.height = styleHeight * devicePixelRatio;
		ctx.scale(devicePixelRatio, devicePixelRatio);

		ctx.clearRect(0, 0, styleWidth, styleHeight);

		const padding = 40;
		const width = styleWidth;
		const height = styleHeight;
		const chartWidth = width - padding * 2;
		const chartHeight = height - padding * 2;

		const barWidth = chartWidth / xLabels.length;
		const maxValue = Math.max(...yValues) || 1;

		// === Neobrutal Style: Set Fonts and Colors ===
		ctx.strokeStyle = '#000';
		ctx.fillStyle = textColor;
		ctx.lineWidth = 2;
		ctx.font = '14px Courier';

		// Y-axis grid
		const steps = 5;
		for (let i = 0; i <= steps; i++) {
			const val = Math.round((maxValue / steps) * i);
			const y = height - padding - (val / maxValue) * chartHeight;

			// Label
			ctx.fillText(val.toString(), 5, y + 5);

			// Grid line
			ctx.beginPath();
			ctx.moveTo(padding, y);
			ctx.lineTo(width - padding, y);
			ctx.stroke();
		}

		// Bars and x-labels
		xLabels.forEach((label: any, i: any) => {
			const barHeight = (yValues[i] / maxValue) * chartHeight;
			const x = padding + i * barWidth + barWidth * 0.2;
			const y = height - padding - barHeight;

			// Draw bar
			ctx.fillStyle = '#ff3d00';
			ctx.fillRect(x, y, barWidth * 0.6, barHeight);

			// Border around bar
			ctx.strokeStyle = '#000';
			ctx.strokeRect(x, y, barWidth * 0.6, barHeight);

			// Draw label
			ctx.fillStyle = textColor;
			ctx.textAlign = 'center';
			ctx.fillText(label, x + barWidth * 0.3, height - 10);
		});

		// Title
		ctx.font = 'bold 18px Courier';
		ctx.textAlign = 'center';
		ctx.fillStyle = textColor;
		ctx.fillText(title, width / 2, 25);
	}

	$effect(() => drawChart());
</script>

<div class="chart-container">
	<canvas bind:this={canvas}></canvas>
</div>

<style>
	.chart-container {
		width: 100%;
		max-width: 600px;
		margin: auto;
		padding: 1rem;
		border: 3px solid black;
		background: #fff;
		font-family: 'Courier', monospace;
	}

	canvas {
		width: 100%;
		height: 300px;
		display: block;
		background: #f7f7f7;
	}
</style> -->

<style>
	.chart-container {
		width: 100%;
		max-width: 600px;
		margin: auto;
		background: #fff;
		border: 1px solid #ddd;
		border-radius: 8px;
		padding: 1rem;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
	}

	canvas {
		width: 100%;
		height: 300px;
		display: block;
	}
</style>
