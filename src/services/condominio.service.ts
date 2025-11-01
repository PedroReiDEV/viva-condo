// src/services/condominio.service.ts
import { createClient } from "@/utils/supabase/client";

/**
 * Modelo da tabela 'condominio'
 */
export interface ICondominio {
  id_condominio: number;
  idadministradora: number;
  nome_condominio: string;
  endereco_condominio: string;
  cidade_condominio: string;
  uf_condominio: string;
  tipo_condominio: string;
  created_at: string;
}

/**
 * Busca todos os condomínios (tabela 'condominio')
 * ordenados pelo ID crescente
 */
export async function getCondominios() {
  // 🔧 createClient() NÃO precisa de await
  const supabase = createClient();

  const { data, error } = await supabase
    .from("condominio") // ⚠️ garantir nome singular
    .select("*")
    .order("id_condominio", { ascending: true });

  if (error) throw new Error(error.message);
  return data ?? [];
}

/**
 * Exclui um condomínio via API interna
 * DELETE /api/condominios
 * 
 * A página apenas exibe o toast (sem refletir na UI).
 */
export async function deleteCondominio(id: number | string) {
  const res = await fetch("/api/condominios", {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id }),
  });

  // 🔧 sempre tenta ler o JSON
  const data = await res.json().catch(() => ({}));

  if (!res.ok || !data?.success) {
    const msg = data?.error || `Erro ${res.status} ao excluir condomínio.`;
    throw new Error(msg);
  }

  // 🔧 tipagem coerente com o retorno da rota
  return data as {
    success: true;
    id: number | string;
    message: string;
  };
}
