import React from "react";
import { Card } from "../ui/card";

interface CategoryCardProps {
  icon: string;
  title: string;
  className?: string;
  handleGastro: (query: string) => void;
}

export const CategoryCard: React.FC<CategoryCardProps> = ({
  icon,
  title,
  className,
  handleGastro,
}) => {
  return (
    <Card
      onClick={() => handleGastro(title)}
      className={`p-4 transition-all duration-200 cursor-pointer flex items-center gap-3 shadow-sm hover:shadow-md hover:scale-[1.02] active:scale-[0.98] ${className}`}
    >
      <span className="text-2xl">{icon}</span>
      <span className="font-medium text-lg">{title}</span>
    </Card>
  );
};
