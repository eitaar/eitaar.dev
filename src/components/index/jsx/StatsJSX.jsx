import {Card, CardHeader, CardBody, Progress} from "@heroui/react";

export default function App({ stats, stats2 }) {
const colors = {
  "Vue": "bg-[#41b883]",
  "JavaScript": "bg-[#f1e05a]",
  "TypeScript": "bg-[#3178c6]",
  "Astro": "bg-[#ff5a03]",
  "CSS": "bg-[#663399]",
  "Java": "bg-[#b07219]",
  "MDX": "bg-[#fcb32c]",
  "Batchfile": "bg-[#C1F12E]"
}
  return (
    <Card className="w-full h-full flex-1 flex justify-center">
      <CardHeader className="flex items-center justify-center gap-1 pb-0">
        <p className="text-3xl font-Quantico font-bold text-center">Stats</p>
      </CardHeader>      
      <CardBody className="flex flex-wrap flex-row gap-2 w-full items-start justify-center overflow-y-visible">
        <div className="w-full relative p-4">
        <Progress
          aria-label="bg-bar"
          className="max-w-md absolute left-1/2 top-1/2 -translate-1/2"
          value={0}
          color="none"
          disableAnimation={true}
        />
        {(stats.data.languages.map((lang, index) => (
          <Progress
            aria-label={lang.name}
            key={index}
            className={`max-w-md absolute left-1/2 top-1/2 -translate-1/2`}
            value={lang.percentage}
            color="none"
            classNames={{indicator: `${colors[lang.name]} rounded-br-none rounded-tr-none`, track: "bg-transparent "}}
          />
        ))).reverse()}
        </div>
        <div className="max-w-md flex flex-row flex-wrap justify-between">
          {
            stats2.data.languages.map((lang, index)=> (
              <div className="w-1/3 flex items-center gap-2" key={index}>
                <div className={`w-4 h-4 rounded-full ${colors[lang.name]}`}></div>
                <p>{lang.name} {Math.round(lang.percentage*2)/2}%</p>
              </div>  
            ))
          } 
        </div>
      </CardBody>
    </Card>
  );
}
