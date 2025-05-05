import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";

export const CTASection: React.FC = () => {
  return (
    <section className="w-ful max-w-5xl px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto text-center">
        <h2 className="text-5xl font-extrabold mb-6">
          Ready to Transform Your Cooking?
        </h2>
        <p className="text-xl mb-8 text-gray-600 dark:text-gray-200">
          Join thousands of food enthusiasts and culinary professionals using
          Gastro today.
        </p>
        <Button className="border-2 text-xl font-bold tracking-wide py-6 px-8 rounded-xl my-10 transition duration-300 ease-in-out hover:scale-105">
          <Link href="/generate">Get Started for Free</Link>
        </Button>
      </div>
    </section>
  );
};
