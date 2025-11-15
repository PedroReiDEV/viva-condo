"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";

export default function LoginPage() {
  const supabase = createClient();
  const router = useRouter();

  const [checkingSession, setCheckingSession] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Verifica sessão (se já está logado, vai pro dashboard)
  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        router.replace("/condominios");
        return;
      }
      setCheckingSession(false);
    };
    checkSession();
  }, [router, supabase]);

  // Login
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setErrorMsg(null);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        const msg = error.message.toLowerCase();
        if (msg.includes("invalid")) setErrorMsg("E-mail ou senha inválidos");
        else setErrorMsg("Erro inesperado. Tente novamente.");
        return;
      }

      router.replace("/condominios");
      router.refresh();
    } catch {
      setErrorMsg("Erro inesperado. Tente novamente.");
    } finally {
      setSubmitting(false);
    }
  };

  if (checkingSession) return null;

  return (
    <div className="relative min-h-screen flex bg-gradient-to-br from-red-600 via-red-500 to-red-700">

      {/* Partículas decorativas */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-25">
        <div className="animate-pulse w-64 h-64 bg-white rounded-full blur-3xl absolute top-10 left-10" />
        <div className="animate-pulse w-72 h-72 bg-white rounded-full blur-3xl absolute bottom-20 right-20" />
      </div>

      {/* Esquerda com banner */}
      <div className="hidden lg:flex flex-col justify-center items-center w-1/2 relative">
        <div className="absolute inset-0 rounded-r-[50px] overflow-hidden shadow-2xl">
          <Image
            src="/Banner.png"
            alt="Banner VivaCondo"
            fill
            className="object-cover opacity-90"
          />
        </div>
      </div>

      {/* Direita com card */}
      <div className="flex items-center justify-center w-full lg:w-1/2 p-10 relative">

        <div className="backdrop-blur-xl bg-white/20 border border-white/30 shadow-2xl rounded-3xl p-10 w-full max-w-md text-white">

          {/* Logo */}
          <div className="text-center mb-8">
            <Image
              src="/Logo_viva_condo.png"
              width={200}
              height={70}
              alt="Logo VivaCondo"
              className="mx-auto drop-shadow-lg"
            />
          </div>

          {/* Modelo + título */}
          <div className="flex items-center gap-4 justify-center mb-8">
            <Image
              src="/Modelo_viva_condo.png"
              width={70}
              height={70}
              alt="Modelo"
              className="rounded-full shadow-xl border-2 border-white"
            />

            <h1 className="text-4xl font-bold drop-shadow-lg">
              Bem-vindo
            </h1>
          </div>

          {/* Formulário */}
          <form onSubmit={handleLogin} className="space-y-5">

            <input
              type="email"
              placeholder="E-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 rounded-xl text-black focus:ring-4 focus:ring-red-300 outline-none"
              required
            />

            <input
              type="password"
              placeholder="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 rounded-xl text-black focus:ring-4 focus:ring-red-300 outline-none"
              required
            />

            <button
              type="submit"
              disabled={submitting}
              className="w-full py-3 rounded-xl bg-white text-red-600 font-bold text-lg shadow-lg hover:bg-gray-100 transition disabled:opacity-50"
            >
              {submitting ? "Entrando..." : "Entrar"}
            </button>

            {errorMsg && (
              <p className="text-center text-yellow-300 text-sm font-semibold">
                {errorMsg}
              </p>
            )}
          </form>

          <p className="text-center text-white/80 mt-6 text-sm">
            © {new Date().getFullYear()} VivaCondo — Gestão inteligente para condomínios.
          </p>
        </div>
      </div>
    </div>
  );
}
