import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import ThemeProvider from "@/components/providers/theme-provider";
import { LanguageProvider } from "@/components/providers/language-context";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className="bg-white text-black dark:bg-black dark:text-white transition-colors">
        <ThemeProvider>
          <LanguageProvider>
            {children}
            <Toaster richColors position="top-right" />
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
