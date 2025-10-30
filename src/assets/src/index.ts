import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(SplitText, ScrollTrigger);

function filterTags(selectedTag: string): void {
	const cards = document.querySelectorAll(".SKILLCARD") as NodeListOf<HTMLElement>;

	cards.forEach((card) => {
		const tag = card.dataset.tag;

		if (selectedTag === "all" || tag === selectedTag) {
			card.style.display = "block";
		} else {
			card.style.display = "none";
		}
	});
}

// Add event listeners to radio buttons
document.addEventListener("astro:page-load", () => {
	const radioInputs = document.getElementsByName("tags") as NodeListOf<HTMLInputElement>;
	radioInputs.forEach((input) => {
		input.addEventListener("change", () => {
			if (input.checked) {
				filterTags(input.value.toLowerCase());
			}
		});
	});
});

function copyToClipboard(text: string): void {
	navigator.clipboard.writeText(text).then(
		() => {
			console.log("Text copied to clipboard: ", text);
		},
		(err) => {
			console.error("Could not copy text: ", err);
		},
	);
}
window.copyToClipboard = copyToClipboard;

// Animate titles when they enter the view
function animateTitleOnScroll(selector: string): void {
	const element = document.querySelector(selector) as HTMLElement;
	if (!element) return;

	const split = new SplitText(selector, { type: "chars" });

	gsap.from(split.chars, {
		opacity: 0,
		y: 30,
		stagger: 0.05,
		ease: "back.out(2)",
		duration: 0.5,
		scrollTrigger: {
			trigger: element,
			start: "top 80%",
			once: true,
		},
	});
}

document.addEventListener("astro:page-load", () => {
	animateTitleOnScroll("#profileTitle");
	animateTitleOnScroll("#techStackTitle");
	animateTitleOnScroll("#projectTitle");
});
