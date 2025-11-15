"use client";

import { useState } from "react";

interface Props {
  open: boolean;
  onClose: () => void;
  onSave: (payload: {
    nome_condominio: string;
    endereco_condominio: string;
    cidade_condominio: string;
    uf_condominio: string;
    tipo_condominio: string;
  }) => Promise<void> | void;
}

export default function CreateCondominioModal({ open, onClose, onSave }: Props) {
  const [nome, setNome] = useState("");
  const [endereco, setEndereco] = useState("");
  const [cidade, setCidade] = useState("");
  const [uf, setUf] = useState("");
  const [tipo, setTipo] = useState("");
  const [loading, setLoading] = useState(false);

  if (!open) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await onSave({
        nome_condominio: nome,
        endereco_condominio: endereco,
        cidade_condominio: cidade,
        uf_condominio: uf,
        tipo_condominio: tipo,
      });

      // se deu certo, limpa o form e fecha
      setNome("");
      setEndereco("");
      setCidade("");
      setUf("");
      setTipo("");
      onClose();
    } catch {
      // o pai já mostra toast de erro, então só não fecha
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center px-4 z-40">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Criar Condomínio</h2>

        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="text"
            placeholder="Nome"
            className="w-full px-3 py-2 border rounded"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />

          <input
            type="text"
            placeholder="Endereço"
            className="w-full px-3 py-2 border rounded"
            value={endereco}
            onChange={(e) => setEndereco(e.target.value)}
            required
          />

          <input
            type="text"
            placeholder="Cidade"
            className="w-full px-3 py-2 border rounded"
            value={cidade}
            onChange={(e) => setCidade(e.target.value)}
            required
          />

          <input
            type="text"
            placeholder="UF"
            className="w-full px-3 py-2 border rounded"
            maxLength={2}
            value={uf}
            onChange={(e) => setUf(e.target.value.toUpperCase())}
            required
          />

          <input
            type="text"
            placeholder="Tipo (Vertical, Horizontal...)"
            className="w-full px-3 py-2 border rounded"
            value={tipo}
            onChange={(e) => setTipo(e.target.value)}
            required
          />

          <div className="flex justify-end gap-2 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded border border-gray-300"
            >
              Cancelar
            </button>

            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? "Criando..." : "Salvar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
