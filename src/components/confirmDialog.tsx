"use client";

import { ReactNode, useEffect } from "react";
import { AlertTriangle, Loader2 } from "lucide-react";

type ConfirmDialogProps = {
  open: boolean;
  title?: string;
  description?: ReactNode;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;

  /** Desabilita ações enquanto processa (ex.: “Excluindo...”) */
  confirmDisabled?: boolean; // 🆕
};

export default function ConfirmDialog({
  open,
  title = "Excluir condomínio",
  description,
  confirmLabel = "Excluir",
  cancelLabel = "Cancelar",
  onConfirm,
  onCancel,
  confirmDisabled = false, // 🆕
}: ConfirmDialogProps) {
  // trava o scroll quando aberto
  useEffect(() => {
    if (!open) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = original; };
  }, [open]);

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-busy={confirmDisabled || undefined} // 🆕 acessibilidade
      className="fixed inset-0 z-40 flex items-center justify-center"
      onClick={(e) => {
        // bloqueia fechar por clique fora enquanto processa
        if (e.target === e.currentTarget && !confirmDisabled) onCancel();
      }}
      // bloqueia ESC enquanto processa
      onKeyDown={(e) => {
        if (e.key === "Escape" && !confirmDisabled) onCancel();
      }}
    >
      <div className="absolute inset-0 bg-black/40" />

      <div className="relative z-10 w-full max-w-md rounded-2xl bg-white p-6 shadow-xl text-center">
        {/* ícone topo */}
        <div className="flex justify-center mb-3">
          <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
            <AlertTriangle className="w-7 h-7 text-red-600" />
          </div>
        </div>

        {/* título */}
        <h2 className="text-lg font-semibold text-gray-900 mb-2">
          {title}
        </h2>

        {/* texto */}
        <div className="text-sm text-gray-700">
          {description}
        </div>

        {/* ações */}
        <div className="mt-6 flex justify-center gap-3">
          <button
            type="button"
            onClick={onCancel}
            disabled={confirmDisabled}                 // 🆕
            className="px-5 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-sky-400"
          >
            {cancelLabel}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={confirmDisabled}                 // 🆕
            className="px-5 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 disabled:opacity-60 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-red-500 inline-flex items-center justify-center gap-2"
          >
            {confirmDisabled && <Loader2 className="w-4 h-4 animate-spin" />} {/* 🆕 */}
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
