import { Card, CardBody, CardHeader } from '@heroui/react';
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
    <div className="pointer-events-none fixed top-4 right-4 z-20 flex w-full max-w-sm flex-col items-end">
      <Card className="pointer-events-auto w-full border-1 border-divider bg-background/80 shadow-lg backdrop-blur-sm">
        <CardHeader>
          <h2 className="text-lg font-semibold text-foreground">{targetModel?.title}</h2>
        </CardHeader>
        {targetModel?.description && (
          <CardBody>
            <p className="text-small text-foreground/80">{targetModel.description}</p>
          </CardBody>
        )}
      </Card>
    </div>
  );
}
