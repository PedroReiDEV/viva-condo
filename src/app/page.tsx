"use client";
 
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client"; 
 
export default function Login() {
  const supabase = createClient();
  const router = useRouter();
 
  const [checkingSession, setCheckingSession] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
 
  useEffect(() => {
    const checkSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user) {
          router.replace("/condominios");
          return;
        }
      } catch {
      } finally {
        setCheckingSession(false);
      }
    };
    checkSession();
  }, [router, supabase]);
 
  const login = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSubmitting(true);
 
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
 
      if (error) {
        const msg = error.message?.toLowerCase() ?? "";
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
    <div className="flex h-screen flex-col md:flex-row">
      <div className="w-full flex items-center justify-center p-6">
        <div className="w-full max-w-md bg-white p-8 shadow-lg rounded-lg">
          <h2 className="text-2xl font-bold mb-4">Olá 👋</h2>
          <p className="text-gray-500 mb-6">
            Insira as informações que você usou ao se registrar.
          </p>
 
          <form onSubmit={login} className="space-y-4">
            <input
              type="email"
              placeholder="E-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500"
              required
              disabled={submitting}
            />
            <input
              type="password"
              placeholder="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500"
              required
              disabled={submitting}
            />
 
            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-gradient-to-r from-blue-500 to-green-500 text-white p-3 rounded-md hover:opacity-90 transition-all disabled:opacity-50"
            >
              {submitting ? "Entrando..." : "Entrar"}
            </button>
 
            {errorMsg && (
              <p className="text-red-600 text-sm mt-2">{errorMsg}</p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
 