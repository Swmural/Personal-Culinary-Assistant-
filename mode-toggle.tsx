"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";

export function ModeToggle() {
  const { theme, setTheme } = useTheme();

  // Function to toggle between light and dark mode
  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <Button variant="outline" size="icon" onClick={toggleTheme}>
      {theme === "light" ? (
        <Sun className="h-[2rem] w-[2rem]" />
      ) : (
        <Moon className="h-[2rem] w-[2rem]" />
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
