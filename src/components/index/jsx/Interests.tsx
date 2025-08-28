import { Card, CardHeader, CardBody } from '@heroui/react';
import type { ReactNode } from 'react';

interface InterestsProps {
  interestIcon?: ReactNode;
  arduinoIcon?: ReactNode;
  cppIcon?: ReactNode;
  rustIcon?: ReactNode;
  blenderIcon?: ReactNode;
  flutterIcon?: ReactNode;
  javaIcon?: ReactNode;
  p5jsIcon?: ReactNode;
  threejsIcon?: ReactNode;
  reactIcon?: ReactNode;
}

export default function Interests({
  interestIcon,
  arduinoIcon,
  cppIcon,
  rustIcon,
  blenderIcon,
  flutterIcon,
  javaIcon,
  p5jsIcon,
  threejsIcon,
  reactIcon,
}: InterestsProps) {
  return (
    <Card className="CARD flex h-full w-full flex-1 justify-center" isBlurred={true}>
      <CardHeader className="flex items-center justify-center gap-1">
        <div>{interestIcon}</div>
        <p className="text-center font-Quantico text-3xl font-bold">Interests</p>
      </CardHeader>
      <CardBody className="flex w-full flex-row flex-wrap items-start justify-center gap-2">
        <div>{arduinoIcon}</div>
        <div>{cppIcon}</div>
        <div>{rustIcon}</div>
        <div>{blenderIcon}</div>
        <div>{flutterIcon}</div>
        <div>{javaIcon}</div>
        <div>{p5jsIcon}</div>
        <div>{threejsIcon}</div>
        <div>{reactIcon}</div>
      </CardBody>
    </Card>
  );
}
