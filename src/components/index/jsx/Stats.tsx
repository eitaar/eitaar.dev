import { Card, CardHeader, CardBody } from '@heroui/react';
import type { StatsData, Language } from '../../../types/common';
import PieChart from '../../PieChart';

interface StatsProps {
  statsData: StatsData;
  children?: React.ReactNode;
}

const formatLanguageName = (name: string): string => {
  const upperCaseCount = name.split('').filter((letter) => letter.toUpperCase() === letter).length;
  return upperCaseCount >= 2
    ? name
        .split('')
        .filter((letter) => letter.toUpperCase() === letter)
        .join('')
    : name;
};

const LanguageLegendItem = ({ languageData }: { languageData: Language }) => (
  <div className="flex items-center">
    <div
      className="h-3 w-3 flex-shrink-0 rounded-full"
      style={{ backgroundColor: languageData.color }}
    ></div>
    <p className="ml-2 text-sm">
      {formatLanguageName(languageData.name)} {languageData.percentage}%
    </p>
  </div>
);

const StatItem = ({ value, label }: { value: number; label: string }) => (
  <div className="flex flex-1 flex-col items-center justify-center rounded-lg px-2">
    <span className="text-xl font-bold sm:text-2xl">{value}</span>
    <span className="text-center text-sm text-default-600">{label}</span>
  </div>
);

export default function StatsComponent({ statsData, children }: StatsProps) {
  // Sort data by value in descending order and take top 9 languages
  const top9Languages = statsData.data.languages.slice(0, 9);

  // Calculate the total of all languages and top 9 languages
  const top9Total = top9Languages.reduce((sum: number, lang: Language) => sum + lang.size, 0);

  // Convert language data to PieChart format
  const pieChartData = statsData.data.languages.map((lang: Language) => ({
    name: lang.name,
    value: lang.size,
    color: lang.color,
  }));

  return (
    <Card className="CARD flex flex-2 justify-center" isBlurred={true}>
      <CardHeader className="flex items-center justify-center gap-1">
        {children}
        <p className="font-Quantico text-3xl font-bold">GitHub Stats</p>
      </CardHeader>
      <CardBody className="pt-0">
        <div className="flex flex-col items-center justify-center">
          <div className="flex flex-col items-center justify-center gap-4 lg:flex-row lg:items-center lg:justify-center">
            <div className="flex-shrink-0">
              <PieChart data={pieChartData} size={250} showLabels={true} />
            </div>
            <div className="grid h-1/2 grid-cols-2 place-items-center gap-x-4 gap-y-1 font-Quantico lg:grid-cols-2">
              {top9Languages.map((lang: Language, index: number) => (
                <LanguageLegendItem key={index} languageData={lang} />
              ))}
            </div>
          </div>

          <div className="w-full pt-4 font-Quantico">
            <div className="flex w-full flex-wrap justify-center gap-4">
              <StatItem value={statsData.data.totalRepositories} label="Repositories" />
              <StatItem value={statsData.data.totalStars} label="Stars" />
              <StatItem value={statsData.data.totalCommitContributions} label="Contributions" />
              <StatItem value={statsData.data.followerCount} label="Followers" />
              <StatItem value={statsData.data.totalPRs} label="PRs" />
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}
