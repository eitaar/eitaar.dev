import { Chip, Button } from "@heroui/react";
export default function App(props) {
  return (
    <div className="flex items-center justify-center gap-5 lg:max-w-2/5 h-full mx-auto">
      <div className="flex gap-3 flex-row items-center">
        {props.avatarImg}
        <div className="flex items-center flex-col gap-1">
          <h2 className="text-5xl font-bold font-Quantico text-success-500 tracking-tighter">eitaar</h2>
          <Chip
            variant="flat"
            color="primary"
            >Japanese | 16</Chip>
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
        </div>
      </div>
    </div>
  );
}
