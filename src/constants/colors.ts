export const LANGUAGE_COLORS: Record<string, string> = {
  Vue: 'bg-[#41b883]',
  JavaScript: 'bg-[#f1e05a]',
  TypeScript: 'bg-[#3178c6]',
  Astro: 'bg-[#ff5a03]',
  CSS: 'bg-[#663399]',
  Java: 'bg-[#b07219]',
  MDX: 'bg-[#fcb32c]',
  Batchfile: 'bg-[#C1F12E]',
  HTML: 'bg-[#e34c26]',
  EJS: 'bg-[#a91e50]',
} as const;

export type SupportedLanguage = keyof typeof LANGUAGE_COLORS;
