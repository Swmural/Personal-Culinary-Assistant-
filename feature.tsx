import React from "react";
import { ChefHat, Book, MessageCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

interface FeatureCardProps {
  icon: React.ReactElement;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  icon,
  title,
  description,
}) => {
  return (
    <Card className="b border border-gray-200 dark:border-gray-800">
      <CardHeader>
        <CardTitle className="flex items-center gap-4 text-xl">
          {icon}
          <span>{title}</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p>{description}</p>
      </CardContent>
    </Card>
  );
};

export const FeaturesSection: React.FC = () => {
  return (
    <section className="w-full max-w-5xl flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto py-8">
        <h2 className="text-5xl font-bold text-center mb-12">
          What Gastro Can Do For You?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-16">
          <FeatureCard
            icon={<ChefHat className="h-10 w-10" />}
            title="Recipe Suggestions"
            description="Get personalized recipe ideas based on your preferences and available ingredients."
          />
          <FeatureCard
            icon={<Book className="h-10 w-10" />}
            title="Cooking Techniques"
            description="Learn new cooking methods and improve your culinary skills with step-by-step guides."
          />
          <FeatureCard
            icon={<MessageCircle className="h-10 w-10" />}
            title="Culinary Q&A"
            description="Ask any food-related question and get expert answers instantly."
          />
        </div>
      </div>
    </section>
  );
};
