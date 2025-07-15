import { Chip, Button } from "@heroui/react";
export default function App(props) {
  return (
    <div className="flex gap-3 max-w-1/2">
      <div>
        {props.avatarImg}
      </div>
      <div className="flex-1 p-4">
        <h2 className="text-4xl font-bold font-Quantico tracking-tight text-success-500">eitaar</h2>
        <div className="flex flex-row gap-0">
          <Button
            isIconOnly={true}
            variant="light"
          >
            {props.githubIcon}
          </Button>
          <Button
            isIconOnly={true}
            variant="light"
          >
            {props.xIcon}
          </Button>
          <Button
            isIconOnly={true}
            variant="light"
          >
            {props.discordIcon}
          </Button>
        </div>
        <p className="font-Quantico tracking-tight px-2">
          
        </p>
      </div>
    </div>
  );
}
