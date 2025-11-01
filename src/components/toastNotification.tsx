"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";
import { CheckCircle2, XCircle, Info } from "lucide-react";

type ToastType = "success" | "error" | "info";
type Toast = { id: number; type: ToastType; title?: string; message: string; duration?: number };
type Ctx = { showToast: (t: Omit<Toast, "id">) => void };

const ToastCtx = createContext<Ctx | null>(null);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = useCallback((t: Omit<Toast, "id">) => {
    const id = Date.now() + Math.random();
    const toast: Toast = { id, duration: 3500, ...t };
    setToasts((prev) => [...prev, toast]);
    setTimeout(() => setToasts((prev) => prev.filter((x) => x.id !== id)), toast.duration);
  }, []);

  const value = useMemo(() => ({ showToast }), [showToast]);

  return (
    <ToastCtx.Provider value={value}>
      {children}

      {/* container no rodapé direito */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
        {toasts.map((t) => {
          const isSuccess = t.type === "success";
          const isError = t.type === "error";
          const isInfo = t.type === "info";

          const wrap =
            isSuccess
              ? "bg-green-50 border-green-200 text-green-700"
              : isError
              ? "bg-red-50 border-red-200 text-red-700"
              : "bg-sky-50 border-sky-200 text-sky-700";

          const Icon = isSuccess ? CheckCircle2 : isError ? XCircle : Info;

          return (
            <div
              key={t.id}
              role="status"
              aria-live="polite"
              className={`min-w-[16rem] max-w-sm rounded-2xl border px-4 py-3 shadow-lg
                          ${wrap} flex items-start gap-3
                          transition-all duration-200 ease-out translate-y-2 opacity-0
                          animate-[toastIn_200ms_ease-out_forwards]`}
            >
              <Icon className="w-5 h-5 mt-0.5" />
              <div className="flex-1">
                {t.title ? (
                  <>
                    <div className="text-sm font-semibold leading-5">{t.title}</div>
                    <div className="text-sm leading-5">{t.message}</div>
                  </>
                ) : (
                  <div className="text-sm font-medium leading-5">{t.message}</div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* animação simples de entrada */}
      <style jsx>{`
        @keyframes toastIn {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </ToastCtx.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastCtx);
  if (!ctx) throw new Error("useToast deve ser usado dentro de <ToastProvider>");
  return ctx;
}
