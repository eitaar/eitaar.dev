import {Card, CardHeader, CardBody, CardFooter, Divider, Button, Popover, PopoverTrigger, PopoverContent} from "@heroui/react";
export default function App(props) {
  return (
    <Card className="w-full h-full flex-1 flex justify-center">
      <CardHeader className="flex gap-3 pb-0">
        <div>{props.avatarImg}</div>
        <div className="flex flex-col font-Quantico text-center tracking-tightest">
          <p className="text-3xl font-bold">eitaar</p>
          <p className="text-lg text-default-500">student?</p>
        </div>
        <Divider className="h-3/4" orientation="vertical" />
        <div className="flex flex-col justify-center font-Quantico tracking-tightest">
          <p className="text-xl">16 | Coding Begginer</p>
          <p className="text-xl">Japanease</p>
          <p className="text-xl">Learning React</p>
        </div>
      </CardHeader>
      <CardFooter className="flex flex-wrap flex-row w-full items-center justify-center pt-0 gap-0">
        <Button
          isIconOnly
          aria-label="twitter"
          variant="light"
          className="w-11 h-11 min-w-11"
          ><a href="https://x.com/eitaar0" target="_blank" rel="noopener noreferrer" aria-label="twitter" className="flex items-center justify-center w-full h-full">
            <div>{props.xIcon}</div>
          </a> 
          </Button>
        <Divider orientation="vertical" className="h-8 mx-0.5" />
        <Button
          isIconOnly
          aria-label="github"
          variant="light"
          className="w-11 h-11 min-w-11"
          ><a href="https://github.com/eitaar/" target="_blank" rel="noopener noreferrer" aria-label="github" className="flex items-center justify-center w-full h-full">
            <div>{props.githubIcon}</div>
          </a>
          </Button>
        <Divider orientation="vertical" className="h-8 mx-0.5" />
          <Popover placement="bottom" showArrow={true}>
            <PopoverTrigger>
              <Button
                isIconOnly
                aria-label="discord"
                variant="light"
                className="w-11 h-11 min-w-11"
                onPressEnd={() => {
                  navigator.clipboard.writeText("eitaar");
                }}
                >
              <div className="flex items-center justify-center w-full h-full">{props.discordIcon}</div>
              </Button>              
            </PopoverTrigger>
            <PopoverContent>
              <div className="px-1 py-2">
                <p className="text-tiny">Copied! Paste in Discord to add.</p>
              </div>
            </PopoverContent>
          </Popover>          
      </CardFooter>
    </Card>
  );
}
