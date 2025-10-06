import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

const montserratFont = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});

export const metadata: Metadata = {
  title: `Selim Portfolio - ${new Date().getFullYear()}`,
  description: "It's Selim Portfolio Website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${montserratFont.variable} antialiased`}>
        <div>
          {children}
          <Toaster richColors position="top-center" />
        </div>
      </body>
    </html>
  );
}
