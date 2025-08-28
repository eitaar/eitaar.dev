import { Card, CardHeader, CardBody } from '@heroui/react';
import type { ReactNode } from 'react';

interface SkillsProps {
  skillIcon?: ReactNode;
  javascriptIcon?: ReactNode;
  typescriptIcon?: ReactNode;
  nuxtIcon?: ReactNode;
  vueIcon?: ReactNode;
  astroIcon?: ReactNode;
  tailwindIcon?: ReactNode;
  pixiIcon?: ReactNode;
  pythonIcon?: ReactNode;
  markdownIcon?: ReactNode;
}

export default function Skills({
  skillIcon,
  javascriptIcon,
  typescriptIcon,
  nuxtIcon,
  vueIcon,
  astroIcon,
  tailwindIcon,
  pixiIcon,
  pythonIcon,
  markdownIcon,
}: SkillsProps) {
  return (
    <Card className="CARD flex h-full w-full flex-1 justify-center" isBlurred={true}>
      <CardHeader className="flex items-center justify-center gap-1">
        <div>{skillIcon}</div>
        <p className="text-center font-Quantico text-3xl font-bold">Skills</p>
      </CardHeader>
      <CardBody className="flex w-full flex-row flex-wrap items-start justify-center gap-2">
        <div>{javascriptIcon}</div>
        <div>{typescriptIcon}</div>
        <div>{nuxtIcon}</div>
        <div>{vueIcon}</div>
        <div>{astroIcon}</div>
        <div>{tailwindIcon}</div>
        <div>{pixiIcon}</div>
        <div>{pythonIcon}</div>
        <div>{markdownIcon}</div>
      </CardBody>
    </Card>
  );
}
