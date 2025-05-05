import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Recipe } from "./gastro-answer";

interface RecipeModalProps {
  isOpen: boolean;
  onClose: () => void;
  recipe: Recipe;
}

export const RecipeModal = ({ isOpen, onClose, recipe }: RecipeModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-background text-muted-foreground border-zinc-800 max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{recipe.title}</DialogTitle>
        </DialogHeader>
        <div className="relative w-full h-64 mb-4">
          <Image
            src={recipe.image || "/placeholder.svg"}
            alt={recipe.title}
            fill
            className="object-cover rounded-lg"
          />
        </div>
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold mb-2">Ingredients</h3>
            <ul className="list-disc pl-5 space-y-1">
              {recipe.ingredients.map((ingredient, idx) => (
                <li key={idx} className="text-muted-foreground">
                  {ingredient}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Instructions</h3>
            <div
              className=" space-y-2 list-decimal list-inside"
              dangerouslySetInnerHTML={{ __html: recipe.instructions }}
              style={{ listStyleType: "decimal", marginLeft: "20px" }}
            />
          </div>
          <div className="flex justify-between pt-4">
            <Button onClick={() => window.open(recipe.source_url, "_blank")}>
              View Source
            </Button>
            <Button variant="ghost" onClick={onClose}>
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
