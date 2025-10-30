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

interface ProjectProps {
	title: string;
	slug: string;
	description: string;
	content: string;
	imageUrl: ImageMetadata;
	projectUrl?: string;
	repoUrl?: string;
	tags: string[];
}

export type { SkillProps, ProjectProps };
