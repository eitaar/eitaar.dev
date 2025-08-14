export interface Language {
  name: string;
  percentage: number;
  size: number;
  color: string;
}

export interface StatsData {
  status: 'success' | 'error';
  data: {
    followerCount: number;
    totalCommitContributions: number;
    totalStars: number;
    totalSize: number;
    totalRepositories: number;
    totalPRs: number;
    languages: Language[];
  };
}

export interface Project {
  title: string;
  stack: string[];
  description: string;
  github?: string;
  page?: string;
  image: ImageMetadata;
}

export interface Hobby {
  title: string;
  flavour: string;
  iconName: string;
}

export interface ArticleData {
  date: Date;
  title: string;
  tags: string[];
  emoji: string;
}

export interface Article {
  data: ArticleData;
  slug: string;
}

export interface Model {
  filename: string;
  title: string;
  description?: string;
  date: Date;
  software: 'Blender' | 'Blockbench';
  polygons: number;
}
