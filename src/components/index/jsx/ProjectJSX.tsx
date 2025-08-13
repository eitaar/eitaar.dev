import { Card, CardHeader, CardBody, CardFooter, Button, Chip } from '@heroui/react';
import type { ReactNode } from 'react';

interface ProjectProps {
  title: string;
  stack: string[];
  description: string;
  github?: string;
  page?: string;
  children: ReactNode;
  githubIcon?: ReactNode;
  pageIcon?: ReactNode;
}

export default function ProjectJSX({
  title,
  stack,
  description,
  github,
  page,
  children,
  githubIcon,
  pageIcon,
}: ProjectProps) {
  return (
    <Card className="CARD font-Quantico text-sm" isBlurred={false}>
      <CardHeader>{children}</CardHeader>
      <CardBody className="pt-0 pb-2">
        <h2 className="text-center text-2xl font-bold">{title}</h2>
      </CardBody>
      <CardBody className="pt-0 pb-2">
        <div className="flex flex-wrap justify-center gap-1">
          {stack.map((item, index) => (
            <Chip key={index} color="success" size="sm" variant="flat">
              {item}
            </Chip>
          ))}
        </div>
      </CardBody>
      <CardBody className="pt-0">
        <p className="text-center">{description}</p>
      </CardBody>
      <CardFooter className="ml-auto flex gap-2 pt-0">
        {github && (
          <Button
            color="default"
            variant="light"
            className="ml-auto"
            href={github}
            target="_blank"
            as="a"
            startContent={githubIcon}
          >
            Github
          </Button>
        )}
        {page && (
          <Button
            color="primary"
            variant="flat"
            className={github ? '' : 'ml-auto'}
            href={page}
            target="_blank"
            as="a"
            startContent={pageIcon}
          >
            Visit
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
