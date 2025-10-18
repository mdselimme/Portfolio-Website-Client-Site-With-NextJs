import { Montserrat } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { AuthProver } from "@/context/AuthContext";

const montserratFont = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${montserratFont.variable} antialiased`}>
        <div>
          <AuthProver>
            {children}
            <Toaster richColors position="top-center" />
          </AuthProver>
        </div>
      </body>
    </html>
  );
}
