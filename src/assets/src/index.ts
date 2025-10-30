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
