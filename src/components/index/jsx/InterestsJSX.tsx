import { Card, CardHeader, CardBody } from '@heroui/react';
import type { ReactNode } from 'react';

interface InterestsProps {
  interestIcon?: ReactNode;
  ardIcon?: ReactNode;
  cppIcon?: ReactNode;
  rustIcon?: ReactNode;
  bderIcon?: ReactNode;
  fltIcon?: ReactNode;
  javaIcon?: ReactNode;
  p5Icon?: ReactNode;
  thjsIcon?: ReactNode;
  reactIcon?: ReactNode;
}

export default function InterestsJSX({
  interestIcon,
  ardIcon,
  cppIcon,
  rustIcon,
  bderIcon,
  fltIcon,
  javaIcon,
  p5Icon,
  thjsIcon,
  reactIcon,
}: InterestsProps) {
  return (
    <Card className="CARD flex h-full w-full flex-1 justify-center" isBlurred={false}>
      <CardHeader className="flex items-center justify-center gap-1">
        <div>{interestIcon}</div>
        <p className="text-center font-Quantico text-3xl font-bold">Interests</p>
      </CardHeader>
      <CardBody className="flex w-full flex-row flex-wrap items-start justify-center gap-2">
        <div>{ardIcon}</div>
        <div>{cppIcon}</div>
        <div>{rustIcon}</div>
        <div>{bderIcon}</div>
        <div>{fltIcon}</div>
        <div>{javaIcon}</div>
        <div>{p5Icon}</div>
        <div>{thjsIcon}</div>
        <div>{reactIcon}</div>
      </CardBody>
    </Card>
  );
}
