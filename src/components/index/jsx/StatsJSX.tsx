import { Card, CardHeader, CardBody, Progress } from '@heroui/react';
import type { StatsData } from '../../../types/common';
import { LANGUAGE_COLORS } from '../../../constants/colors';

interface StatsProps {
  stats: StatsData;
  stats2: StatsData;
  children?: React.ReactNode;
}

const colors: Record<string, string> = LANGUAGE_COLORS;

export default function App({ stats, stats2, children }: StatsProps) {
  return (
    <Card className="CARD flex w-full flex-2 justify-center" isBlurred={false}>
      <CardHeader className="flex items-center justify-center gap-1 pb-0">
        <div>{children}</div>
        <p className="text-center font-Quantico text-3xl font-bold">GitHub Stats</p>
      </CardHeader>
      <CardBody className="flex h-full w-full flex-row flex-wrap items-start justify-start gap-2 pt-0">
        <div className="relative flex h-full w-full flex-col items-center justify-center">
          <div className="relative w-full p-4">
            <Progress
              aria-label="bg-bar"
              className="absolute top-1/2 left-1/2 max-w-9/10 -translate-1/2"
              value={0}
              disableAnimation={true}
            />
            {[...stats.data.languages]
              .map((lang, index) => (
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
              ))
              .reverse()}
            <noscript>
              {[...stats.data.languages]
                .map((lang, index) => (
                  <Progress
                    aria-label={lang.name}
                    key={index}
                    className="absolute top-1/2 left-1/2 max-w-9/10 -translate-1/2"
                    value={lang.percentage}
                    disableAnimation={true}
                    classNames={{
                      indicator: `${colors[lang.name] ?? ''} rounded-br-none rounded-tr-none`,
                      track: 'bg-transparent',
                    }}
                  />
                ))
                .reverse()}
            </noscript>
          </div>
          <div className="flex max-w-9/10 flex-row flex-wrap justify-between font-Quantico">
            {stats2.data.languages.slice(0, 9).map((lang, index) => (
              <div className="lg:text-md flex w-1/3 items-center gap-2 text-sm" key={index}>
                <div
                  className={`h-3 w-3 rounded-full lg:h-4 lg:w-4 ${colors[lang.name] ?? ''}`}
                  id="dot"
                ></div>
                <p>
                  {lang.name.split('').filter((letter: string) => letter.toUpperCase() === letter)
                    .length >= 2
                    ? lang.name
                        .split('')
                        .filter((letter: string) => letter.toUpperCase() === letter)
                        .join('')
                    : lang.name}{' '}
                  {Math.round(lang.percentage * 2) / 2}%
                </p>
              </div>
            ))}
          </div>
          <div className="h-full w-full pt-2 font-Quantico">
            <div className="flex h-full flex-wrap">
              <div className="flex grow basis-[15%] flex-col items-center justify-center rounded-lg px-2">
                <span className="text-2xl font-bold">{stats.data.totalRepositories}</span>
                <span className="text-sm text-default-600">Repositories</span>
              </div>
              <div className="flex grow basis-[15%] flex-col items-center justify-center rounded-lg px-2">
                <span className="text-2xl font-bold">{stats.data.totalStars}</span>
                <span className="text-sm text-default-600">Stars</span>
              </div>
              <div className="flex grow basis-[15%] flex-col items-center justify-center rounded-lg px-2">
                <span className="text-2xl font-bold">{stats.data.totalCommitContributions}</span>
                <span className="text-sm text-default-600">Contributions</span>
              </div>
              <div className="flex grow basis-[15%] flex-col items-center justify-center rounded-lg px-2">
                <span className="text-2xl font-bold">{stats.data.followerCount}</span>
                <span className="text-sm text-default-600">Followers</span>
              </div>
              <div className="flex grow basis-[15%] flex-col items-center justify-center rounded-lg px-2">
                <span className="text-2xl font-bold">{stats.data.totalPRs}</span>
                <span className="text-sm text-default-600">PRs</span>
              </div>
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}
