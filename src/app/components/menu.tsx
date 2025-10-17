"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LogOut, Building2, Users } from "lucide-react";
import { createClient } from "@/utils/supabase/client";
import { useState } from "react";

export default function Menu() {
  const pathname = usePathname();
  const router = useRouter();
  const supabase = createClient();
  const [loading, setLoading] = useState(false);

  const nav = [
    { href: "/condominios", label: "Condomínios", icon: Building2 },
    { href: "/usuarios", label: "Usuarios", icon: Users },
  ];

  const isActive = (href: string) => pathname?.startsWith(href);

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
    <aside className="fixed left-0 top-0 h-screen w-60 border-r bg-white">
      <div className="px-4 pt-5 pb-3">
        <span className="text-[18px] font-semibold text-zinc-900">Viva Condo</span>
      </div>

      <nav className="px-3">
        <ul className="space-y-1">
          {nav.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={[
                    "flex items-center gap-3 rounded-2xl px-3 py-2 text-sm font-medium select-none transition-colors",
                    active
                      ? "bg-blue-100 text-blue-600"       
                      : "text-zinc-600 hover:bg-zinc-100", 
                  ].join(" ")}
                >
                  <Icon
                    className={[
                      "h-4 w-4",
                      active ? "text-blue-600" : "text-zinc-400",
                    ].join(" ")}
                  />
                  <span>{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="px-3 mt-4">
        <div className="h-px bg-zinc-200 my-3" />
        <button
          onClick={handleLogout}
          disabled={loading}
          className="w-full inline-flex items-center gap-3 rounded-2xl px-3 py-2 text-sm font-medium text-zinc-600 hover:bg-zinc-100 disabled:opacity-50"
        >
          <LogOut className="h-4 w-4 text-zinc-400" />
          {loading ? "Saindo..." : "Sair"}
        </button>
      </div>
    </aside>
  );
}