declare global {
	interface Window {
		toggleTheme: () => void;
		toggleMobileMenu: () => void;
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
