import { Montserrat } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

const montserratFont = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});

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
