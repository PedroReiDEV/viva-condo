import { createClient } from "@/utils/supabase/client";

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

export async function getCondominios() {
    
    const supabase = await createClient();
    const { data, error } = await supabase.from("condominio").select("*").order("id_condominio");

    if(error) throw new Error(error.message);
    return data ?? [];
}