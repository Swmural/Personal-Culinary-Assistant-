import { RecipeCard } from "./recipe-card";
import Markdown from "react-markdown";
import { useState } from "react";
import { RecipeModal } from "./recipe-modal";

export interface Recipe {
  id: string;
  title: string;
  image?: string;
  ingredients: string[];
  instructions: string;
  source_url?: string;
  rating?: number;
}

interface GastroAnswerProps {
  type: "chat" | "recipe";
  result: string;
  recipes: Recipe[];
}

export const GastroAnswer = ({ type, result, recipes }: GastroAnswerProps) => {
  const [selectedRecipe, setSelectedRecipe] = useState<
    (typeof recipes)[0] | null
  >(null);

  const handleShowMore = (recipe: (typeof recipes)[0]) => {
    setSelectedRecipe(recipe);
  };


  if (type === "chat") {
    console.log(result);
    return (
      <div className="max-w-5xl w-full">
        <div>
          <div className="text-gray-400 gap-2 mb-4 markdown-wrapper">
            <Markdown>{result}</Markdown>
          </div>
        </div>
      </div>
    );
  }

  if (recipes.length == 0) {
    return "No recipe found";
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {recipes.map((recipe) => (
          <RecipeCard
            key={recipe.id}
            id={recipe.id}
            handleShowMore={handleShowMore}
            title={recipe.title}
            image={recipe.image}
            rating={recipe.rating}
            ingredients={recipe.ingredients}
            instructions={recipe.instructions}
            sourceUrl={recipe.source_url}
          />
        ))}
      </div>

      {selectedRecipe && (
        <RecipeModal
          isOpen={!!selectedRecipe}
          onClose={() => setSelectedRecipe(null)}
          recipe={selectedRecipe}
        />
      )}
    </div>
  );
};
