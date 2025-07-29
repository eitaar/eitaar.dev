import { Chip, Button, Popover, PopoverTrigger, PopoverContent } from '@heroui/react';
import type { ReactNode } from 'react';

interface AboutProps {
  avatarImg?: ReactNode;
  githubIcon?: ReactNode;
  xIcon?: ReactNode;
  discordIcon?: ReactNode;
}

export default function AboutJSX({ avatarImg, githubIcon, xIcon, discordIcon }: AboutProps) {
  return (
    <div className="mx-auto flex h-full items-center justify-center gap-5 lg:max-w-2/5">
      <div className="flex flex-row items-center gap-4">
        {avatarImg}
        <div className="flex flex-col items-center gap-1">
          <h2 className="font-Quantico text-5xl font-bold tracking-tighter text-success-600">
            eitaar
          </h2>
          <Chip variant="flat" color="primary">
            Japanese | 16
          </Chip>
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
              {githubIcon}
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
              {xIcon}
            </Button>
            <Popover placement="bottom" showArrow={true}>
              <PopoverTrigger>
                <Button
                  isIconOnly={true}
                  variant="light"
                  aria-label="Discord"
                  onPressEnd={() => {
                    try {
                      navigator.clipboard.writeText('eitaar');
                    } catch (error) {
                      console.error('Failed to copy text to clipboard:', error);
                    }
                  }}
                >
                  {discordIcon}
                </Button>
              </PopoverTrigger>
              <PopoverContent>
                <p className="text-sm">Copied!</p>
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </div>
    </div>
  );
}
