import {Card, CardHeader, CardBody, CardFooter, Button, Chip} from "@heroui/react";
import type { ReactNode } from "react";

interface ArticleProps {
  data: {
    date: Date;
    title: string;
    tags: string[];
    emoji: string;
  }
  slug: string;
}

export default function ArticleCard(article: ArticleProps) {
  return (
    <Card className="">
      <CardHeader className="pb-0">
        <p className="emoji text-8xl text-center w-full font-Quantico">{article.data.emoji}</p>
      </CardHeader>
      <CardBody>
        <h2 className="text-lg text-center w-full font-bold pb-2">{article.data.title}</h2>
        <div className="flex flex-wrap gap-2">
          {article.data.tags.map((tag) => (
            <Chip key={tag} variant="flat" color="secondary" size="sm">
              {tag}
            </Chip>
          ))}
        </div>
      </CardBody>
      <CardFooter className="pt-0">
        <Button color="primary" variant="flat" className="ml-auto" as="a" href={`/articles/${article.slug}`}>Read More</Button>
      </CardFooter>
    </Card>
  );
}
