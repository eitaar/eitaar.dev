import { Card, CardBody, CardHeader } from '@heroui/react';

interface ModelInfoProps {
  title: string;
  description?: string;
  date: Date | string;
  test: any; // Adjust type as needed
}

export default function ModelInfo({ title, description, date, test }: ModelInfoProps) {
  const formatDate = (date: Date | string) => {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    return new Intl.DateTimeFormat('ja-JP', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(dateObj);
  };

  return (
    <div className="pointer-events-none fixed z-10 flex w-full flex-col items-center p-4 lg:items-end">
      <Card className="pointer-events-auto z-10 w-auto max-w-sm border-1 border-divider">
        <CardHeader>
          <div className="flex flex-col gap-1">
            <h2 className="text-lg font-semibold text-foreground">{title}</h2>
            <p className="text-small text-default-500">{formatDate(date)}</p>
          </div>
        </CardHeader>
        {description && (
          <CardBody className="">
            <p className="">{description}</p>
          </CardBody>
        )}
      </Card>
    </div>
  );
}
