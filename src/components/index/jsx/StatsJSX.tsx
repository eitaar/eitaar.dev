import { Card, CardHeader, CardBody, Progress, Divider } from "@heroui/react";

type Language = {
  name: string;
  percentage: number;
  size: number;
  color: string;
};

type StatsData = {
  status: "success" | "error";
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

type Props = {
  stats: StatsData;
  stats2: StatsData;
  children?: React.ReactNode;
};

const colors: Record<string, string> = {
  Vue: "bg-[#41b883]",
  JavaScript: "bg-[#f1e05a]",
  TypeScript: "bg-[#3178c6]",
  Astro: "bg-[#ff5a03]",
  CSS: "bg-[#663399]",
  Java: "bg-[#b07219]",
  MDX: "bg-[#fcb32c]",
  Batchfile: "bg-[#C1F12E]",
  HTML : "bg-[#e34c26]",
  EJS: "bg-[#a91e50]",
};

export default function App({ stats, stats2, children }: Props) {
  return (
    <Card className="w-full h-full flex-2 flex justify-center">
      <CardHeader className="flex items-center justify-center gap-1 pb-0 ">
        <div>{children}</div>
        <p className="text-3xl font-Quantico font-bold text-center">GitHub Stats</p>
      </CardHeader>      
      <CardBody className="flex flex-wrap flex-row gap-2 w-full h-full items-start justify-start pt-0">
        <div className="relative w-full flex flex-col items-center justify-center h-full">
          <div className="w-full relative p-4">
            <Progress
              aria-label="bg-bar"
              className="max-w-md absolute left-1/2 top-1/2 -translate-1/2"
              value={0}
              disableAnimation={true}
            />          
            {[...stats.data.languages]
            .map((lang, index) => (
              <Progress
                aria-label={lang.name}
                key={index}
                className="max-w-md absolute left-1/2 top-1/2 -translate-1/2"
                value={lang.percentage}
                classNames={{
                  indicator: `${colors[lang.name] ?? ""} rounded-br-none rounded-tr-none`,
                  track: "bg-transparent",
                }}
              />
            ))
            .reverse()}
        </div>
        <div className="max-w-md flex flex-row flex-wrap justify-between">
          {stats2.data.languages.map((lang, index) => (
            <div
              className="w-1/3 flex items-center gap-2 text-sm lg:text-md" key={index} >
              <div
                className={`w-3 h-3 lg:w-4 lg:h-4 rounded-full ${colors[lang.name] ?? ""}`}
                id="dot"
              ></div>
              <p>                
                {lang.name.split("").filter((letter: string) => letter.toUpperCase() === letter).length >= 2
                  ? lang.name
                    .split("")
                    .filter((letter: string) => letter.toUpperCase() === letter)
                    .join("")
                  : lang.name}{" "}
                {Math.round(lang.percentage * 2) / 2}%
              </p>
            </div>
          ))}
        </div>
        <Divider className="my-2" />
        <div className="w-full h-full font-Quantico">
          <div className="flex flex-wrap gap-2 h-full ">
            <div className="flex flex-col items-center justify-center p-2 bg-content2 rounded-lg basis-[30%] grow">
              <span className="text-2xl font-bold">{stats.data.totalRepositories}</span>
              <span className="text-sm text-default-500">Repositories</span>
            </div>
            <div className="flex flex-col items-center justify-center p-2 bg-content2 rounded-lg basis-[30%] grow">
              <span className="text-2xl font-bold">{stats.data.totalStars}</span>
              <span className="text-sm text-default-500">Stars</span>
            </div>
            <div className="flex flex-col items-center justify-center p-2 bg-content2 rounded-lg basis-[30%] grow">
              <span className="text-2xl font-bold">{stats.data.totalCommitContributions}</span>
              <span className="text-sm text-default-500">Contributions</span>
            </div>
            <div className="flex flex-col items-center justify-center p-2 bg-content2 rounded-lg basis-[30%] grow">
              <span className="text-2xl font-bold">{stats.data.followerCount}</span>
              <span className="text-sm text-default-500">Followers</span>
            </div>
            <div className="flex flex-col items-center justify-center p-2 bg-content2 rounded-lg basis-[30%] grow">
              <span className="text-2xl font-bold">{stats.data.totalPRs}</span>
              <span className="text-sm text-default-500">Pull Requests</span>
            </div>
          </div>
        </div>
      </div>
      </CardBody>
    </Card>
  );
}
