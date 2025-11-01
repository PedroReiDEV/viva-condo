"use client";

import { useEffect, useState } from "react";
import {
  ICondominio,
  getCondominios,
  deleteCondominio,
} from "@/services/condominio.service";

import SearchBox from "@/components/search";
import Dropdown from "@/components/dropdown";
import ConfirmDialog from "@/components/confirmDialog";
import { useToast } from "@/components/toastNotification";

export default function ListaCondominios() {
  const [condominio, setCondominios] = useState<ICondominio[]>([]);
  const [filtered, setFiltered] = useState<ICondominio[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [selected, setSelected] = useState<ICondominio | null>(null);
  const [isDeleting, setIsDeleting] = useState(false); // 🆕 novo estado

  const { showToast } = useToast();

  // ====== BUSCAR LISTA ======
  const fetchCondominios = async () => {
    try {
      setLoading(true);
      const data = await getCondominios();
      setCondominios(data);
      setFiltered(data);
    } catch (err: any) {
      setError(err.message || "Erro ao carregar dados.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCondominios();
  }, []);

  // ====== AÇÕES ======
  function handleEdit(item: ICondominio) {
    showToast({
      type: "info",
      message: `Abrir edição de "${item.nome_condominio}" (EM BREVE NOS.....CINEMAS🎬🫂).`,
    });
  }

  function handleAskDelete(item: ICondominio) {
    setSelected(item);
    setConfirmOpen(true);
  }

  async function handleConfirmDelete() {
    if (!selected) return;
    setIsDeleting(true); // 🆕 começa o loading

    try {
      await deleteCondominio(selected.id_condominio);

      showToast({
        type: "success",
        message: "Condomínio excluído com sucesso",
      });

      await fetchCondominios(); // 🔄 atualiza lista
    } catch (e: any) {
      showToast({
        type: "error",
        message: e?.message ?? "Não foi possível excluir o condomínio.",
      });
    } finally {
      setIsDeleting(false); // 🆕 termina o loading
      setConfirmOpen(false);
      setSelected(null);
    }
  }

  // ====== RENDER ======
  return (
    <div className="p-6 max-w-full">
      <div className="mb-4 flex items-center justify-between gap-4">
        <h1 className="text-xl font-semibold">Condomínios</h1>
      </div>

      <SearchBox
        condominios={condominio}
        search={search}
        setSearch={setSearch}
        setFiltered={setFiltered}
        placeholder="Pesquisar..."
      />

      <div className="bg-white rounded-md border border-gray-200 overflow-visible">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 pt-3 whitespace-nowrap text-sm text-gray-500 w-12">#</th>
              <th className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">Nome</th>
              <th className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">Endereço</th>
              <th className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">Cidade</th>
              <th className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">UF</th>
              <th className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">Tipo</th>
              <th className="px-4 py-3 whitespace-nowrap text-sm text-gray-500 text-right">
                Ação
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200 bg-white">
            {loading ? (
              <tr>
                <td className="px-4 py-3 text-center text-gray-500" colSpan={7}>
                  Carregando Condomínios...
                </td>
              </tr>
            ) : error ? (
              <tr>
                <td className="px-4 py-3 text-center text-red-500" colSpan={7}>
                  Erro: {error}
                </td>
              </tr>
            ) : filtered.length === 0 ? (
              <tr>
                <td className="px-4 py-3 text-sm text-gray-700" colSpan={7}>
                  Nenhum condomínio encontrado.
                </td>
              </tr>
            ) : (
              filtered.map((item, index) => (
                <tr key={item.id_condominio} className="hover:bg-gray-50">
                  <td className="px-4 pt-3 whitespace-nowrap text-sm text-gray-500">
                    {String(index + 1)}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">
                    {item.nome_condominio}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">
                    {item.endereco_condominio}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">
                    {item.cidade_condominio}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">
                    {item.uf_condominio}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">
                    {item.tipo_condominio}
                  </td>

                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700 text-right">
                    <Dropdown
                      onEdit={() => handleEdit(item)}
                      onDelete={() => handleAskDelete(item)}
                      align="right"
                      labels={{ edit: "Editar", remove: "Excluir" }}
                    />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* ConfirmDialog estilizado */}
      <ConfirmDialog
        open={confirmOpen}
        title="Excluir condomínio"
        description={
          selected && (
            <>
              <p>
                Tem certeza de que deseja excluir o condomínio{" "}
                <b className="text-sky-700">{selected.nome_condominio}</b>?
              </p>
              <p className="text-red-600 mt-1">
                Todos os moradores vinculados a este condomínio também serão
                excluídos. Esta ação não poderá ser desfeita.
              </p>
            </>
          )
        }
        confirmLabel={isDeleting ? "Excluindo..." : "Excluir"} // 🆕 muda o texto
        cancelLabel="Cancelar"
        onCancel={() => {
          setConfirmOpen(false);
          setSelected(null);
        }}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
}
