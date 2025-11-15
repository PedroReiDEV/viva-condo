import { createClient } from "@/utils/supabase/client";

export interface ICondominio {
  id_condominio: number;
  id_administradora: number;
  nome_condominio: string;
  endereco_condominio: string;
  cidade_condominio: string;
  uf_condominio: string;
  tipo_condominio: string;
  created_at: string;
}

export async function getCondominios() {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("condominio")
    .select("*")
    .order("id_condominio", { ascending: true });

  if (error) throw new Error(error.message);
  return data ?? [];
}

export async function createCondominio(payload: {
  nome_condominio: string;
  endereco_condominio: string;
  cidade_condominio: string;
  uf_condominio: string;
  tipo_condominio: string;
}) {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("condominio")
    .insert([
      {
        id_administradora: 1,
        ...payload,
      },
    ])
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data as ICondominio;
}


export async function updateCondominio(
  id: number | string,
  updates: Partial<
    Pick<
      ICondominio,
      | "nome_condominio"
      | "endereco_condominio"
      | "cidade_condominio"
      | "uf_condominio"
      | "tipo_condominio"
    >
  >
) {
  const res = await fetch("/api/condominios", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id, updates }),
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok || !data?.success) {
    throw new Error(data?.error || "Erro ao atualizar condomínio.");
  }

  return data;
}

export async function deleteCondominio(id: number | string) {
  const res = await fetch("/api/condominios", {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id }),
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok || !data?.success) {
    throw new Error(data?.error || `Erro ao excluir condomínio.`);
  }

  return data;
}
