declare global {
	interface Window {
		toggleTheme: () => void;
		toggleMobileMenu: () => void;
		copyToClipboard: (text: string) => void;
	}
}

interface SkillProps {
	icon: string;
	name: string;
	description: string;
	confidence: number;
	tags: string[];
}

export type { SkillProps };
