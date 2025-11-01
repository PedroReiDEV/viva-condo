"use client";

import { useEffect, useRef, useState } from "react";
import { MoreVertical, Pencil, Trash2 } from "lucide-react";

type Props = {
  onEdit?: () => void;
  onDelete?: () => void;
  disabled?: boolean;
  align?: "left" | "right";
  "data-testid"?: string;
  labels?: {
    edit?: string;
    remove?: string;
  };
};

export default function Dropdown({
  onEdit,
  onDelete,
  disabled,
  align = "right",
  labels,
  ...rest
}: Props) {
  const [open, setOpen] = useState(false);
  const btnRef = useRef<HTMLButtonElement | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);

  // fechar com clique fora e ESC
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (!open) return;
      const t = e.target as Node;
      if (menuRef.current?.contains(t) || btnRef.current?.contains(t)) return;
      setOpen(false);
    }
    function handleEsc(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEsc);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEsc);
    };
  }, [open]);

  return (
    <div className="relative inline-block text-left" {...rest}>
      <button
        ref={btnRef}
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        disabled={!!disabled}
        onClick={() => setOpen((v) => !v)}
        className="p-2 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-sky-400 disabled:opacity-40"
      >
        <MoreVertical className="h-5 w-5" aria-hidden="true" />
        <span className="sr-only">Abrir ações</span>
      </button>

      {open && (
        <div
          ref={menuRef}
          role="menu"
          tabIndex={-1}
          className={`absolute z-20 mt-2 min-w-40 rounded-xl border border-gray-200 bg-white shadow-lg focus:outline-none
            ${align === "right" ? "right-0 origin-top-right" : "left-0 origin-top-left"}`}
        >
          <button
            role="menuitem"
            onClick={() => {
              setOpen(false);
              onEdit?.();
            }}
            className="w-full flex items-center gap-2 px-3 py-2 rounded-t-xl hover:bg-gray-50 focus:bg-gray-50 focus:outline-none"
          >
            <Pencil className="h-4 w-4" />
            <span>{labels?.edit ?? "Editar"}</span>
          </button>

          <button
            role="menuitem"
            onClick={() => {
              setOpen(false);
              onDelete?.();
            }}
            className="w-full flex items-center gap-2 px-3 py-2 rounded-b-xl hover:bg-red-50 focus:bg-red-50 focus:outline-none"
          >
            <Trash2 className="h-4 w-4 text-red-600" />
            <span className="text-red-600">{labels?.remove ?? "Excluir"}</span>
          </button>
        </div>
      )}
    </div>
  );
}
