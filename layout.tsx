import type { Metadata } from "next";

import "./globals.css";

import { ThemeProvider } from "@/components/theme-provider";

export const metadata: Metadata = {
  title: "Gastro",
  description: "Powered by Coagents",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`min-h-screen bg-background text-foreground`}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
