import type { Metadata } from "next";
import "./globals.css";

import { Geist, Geist_Mono } from "next/font/google";
import { createClient } from "@/utils/supabase/server";
import Menu from "./components/menu";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Viva Condo",
  description: "Aplicação de gestão condominial",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  const showMenu = Boolean(session);

  return (
    <html lang="pt-BR">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <div className="min-h-screen w-full flex">
          {showMenu && <Menu />}

          <main className={showMenu ? "ml-64 flex-1" : "flex-1"}>
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}