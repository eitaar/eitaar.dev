import { gsap } from "gsap";

const pattern = [
	[
		[1, 0, 0],
		[0, 1, 0],
		[0, 0, 1],
	],
	[
		[1, 0, 0],
		[1, 0, 0],
		[0, 0, 1],
	],
	[
		[1, 0, 1],
		[0, 1, 0],
		[0, 0, 0],
	],
	[
		[1, 0, 0],
		[0, 0, 0],
		[0, 0, 1],
	],
	[
		[1, 0, 0],
		[0, 0, 0],
		[0, 0, 1],
	],
	[
		[1, 0, 1],
		[0, 0, 1],
		[0, 0, 0],
	],
];

const timings = {
	fadeIn: 200,
	fadeOut: 800,
};

const glyphs = [
	document.getElementById("glyph-1"),
	document.getElementById("glyph-2"),
	document.getElementById("glyph-3"),
];

function animate() {
	const tl = gsap.timeline({ repeat: -1 });
	tl.add(gsap.to(glyphs, { opacity: 0.2, duration: 0.75, ease: "power1.out" }));

	pattern.forEach((charPattern) => {
		charPattern.forEach((chunk) => {
			const activeGlyphs = glyphs.filter((_, i) => chunk[i] === 1);

			if (activeGlyphs.length > 0) {
				tl.to(activeGlyphs, {
					opacity: 1,
					duration: timings.fadeIn / 1000,
					ease: "power1.out",
				});

				tl.to(activeGlyphs, {
					opacity: 0.2,
					duration: timings.fadeOut / 1000,
					ease: "power1.in",
				});
			} else {
				tl.to({}, { duration: (timings.fadeIn + timings.fadeOut) / 1000 });
			}
		});
	});
}

// Run animation
if (
	window.matchMedia("(prefers-reduced-motion: no-preference)").matches &&
	localStorage.getItem("animateGlyphs") !== "false"
) {
	animate();
}
