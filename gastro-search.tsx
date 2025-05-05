import React, { useState } from "react";
import Link from "next/link";

import { useCoAgent } from "@copilotkit/react-core";

import { Card } from "./ui/card";
import { CategoryCard } from "./layout/category-card";
import { Textarea } from "./ui/textarea";
import { ModeToggle } from "./mode-toggle";

import { useGastroContext } from "@/lib/gastro-provider";
import { MessageRole, TextMessage } from "@copilotkit/runtime-client-gql";

const GastroSearch: React.FC = () => {
  const { setGastroQuery, gastroInput, setGastroInput } = useGastroContext();
  const [, setIsInputFocused] = useState(false);
  const { run: runGastroAgent } = useCoAgent({
    name: "search_agent",
  });

  const handleGastro = (query: string) => {
    console.log(query);
    setGastroQuery(query);
    runGastroAgent(() => {
      return new TextMessage({
        role: MessageRole.User,
        content: query,
      });
    });
  };

  const suggestions = [
    { label: "Let's Cook Dinner: Chicken, Spinach, and Tomato", icon: "🍽️" },
    { label: "Quick Lunch Ideas: Avocado, Egg, and Spinach", icon: "🥑" },
    { label: "Healthy Breakfast: Oatmeal, Banana, and Almond Butter", icon: "🥪" },
    { label: "Dessert Time: Chocolate, Strawberries, and Cream", icon: "🍰" },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <main className="container mx-auto p-6 space-y-32 flex flex-col items-center">
        <div className="w-full max-w-5xl space-y-8 flex justify-between items-end border-b-2 pb-4 border-gray-600">
          <Link href={"/"} className="text-4xl md:text-5xl font-bold">
            Gastro
          </Link>
          <ModeToggle />
        </div>
        <div className="w-full max-w-5xl space-y-8">
          <div className="relative">
            <Card className="shadow-lg dark:bg-card">
              <Textarea
                placeholder="Search delicious recipes..."
                className="min-h-[200px] resize-none border-0 focus:ring-0 text-2xl p-6 bg-transparent "
                maxLength={250}
                onFocus={() => setIsInputFocused(true)}
                onBlur={() => setIsInputFocused(false)}
                value={gastroInput}
                onChange={(e) => setGastroInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleGastro(gastroInput);
                  }
                }}
              />
            </Card>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {suggestions.map((suggestion) => (
              <CategoryCard
                key={suggestion.label}
                icon={suggestion.icon}
                title={suggestion.label}
                handleGastro={handleGastro}
                className="bg-gray-50 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700"
              />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default GastroSearch;
