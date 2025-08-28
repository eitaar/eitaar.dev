import { Card, CardHeader, CardBody } from '@heroui/react';
import type { Hobby } from '../../../types/common';

interface HobbiesProps {
  hobbies: Hobby[];
  hobbyIcon?: React.ReactNode;
  [key: string]: any;
}

export default function Hobbies(props: HobbiesProps) {
  const { hobbies } = props;

  return (
    <Card className="CARD w-full flex-1 font-Quantico" isBlurred={true}>
      <CardHeader className="flex items-center justify-center gap-1">
        <div>{props.hobbyIcon}</div>
        <p className="text-center font-Quantico text-3xl font-bold">Hobbies</p>
      </CardHeader>
      <CardBody>
        <div className="flex w-full flex-col flex-wrap gap-4">
          {hobbies &&
            hobbies.map((hobby, index) => (
              <div key={hobby.title} className="flex items-center gap-4">
                <div>{props[`hobbyIcon${index}`]}</div>
                <div>
                  <h3 className="text-lg font-bold">{hobby.title}</h3>
                  <p className="text-sm text-default-500">{hobby.flavour}</p>
                </div>
              </div>
            ))}
        </div>
      </CardBody>
    </Card>
  );
}
