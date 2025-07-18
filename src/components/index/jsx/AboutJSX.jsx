import { Chip, Button } from "@heroui/react";
export default function App(props) {
  return (
    <div className="flex items-center justify-center gap-5 lg:max-w-2/5 h-full mx-auto">
      <div className="flex gap-3 flex-row items-center">
        {props.avatarImg}
        <div className="flex items-center flex-col gap-1">
          <h2 className="text-5xl font-bold font-Quantico text-success-600 tracking-tighter">eitaar</h2>
          <Chip
            variant="flat"
            color="primary"
            >Japanese | 16</Chip>
          <div className="flex flex-row gap-0">
            <Button
              isIconOnly={true}
              variant="light"
              as="a"
              href="https://github.com/eitaar"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
            >
              {props.githubIcon}
            </Button>
            <Button
              isIconOnly={true}
              variant="light"
              as="a"
              href="https://x.com/eitaar0"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="X"
            >
              {props.xIcon}
            </Button>
            <Button
              isIconOnly={true}
              variant="light"
              aria-label="Discord"
            >
              {props.discordIcon}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
