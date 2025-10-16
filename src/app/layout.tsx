import { Montserrat } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { UserProvider } from "@/context/UserContext";
import { cookies } from "next/headers";
import { getUserDataServer } from "@/utils/getUserDataServer";

const montserratFont = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = cookies();
  const cookieHeader = cookieStore.toString();
  const serverUser = await getUserDataServer(cookieHeader);

  return (
    <html lang="en">
      <body className={`${montserratFont.variable} antialiased`}>
        <div>
          <UserProvider serverUser={serverUser}>
            {children}
            <Toaster richColors position="top-center" />
          </UserProvider>
        </div>
      </body>
    </html>
  );
}
