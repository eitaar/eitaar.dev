type Language = {
  name: string;
  percentage: number;
  size: number;
  color: string;
};

type StatsData = {
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
};

export async function fetcher(): Promise<StatsData> {
  const data = await fetch('https://get-github-stats.eitaar.workers.dev/eitaar');
  if (!data.ok) {
    throw new Error(`Failed to fetch data: ${data.status}`);
  }
  const json = await data.json();
  return json;
}
