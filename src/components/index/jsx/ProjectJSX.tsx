import {Card, CardHeader, CardBody, CardFooter, Button, Chip} from "@heroui/react";
import type { ReactNode } from "react";

interface ProjectProps {
  title: string;
  stack: string[];
  description: string;
  github?: string;
  page?: string;
  children: ReactNode;
}

export default function ProjectJSX({ title, stack, description, github, page, children }: ProjectProps) {
  return (
    <Card className="max-w-sm font-Quantico">
      <CardHeader>
        {children}
      </CardHeader>
      <CardBody className="pt-0 pb-2">
        <h2 className="text-2xl font-bold text-center">{title}</h2>
      </CardBody>
      <CardBody className="pt-0 pb-2">
        <div className="flex flex-wrap gap-1 justify-center">
          {stack.map((item, index) => (
            <Chip key={index} color="primary" size="sm" variant="flat">
              {item}
            </Chip>
          ))}
        </div>
      </CardBody>
      <CardBody className="pt-0">
        <p className="text-center">{description}</p>
      </CardBody>
      <CardFooter className="flex gap-2 w-1/2 ml-auto pt-0">
        {github && (
          <Button
            color="secondary"
            variant="flat"
            className="w-full"
            href={github}
            target="_blank"
            as="a"
          >
            Github
          </Button>
        )}
        {page && (
          <Button
            color="success"
            variant="flat"
            className={github ? "w-full" : "w-1/2 ml-auto"}
            href={page}
            target="_blank"
            as="a"
          >
            Visit
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}