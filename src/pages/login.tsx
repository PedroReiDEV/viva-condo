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

  // Verifica se já está logado
  useEffect(() => {
    const checkSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (session?.user) {
        router.replace("/condominios");
        return;
      }

      setCheckingSession(false);
    };

    checkSession();
  }, [router, supabase]);

  // Função de login reaproveitada + aprimorada
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
        if (error.status === 400 || msg.includes("invalid")) {
          setErrorMsg("E-mail ou senha inválidos");
        } else {
          setErrorMsg("Erro inesperado. Tente novamente.");
        }
        return;
      }

      if (!data?.user) {
        setErrorMsg("Erro inesperado. Tente novamente.");
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
    <div className="min-h-screen flex bg-gray-100">

      {/* --- LADO ESQUERDO: Banner --- */}
      <div className="hidden lg:flex flex-col justify-center items-center w-1/2 bg-white relative shadow-xl">
        <Image
          src="/Banner.png"
          alt="Banner VivaCondo"
          fill
          className="object-cover opacity-90 rounded-r-3xl"
        />
      </div>

      {/* --- LADO DIREITO: Formulário --- */}
      <div className="flex flex-col justify-center items-center w-full lg:w-1/2 px-12 py-10">

        {/* Logo */}
        <div className="mb-10 text-center">
          <Image
            src="/Logo_viva_condo.png"
            width={180}
            height={60}
            alt="VivaCondo Logo"
            className="mx-auto"
          />
        </div>

        {/* Modelo + Título */}
        <div className="flex items-center gap-4 mb-8">
          <Image
            src="/Modelo_viva_condo.png"
            width={70}
            height={70}
            alt="Modelo VivaCondo"
            className="rounded-full shadow-lg"
          />
          <h1 className="text-3xl font-bold text-gray-800">
            Bem-vindo ao VivaCondo
          </h1>
        </div>

        {/* Card de Login */}
        <div className="w-full max-w-md bg-white p-8 shadow-lg rounded-lg">
          <h2 className="text-2xl font-bold mb-4">Olá 👋</h2>
          <p className="text-gray-500 mb-6">
            Insira suas credenciais para acessar o sistema.
          </p>

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="email"
              placeholder="E-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border rounded-md focus:ring-2 focus:ring-red-500"
              required
              disabled={submitting}
            />

            <input
              type="password"
              placeholder="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border rounded-md focus:ring-2 focus:ring-red-500"
              required
              disabled={submitting}
            />

            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-red-600 hover:bg-red-700 transition text-white p-3 rounded-md font-semibold disabled:opacity-50"
            >
              {submitting ? "Entrando..." : "Entrar"}
            </button>

            {errorMsg && (
              <p className="text-red-600 text-sm mt-2">{errorMsg}</p>
            )}
          </form>
        </div>

        <p className="mt-4 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} VivaCondo • Todos os direitos reservados
        </p>
      </div>
    </div>
  );
}
