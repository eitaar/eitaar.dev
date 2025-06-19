import {Card, CardHeader, CardBody, Divider, Button, Popover, PopoverTrigger, PopoverContent, Chip} from "@heroui/react";
export default function App(props) {
  return (
    <Card className="w-full flex-1 mx-auto" isBlurred={false} >
      <CardHeader className="flex flex-col items-center gap-4">
        <div className="rounded-md overflow-hidden w-1/2 lg:w-auto">
          {props.avatarImg}
        </div>
        <div className="flex flex-col items-center gap-1 font-Quantico">
          <h2 className="text-4xl font-bold ">eitaar</h2>
          <p className="text-default-600">student?</p>
          <div className="flex items-center gap-2">
            <Chip className="text-sm" variant="flat" color="primary">Japanese | 16</Chip>
          </div>
        </div>
      </CardHeader>      
      <div className="px-4">
        <Divider/>
      </div>          
      <CardBody>
        <div className="flex flex-wrap gap-2 justify-center h-full">          
          <Button
            as="a"
            href="https://x.com/eitaar0"
            target="_blank"
            className="flex flex-col items-center justify-center p-4 h-28 rounded-lg hover:bg-default-100"
            variant="light"
            disableRipple={true}>
            <div className="text-2xl mb-2">
              {props.xIcon}
            </div>
            <span className="font-medium">Twitter</span>
            <span className="text-xs text-default-500">@eitaar0</span>
          </Button>    
          <Popover placement="bottom" showArrow={true}>
            <PopoverTrigger>
              <Button
                className="flex flex-col items-center justify-center p-4 h-28 rounded-lg hover:bg-default-100"
                variant="light"
                onPressEnd={() => {
                  navigator.clipboard.writeText("eitaar");
                }}
                disableRipple={true}
                >
                <div className="text-2xl mb-2">
                  {props.discordIcon}
                </div>
                <span className="font-medium">Discord</span>
                <span className="text-xs text-default-500">@eitaar</span>
              </Button>  
            </PopoverTrigger>
            <PopoverContent className="p-4">
              <p className="text-sm">Copied to clipboard!</p>
            </PopoverContent>
          </Popover>
          <Button
            as="a"
            href="https://github.com/eitaar"
            target="_blank"
            className="flex flex-col items-center justify-center p-4 h-28 rounded-lg hover:bg-default-100"
            variant="light"
            disableRipple={true}>
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
