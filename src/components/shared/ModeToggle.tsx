"use client";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import TooltipContainer from "./TooltipContainer";

const ModeToggle = () => {

  const { theme, setTheme } = useTheme();

  return (
    <TooltipContainer content="Toggle theme">
      <Button
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        className="bg-transparent text-inherit"
        variant="outline"
        size="icon"
      >
        <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
        <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        <span className="sr-only">Toggle theme</span>
      </Button>
    </TooltipContainer>
  );
};

export default ModeToggle;
