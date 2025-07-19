import type { StatsData } from '../../types/common';

export async function fetcher(): Promise<StatsData> {
  const data = await fetch('https://get-github-stats.eitaar.workers.dev/eitaar');
  if (!data.ok) {
    throw new Error(`Failed to fetch data: ${data.status}`);
  }
  const json = await data.json();
  return json;
}
