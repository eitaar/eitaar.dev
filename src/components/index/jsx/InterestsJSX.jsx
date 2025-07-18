import { Card, CardHeader, CardBody } from '@heroui/react';

export default function App(props) {
  return (
    <Card className="CARD flex h-full w-full flex-1 justify-center" isBlurred={false}>
      <CardHeader className="flex items-center justify-center gap-1">
        <div>{props.interestIcon}</div>
        <p className="text-center font-Quantico text-3xl font-bold">Interests</p>
      </CardHeader>
      <CardBody className="flex w-full flex-row flex-wrap items-start justify-center gap-2">
        <div>{props.ardIcon}</div>
        <div>{props.cppIcon}</div>
        <div>{props.rustIcon}</div>
        <div>{props.bderIcon}</div>
        <div>{props.fltIcon}</div>
        <div>{props.javaIcon}</div>
        <div>{props.p5Icon}</div>
        <div>{props.thjsIcon}</div>
        <div>{props.reactIcon}</div>
      </CardBody>
    </Card>
  );
}
