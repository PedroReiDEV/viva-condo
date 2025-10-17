"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LogOut, Building2, Users, PanelsTopLeft } from "lucide-react";
import { createClient } from "@/utils/supabase/client";
import { useState } from "react";

export default function Menu() {
  const pathname = usePathname();
  const router = useRouter();
  const supabase = createClient();
  const [loading, setLoading] = useState(false);

  const nav = [
    { href: "/condominios", label: "Condomínios", icon: Building2 },
    { href: "/usuarios", label: "Usuários", icon: Users },
  ];

  const isActive = (href: string) => pathname === href;

  const handleLogout = async () => {
    try {
      setLoading(true);
      await supabase.auth.signOut();
      router.replace("/");
    } finally {
      setLoading(false);
    }
  };

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 border-r bg-white/90 backdrop-blur-sm shadow-sm flex flex-col">
      <div className="px-4 py-5 flex items-center gap-2 border-b">
        <PanelsTopLeft className="h-5 w-5" />
        <span className="font-semibold tracking-wide">Viva Condo</span>
      </div>

      <nav className="flex-1 p-2">
        <ul className="space-y-1">
          {nav.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={[
                    "flex items-center gap-3 rounded-lg px-3 py-2 transition-colors",
                    active
                      ? "bg-blue-600 text-white"
                      : "text-zinc-800 hover:bg-zinc-100",
                  ].join(" ")}
                  aria-current={active ? "page" : undefined}
                >
                  <Icon className="h-4 w-4" />
                  <span className="text-sm font-medium">{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="p-2 border-t">
        <button
          onClick={handleLogout}
          disabled={loading}
          className="w-full inline-flex items-center justify-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-zinc-800 hover:bg-zinc-100 disabled:opacity-50"
        >
          <LogOut className="h-4 w-4" />
          {loading ? "Saindo..." : "Sair"}
        </button>
      </div>
    </aside>
  );
}