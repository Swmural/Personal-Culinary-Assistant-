import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Recipe } from "./gastro-answer";

interface RecipeCardProps {
  id: string;
  title: string;
  image?: string;
  rating?: number;
  ingredients: string[];
  instructions: string;
  sourceUrl?: string;
  handleShowMore: (recipe: Recipe) => void;
}

export function RecipeCard({
  id,
  title,
  image,
  rating,
  ingredients,
  instructions,
  sourceUrl,
  handleShowMore,
}: RecipeCardProps) {
  return (
    <Card className="w-full hover:box-shadow-2xl bg-background text-foreground border-gray-700   transition-all duration-300">
      {image && (
        <div className="relative w-full h-56 overflow-hidden rounded-t-lg">
          <Image
            src={image}
            layout="fill"
            alt={title}
            className="object-cover transition-transform duration-300"
            priority
          />
        </div>
      )}
      <CardHeader>
        <CardTitle className="text-xl font-bold">{title}</CardTitle>
        {rating && (
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-current text-yellow-400" />
            <span className="text-sm">{(rating / 20).toFixed(1)}/5</span>
          </div>
        )}
      </CardHeader>
      <CardContent>
        <div
          className={cn(
            "space-y-4 transition-all duration-300 max-h-36 overflow-hidden"
          )}
        >
          {ingredients.length > 0 && (
            <div>
              <h3 className="font-semibold mb-2">Ingredients</h3>
              <ul className="list-disc list-inside space-y-1">
                {ingredients.map((ingredient, index) => (
                  <li key={index}>{ingredient}</li>
                ))}
              </ul>
            </div>
          )}
          {instructions && (
            <div>
              <h3 className="font-semibold  mb-2">Instructions</h3>
              <div
                className="whitespace-pre-wrap"
                dangerouslySetInnerHTML={{ __html: instructions }}
              />
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between items-center">
        <Button
          variant="ghost"
          onClick={() =>
            handleShowMore({
              id,
              title,
              image,
              rating,
              ingredients,
              instructions,
              source_url: sourceUrl,
            })
          }
        >
          Show More
        </Button>
        {sourceUrl && (
          <Button
            onClick={() => window.open(sourceUrl, "_blank")}
          >
            View Source
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
