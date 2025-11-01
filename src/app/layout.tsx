import type { Metadata } from "next";
import "./globals.css";

import { Geist, Geist_Mono } from "next/font/google";
import { createClient } from "@/utils/supabase/server";
import Menu from "@/components/menu";
import { ToastProvider } from "@/components/toastNotification";

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
    <html
      lang="pt-BR"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable}`} // ✅ fontes no <html>
    >
      <body className="antialiased bg-zinc-50 text-zinc-900">
        <ToastProvider>
          <div className="min-h-screen w-full flex">
            {/* ✅ Garanta que <Menu /> tenha w-60 para casar com ml-60 abaixo */}
            {showMenu && <Menu />}

            {/* Se a largura do Menu mudar, ajuste este ml-60 para a mesma largura */}
            <main className={showMenu ? "ml-60 p-6 flex-1" : "flex-1"}>
              {children}
            </main>
          </div>
        </ToastProvider>
      </body>
    </html>
  );
}
