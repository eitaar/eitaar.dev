import { Card, CardHeader, CardBody, CardFooter, Button, Chip } from '@heroui/react';
import type { ReactNode } from 'react';
import twemoji from '@twemoji/api';
interface ArticleProps {
  data: {
    date: Date;
    title: string;
    tags: string[];
    emoji: string;
  };
  slug: string;
  penIcon?: ReactNode;
}

export default function ArticleCard(article: ArticleProps) {
  const icon = twemoji.parse(article.data.emoji, {
    folder: 'svg',
    ext: '.svg',
  });
  return (
    <Card
      className=""
      isPressable={true}
      as="a"
      href={`/articles/${article.slug}`}
      isHoverable={true}
    >
      <CardHeader className="pb-0">
        <div
          dangerouslySetInnerHTML={{ __html: icon }}
          className="mx-auto h-20 w-20 lg:h-24 lg:w-24"
        />
      </CardHeader>
      <CardBody>
        <h2 className="w-full pb-2 text-center text-xl font-bold lg:text-lg">
          {article.data.title}
        </h2>
        <div className="flex flex-wrap gap-2">
          {article.data.tags.map((tag) => (
            <Chip key={tag} variant="flat" color="secondary" size="sm">
              {tag}
            </Chip>
          ))}
        </div>
      </CardBody>
      <CardFooter className="pt-0">
        <div className="flex items-center gap-1 text-sm text-gray-500">
          {<span>{article.penIcon}</span>}
          <span>
            {new Date(article.data.date).toLocaleDateString('en-GB', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </span>
        </div>
      </CardFooter>
    </Card>
  );
}
