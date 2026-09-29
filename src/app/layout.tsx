import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { money } from "@/config";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: `Just give me ${money}`,
  description:
    "No product, no perk, no catch. Ten dollars is the least Remitly can do. Send it in about ninety seconds — it is what it is.",
  openGraph: {
    title: `Just give me ${money} — one button, no reason`,
    description:
      "There is no reason. You just can. It takes about ninety seconds.",
    type: "website",
  },
};

export const viewport: Viewport = {
  colorScheme: "normal",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="flex min-h-full flex-col">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <TooltipProvider delay={400}>{children}</TooltipProvider>
          <Toaster position="bottom-center" closeButton />
        </ThemeProvider>
      </body>
    </html>
  );
}
