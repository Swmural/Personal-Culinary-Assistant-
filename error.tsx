"use client";

import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const Error = () => {
  const router = useRouter();
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="text-center space-y-6 animate-fade-up">
        <div className="flex justify-center">
          <AlertTriangle className="h-24 w-24 text-destructive" />
        </div>
        <h1 className="text-4xl font-bold tracking-tight">
          Oops! Something went wrong
        </h1>
        <p className="text-lg text-muted-foreground max-w-md mx-auto">
          We apologize for the inconvenience. Please try again later or return
          to the homepage.
        </p>
        <div className="flex justify-center gap-4">
          <Button onClick={() => window.location.reload()} variant="outline">
            Try Again
          </Button>
          <Button onClick={() => router.push("/")}>Go Home</Button>
        </div>
      </div>
    </div>
  );
};
export default Error;
