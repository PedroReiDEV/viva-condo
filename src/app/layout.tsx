import type { Metadata } from "next";
import "./globals.css";

import { Geist, Geist_Mono } from "next/font/google";
import Menu from "../components/menu";
import { createClient } from "@/utils/supabase/server";

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
    <html lang="pt-BR" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-zinc-50 text-zinc-900`}
      >
        <div className="min-h-screen w-full flex">
          {/* menu lateral aparece apenas se o usuário estiver logado */}
          {showMenu && <Menu />}

          <main className={showMenu ? "ml-60 p-6 flex-1" : "flex-1"}>
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}