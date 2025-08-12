import { Card, CardHeader, CardBody, Progress } from '@heroui/react';
import type { StatsData, Language } from '../../../types/common';
import { LANGUAGE_COLORS } from '../../../constants/colors';

interface StatsProps {
  originalStats: StatsData;
  cumulativeStats: StatsData;
  children?: React.ReactNode;
}

const colors: Record<string, string> = LANGUAGE_COLORS;

const formatLanguageName = (name: string): string => {
  const upperCaseCount = name.split('').filter((letter) => letter.toUpperCase() === letter).length;
  return upperCaseCount >= 2
    ? name
        .split('')
        .filter((letter) => letter.toUpperCase() === letter)
        .join('')
    : name;
};

const LanguageProgressBar = ({ lang, index }: { lang: Language; index: number }) => (
  <Progress
    aria-label={lang.name}
    key={index}
    className="absolute top-1/2 left-1/2 max-w-9/10 -translate-1/2"
    value={lang.percentage}
    classNames={{
      indicator: `${colors[lang.name] ?? ''} rounded-br-none rounded-tr-none`,
      track: 'bg-transparent',
    }}
  />
);

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

export default function StatsComponent({ originalStats, cumulativeStats, children }: StatsProps) {
  return (
    <Card className="CARD flex flex-2 justify-center" isBlurred={true}>
      <CardHeader className="flex items-center justify-center gap-1">
        {children}
        <p className="font-Quantico text-3xl font-bold">GitHub Stats</p>
      </CardHeader>
      <CardBody className="pt-0">
        <div className="flex flex-col items-center justify-center">
          <div className="relative w-full p-4">
            <Progress
              aria-label="bg-bar"
              className="absolute top-1/2 left-1/2 max-w-9/10 -translate-1/2"
              value={0}
              disableAnimation={true}
            />
            {[...cumulativeStats.data.languages]
              .map((lang, index) => <LanguageProgressBar key={index} lang={lang} index={index} />)
              .reverse()}
            <noscript>
              {[...cumulativeStats.data.languages]
                .map((lang, index) => <LanguageProgressBar key={index} lang={lang} index={index} />)
                .reverse()}
            </noscript>
          </div>

          <div className="grid w-full grid-cols-3 font-Quantico">
            {originalStats.data.languages.slice(0, 9).map((lang, index) => (
              <LanguageLegendItem key={index} lang={lang} index={index} />
            ))}
          </div>

          <div className="w-full pt-4 font-Quantico">
            <div className="flex w-full flex-wrap justify-center gap-4">
              <StatItem value={originalStats.data.totalRepositories} label="Repositories" />
              <StatItem value={originalStats.data.totalStars} label="Stars" />
              <StatItem value={originalStats.data.totalCommitContributions} label="Contributions" />
              <StatItem value={originalStats.data.followerCount} label="Followers" />
              <StatItem value={originalStats.data.totalPRs} label="PRs" />
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}
