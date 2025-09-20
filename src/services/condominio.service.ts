import { createClient } from "@/utils/supabase/server";

export interface ICondominio {
    id_condominio: Number;
    idadministradora: Number;
    nome_condominio: String;
    endereco_condominio: String;
    cidade_condominio: String;
    uf_condominio: String;
    tipo_condominio: String;
    created_at: String;
}

export async function getCondominios() {
    
    const supabase = await createClient();
    const { data, error } = await supabase.from("condominio").select("*").order("id_condominio");

    if(error) throw new Error(error.message);
    return data ?? [];
}