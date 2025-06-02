import {Card, CardHeader, CardBody, CardFooter, Divider, Button, Popover, PopoverTrigger, PopoverContent, Link} from "@heroui/react";
export default function App(props) {
  return (
    <Card className="w-full max-w-[800px] flex-1 p-6 mx-auto">
      <CardHeader className="flex flex-col items-center gap-4">
        <div className="rounded-md overflow-hidden">
          {props.avatarImg}
        </div>
        <div className="flex flex-col items-center gap-1 font-Quantico">
          <h2 className="text-3xl font-bold ">eitaar</h2>
          <p className="text-default-600">student?</p>
          <div className="flex items-center gap-2">
            <span className="text-sm">Japanese | 16</span>
          </div>
        </div>
      </CardHeader>      
      <Divider />          
      <CardBody>
        <div className="flex flex-wrap gap-2 justify-center">          
          <Button
            as="a"
            href="https://x.com/eitaar0"
            target="_blank"
            className="flex flex-col items-center justify-center p-6 h-28 rounded-lg hover:bg-default-100"
            variant="light">
            <div className="text-2xl mb-2">
              {props.xIcon}
            </div>
            <span className="font-medium">Twitter</span>
            <span className="text-xs text-default-500">@eitaar0</span>
          </Button>          
          <Button
            as="a"
            target="_blank"
            className="flex flex-col items-center justify-center p-6 h-28 rounded-lg hover:bg-default-100"
            variant="light">
            <div className="text-2xl mb-2">
              {props.discordIcon}
            </div>
            <span className="font-medium">Discord</span>
            <span className="text-xs text-default-500">@eitaar</span>
          </Button>            <Button
            as="a"
            href="https://github.com/eitaar"
            target="_blank"
            className="flex flex-col items-center justify-center p-6 h-28 rounded-lg hover:bg-default-100"
            variant="light">
            <div className="text-2xl mb-2">
              {props.githubIcon}
            </div>
            <span className="font-medium">GitHub</span>
            <span className="text-xs text-default-500">@eitaar</span>
          </Button>
        </div>
      </CardBody>
    </Card>
  );
}
