"use client";

import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const NotFound = () => {
  const router = useRouter();
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="text-center space-y-6 animate-fade-up">
        <div className="flex justify-center">
          <Search className="h-24 w-24 text-primary" />
        </div>
        <h1 className="text-4xl font-bold tracking-tight">
          404 - Page Not Found
        </h1>
        <p className="text-lg text-muted-foreground max-w-md mx-auto">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <div className="flex justify-center">
          <Button onClick={() => router.push("/")}>Back to Home</Button>
        </div>
      </div>
    </div>
  );
};
export default NotFound;
