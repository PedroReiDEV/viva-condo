import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function GET() {
  try {
    const supabase = createClient();

    const { data, error } = await supabase
      .from("condominio")
      .select("*")
      .order("id_condominio", { ascending: true });

    if (error)
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });

    return NextResponse.json(
      { success: true, count: data?.length ?? 0, data: data ?? [] },
      { status: 200 }
    );
  } catch (e: any) {
    return NextResponse.json(
      { success: false, error: e?.message ?? "Erro inesperado" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  try {
    const supabase = createClient();
    const body = await req.json().catch(() => ({}));
    const { id } = body ?? {};

    if (id === undefined || id === null || id === "")
      return NextResponse.json(
        { success: false, error: "Campo 'id' é obrigatório." },
        { status: 400 }
      );

    const idValue = Number(id);
    if (!Number.isFinite(idValue))
      return NextResponse.json(
        { success: false, error: "ID inválido." },
        { status: 400 }
      );

    const { data, error } = await supabase
      .from("condominio")
      .delete()
      .eq("id_condominio", idValue)
      .select("id_condominio");

    if (error)
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });

    if (!data || data.length === 0)
      return NextResponse.json(
        { success: false, error: "Condomínio não encontrado." },
        { status: 404 }
      );

    return NextResponse.json(
      { success: true, id: idValue, message: "Condomínio excluído com sucesso." },
      { status: 200 }
    );
  } catch (e: any) {
    return NextResponse.json(
      { success: false, error: e?.message ?? "Erro interno ao excluir." },
      { status: 500 }
    );
  }
}

export async function PUT(req: Request) {
  try {
    const { id, updates } = await req.json().catch(() => ({}));

    if (id === undefined || id === null || id === "")
      return NextResponse.json(
        { success: false, error: "Campo 'id' é obrigatório." },
        { status: 400 }
      );

    if (!updates || typeof updates !== "object")
      return NextResponse.json(
        { success: false, error: "Campo 'updates' inválido." },
        { status: 400 }
      );

    const allowed = [
      "nome_condominio",
      "endereco_condominio",
      "cidade_condominio",
      "uf_condominio",
      "tipo_condominio",
    ] as const;

    const safeUpdates: Record<string, any> = {};
    for (const k of allowed) if (k in updates) safeUpdates[k] = updates[k];

    if (Object.keys(safeUpdates).length === 0)
      return NextResponse.json(
        { success: false, error: "Nenhum campo permitido para atualizar." },
        { status: 400 }
      );

    const idValue = Number(id);
    if (!Number.isFinite(idValue))
      return NextResponse.json(
        { success: false, error: "ID inválido." },
        { status: 400 }
      );

    const supabase = createClient();

    const { data, error } = await supabase
      .from("condominio")
      .update(safeUpdates)
      .eq("id_condominio", idValue)
      .select("id_condominio");

    if (error)
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });

    if (!data || data.length === 0)
      return NextResponse.json(
        { success: false, error: "Condomínio não encontrado." },
        { status: 404 }
      );

    return NextResponse.json(
      { success: true, id: idValue, message: "Condomínio atualizado com sucesso." },
      { status: 200 }
    );
  } catch (e: any) {
    return NextResponse.json(
      { success: false, error: e?.message ?? "Erro interno ao atualizar." },
      { status: 500 }
    );
  }
}
