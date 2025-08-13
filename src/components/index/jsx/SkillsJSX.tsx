import { Card, CardHeader, CardBody } from '@heroui/react';
import type { ReactNode } from 'react';

interface SkillsProps {
  skillIcon?: ReactNode;
  jsIcon?: ReactNode;
  tsIcon?: ReactNode;
  nuxtIcon?: ReactNode;
  vueIcon?: ReactNode;
  astroIcon?: ReactNode;
  twIcon?: ReactNode;
  pixIcon?: ReactNode;
  pyIcon?: ReactNode;
  mdIcon?: ReactNode;
}

export default function SkillsJSX({
  skillIcon,
  jsIcon,
  tsIcon,
  nuxtIcon,
  vueIcon,
  astroIcon,
  twIcon,
  pixIcon,
  pyIcon,
  mdIcon,
}: SkillsProps) {
  return (
    <Card className="CARD flex h-full w-full flex-1 justify-center" isBlurred={false}>
      <CardHeader className="flex items-center justify-center gap-1">
        <div>{skillIcon}</div>
        <p className="text-center font-Quantico text-3xl font-bold">Skills</p>
      </CardHeader>
      <CardBody className="flex w-full flex-row flex-wrap items-start justify-center gap-2">
        <div>{jsIcon}</div>
        <div>{tsIcon}</div>
        <div>{nuxtIcon}</div>
        <div>{vueIcon}</div>
        <div>{astroIcon}</div>
        <div>{twIcon}</div>
        <div>{pixIcon}</div>
        <div>{pyIcon}</div>
        <div>{mdIcon}</div>
      </CardBody>
    </Card>
  );
}
