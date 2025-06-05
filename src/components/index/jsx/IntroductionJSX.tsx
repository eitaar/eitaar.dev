import {Card, CardHeader, CardBody, Divider} from "@heroui/react";

interface IntroductionJSXProps {
  introIcon?: React.ReactNode;
  [key: string]: any;
}

export default function IntroductionJSX(props: IntroductionJSXProps) {
  return (
    <Card className="w-full h-full flex-1 font-Quantico" isBlurred={false}>
      <CardHeader className="flex items-center justify-center gap-1">
        <div>{props.introIcon}</div>
        <p className="text-3xl font-Quantico font-bold text-center">About me</p>
      </CardHeader>      
      <div className="px-4">
        <Divider/>
      </div>
      <CardBody className="flex flex-col gap-4">
        <div className="text-center">
          <p className="">
            Coding begginer
          </p>
        </div>
      </CardBody>
    </Card>
  );
}
