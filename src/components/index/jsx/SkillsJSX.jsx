import { Card, CardHeader, CardBody } from '@heroui/react';

export default function App(props) {
  return (
    <Card className="CARD flex h-full w-full flex-1 justify-center" isBlurred={false}>
      <CardHeader className="flex items-center justify-center gap-1">
        <div>{props.skillIcon}</div>
        <p className="text-center font-Quantico text-3xl font-bold">Skills</p>
      </CardHeader>
      <CardBody className="flex w-full flex-row flex-wrap items-start justify-center gap-2">
        <div>{props.jsIcon}</div>
        <div>{props.tsIcon}</div>
        <div>{props.nuxtIcon}</div>
        <div>{props.vueIcon}</div>
        <div>{props.astroIcon}</div>
        <div>{props.twIcon}</div>
        <div>{props.pixIcon}</div>
        <div>{props.pyIcon}</div>
        <div>{props.mdIcon}</div>
      </CardBody>
    </Card>
  );
}
