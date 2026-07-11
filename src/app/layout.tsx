import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/shared/ThemeProvider";
import { Navbar } from "@/components/shared/Navbar";
import AnnouncementsBanner from "@/components/shared/AnnouncementsBanner";
import { GlobalAIAssistant } from "@/components/shared/GlobalAIAssistant";
import { PremiumBackground } from "@/components/layout/PremiumBackground";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CodeVerse | The Complete CS Learning Platform",
  description: "Learn Computer Science through structured roadmaps, concise notes, interactive coding, quizzes, and an AI study assistant.",
  openGraph: {
    title: "CodeVerse | Learning Platform",
    description: "The complete platform to master computer science and coding interviews.",
    url: "https://codeverse.app",
    siteName: "CodeVerse",
    images: [
      {
        url: "https://codeverse.app/og.png", // Placeholder
        width: 1200,
        height: 630,
        alt: "CodeVerse Platform",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "CodeVerse",
    description: "Master Computer Science & DSA.",
    images: ["https://codeverse.app/og.png"], // Placeholder
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.className} min-h-screen bg-background font-sans antialiased selection:bg-primary/30 overflow-x-hidden`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <PremiumBackground />
          <div className="relative flex min-h-screen flex-col">
            <AnnouncementsBanner />
            <Navbar />
            <main className="flex-1 pt-16">{children}</main>
            <GlobalAIAssistant />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
