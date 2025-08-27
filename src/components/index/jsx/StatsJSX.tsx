import { Card, CardHeader, CardBody } from '@heroui/react';
import type { StatsData, Language } from '../../../types/common';
import PieChart from '../../PieChart';

const formatLanguageName = (name: string): string => {
  const upperCaseCount = name.split('').filter((letter) => letter.toUpperCase() === letter).length;
  return upperCaseCount >= 2
    ? name
        .split('')
        .filter((letter) => letter.toUpperCase() === letter)
        .join('')
    : name;
};

interface StatsProps {
  StatsData: StatsData;
  children?: React.ReactNode;
}
const LanguageLegendItem = ({ lang, index }: { lang: Language; index: number }) => (
  <div className="flex items-center justify-center">
    <div className="h-3.5 w-3.5 rounded-full" style={{ backgroundColor: lang.color }}></div>
    <p className="ml-1">
      {formatLanguageName(lang.name)} {Math.round(lang.percentage * 2) / 2}%
    </p>
  </div>
);

const StatItem = ({ value, label }: { value: number; label: string }) => (
  <div className="flex flex-1 flex-col items-center justify-center rounded-lg px-2">
    <span className="text-xl font-bold sm:text-2xl">{value}</span>
    <span className="text-center text-sm text-default-600">{label}</span>
  </div>
);

export default function StatsComponent({ StatsData, children }: StatsProps) {
  // Convert language data to PieChart format
  const pieChartData = StatsData.data.languages.map((lang) => ({
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
          <PieChart data={pieChartData} size={250} showLabels={true} />
          <div className="grid w-full grid-cols-3 font-Quantico">
            {StatsData.data.languages.slice(0, 9).map((lang: Language, index: number) => (
              <LanguageLegendItem key={index} lang={lang} index={index} />
            ))}
          </div>

          {/* Stats Numbers */}
          <div className="w-full pt-4 font-Quantico">
            <div className="flex w-full flex-wrap justify-center gap-4">
              <StatItem value={StatsData.data.totalRepositories} label="Repositories" />
              <StatItem value={StatsData.data.totalStars} label="Stars" />
              <StatItem value={StatsData.data.totalCommitContributions} label="Contributions" />
              <StatItem value={StatsData.data.followerCount} label="Followers" />
              <StatItem value={StatsData.data.totalPRs} label="PRs" />
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}
