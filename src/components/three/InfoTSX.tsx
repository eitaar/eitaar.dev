import { Card, CardBody, CardHeader, Chip } from '@heroui/react';
import models from '../../data/models';
import type { Model } from '../../types/common';
import { useEffect, useState } from 'react';

export default function ModelInfo() {
  const [targetModel, setTargetModel] = useState<Model | null>(null);

  useEffect(() => {
    const targetFile = new URLSearchParams(window.location.search).get('file') || 'warn.gltf';
    const model = models.find((model) => model.filename === targetFile) || null;
    setTargetModel(model);
    document.title = model ? `${model.title} - eitaar.dev` : 'eitaar.dev';
  }, []);

  if (!targetModel) {
    return null;
  }
  return (
    <div className="pointer-events-none fixed top-0 z-20 flex w-full flex-col items-end p-4 lg:right-0 lg:max-w-sm">
      <Card className="pointer-events-auto w-full border-1 border-divider bg-background/80 shadow-lg backdrop-blur-sm">
        <CardHeader className="flex flex-col items-start gap-2">
          <h2 className="text-lg font-bold text-foreground">{targetModel?.title}</h2>
          <div className="flex items-center gap-1">
            <Chip variant="solid" color="primary" className="text-small" size="sm">
              {targetModel?.software}
            </Chip>
            <Chip variant="solid" color="secondary" className="text-small" size="sm">
              {targetModel?.date.toLocaleDateString()}
            </Chip>
            <Chip variant="solid" color="success" className="text-small" size="sm">
              {targetModel?.polygons} polygons
            </Chip>
          </div>
        </CardHeader>
        {targetModel?.description && (
          <CardBody className="pt-0">
            <p className="">{targetModel.description}</p>
          </CardBody>
        )}
      </Card>
    </div>
  );
}
