"use client";

import { useEffect, useState } from "react";
import { ICondominio } from "@/services/condominio.service";
import { Loader2 } from "lucide-react";

type Props = {
  open: boolean;
  data: ICondominio | null;
  onClose: () => void; 
  onSave: (updates: {
    nome_condominio: string;
    endereco_condominio: string;
    cidade_condominio: string;
    uf_condominio: string;
    tipo_condominio: string;
  }) => Promise<void>; 
};

export default function EditCondominioModal({ open, data, onClose, onSave }: Props) {
  const [form, setForm] = useState({
    nome_condominio: "",
    endereco_condominio: "",
    cidade_condominio: "",
    uf_condominio: "",
    tipo_condominio: "",
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!open || !data) return;
    setForm({
      nome_condominio: data.nome_condominio ?? "",
      endereco_condominio: data.endereco_condominio ?? "",
      cidade_condominio: data.cidade_condominio ?? "",
      uf_condominio: data.uf_condominio ?? "",
      tipo_condominio: data.tipo_condominio ?? "",
    });
    setError(null);
    setSaving(false);
  }, [open, data]);

  if (!open || !data) return null;

  function updateField<K extends keyof typeof form>(key: K, value: (typeof form)[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.nome_condominio.trim()) {
      setError("Informe o nome do condomínio.");
      return;
    }
    setSaving(true);
    setError(null);
    try {
      await onSave(form);
    } catch (e: any) {
      setError(e?.message ?? "Falha ao salvar alterações.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="edit-condominio-title"
      aria-busy={saving || undefined}
      className="fixed inset-0 z-50 flex items-center justify-center"
      onClick={(e) => {
        if (e.target === e.currentTarget && !saving) onClose();
      }}
      onKeyDown={(e) => {
        if (e.key === "Escape" && !saving) onClose();
      }}
    >
      <div className="absolute inset-0 bg-black/40" />

      <div className="relative z-10 w-full max-w-2xl rounded-2xl bg-white p-6 shadow-xl">
        <h2 id="edit-condominio-title" className="text-lg font-semibold text-gray-900">
          Editar condomínio #{data.id_condominio}
        </h2>

        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          {error && <div className="rounded-md bg-red-50 border border-red-200 px-3 py-2 text-red-700 text-sm">{error}</div>}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-sm text-gray-600 mb-1">Nome</label>
              <input
                className="w-full rounded-md border border-gray-300 px-3 py-2"
                value={form.nome_condominio}
                onChange={(e) => updateField("nome_condominio", e.target.value)}
                required
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-sm text-gray-600 mb-1">Endereço</label>
              <input
                className="w-full rounded-md border border-gray-300 px-3 py-2"
                value={form.endereco_condominio}
                onChange={(e) => updateField("endereco_condominio", e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-1">Cidade</label>
              <input
                className="w-full rounded-md border border-gray-300 px-3 py-2"
                value={form.cidade_condominio}
                onChange={(e) => updateField("cidade_condominio", e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-1">UF</label>
              <input
                className="w-full rounded-md border border-gray-300 px-3 py-2"
                value={form.uf_condominio}
                onChange={(e) => updateField("uf_condominio", e.target.value.toUpperCase())}
                maxLength={2}
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-sm text-gray-600 mb-1">Tipo</label>
              <input
                className="w-full rounded-md border border-gray-300 px-3 py-2"
                value={form.tipo_condominio}
                onChange={(e) => updateField("tipo_condominio", e.target.value)}
              />
            </div>
          </div>

          <div className="flex items-center gap-3 pt-2">
            <button
              type="button"
              onClick={() => !saving && onClose()}
              className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50"
              disabled={saving}
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={saving}
              className="px-4 py-2 rounded-lg bg-sky-600 text-white hover:bg-sky-700 disabled:opacity-60 inline-flex items-center gap-2"
            >
              {saving && <Loader2 className="w-4 h-4 animate-spin" />}
              {saving ? "Salvando..." : "Salvar alterações"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
