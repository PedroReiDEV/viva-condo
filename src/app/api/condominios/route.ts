// src/app/api/condominios/route.ts
import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server"; // server-side

/** GET /api/condominios */
export async function GET() {
  try {
    const supabase = createClient();

    // 🔧 Tabela correta (singular) e ordenação pela PK
    const { data, error } = await supabase
      .from("condominio") // 🔧
      .select("*")
      .order("id_condominio", { ascending: true }); // 🔧

    if (error) {
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 500 }
      );
    }

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

/**
 * DELETE /api/condominios
 * Body: { id: number | string }
 */
export async function DELETE(req: Request) {
  try {
    const supabase = createClient();

    const body = await req.json().catch(() => ({}));
    const { id } = body ?? {};

    if (id === undefined || id === null || id === "") {
      return NextResponse.json(
        { success: false, error: "Campo 'id' é obrigatório." },
        { status: 400 }
      );
    }

    // Se seu ID é numérico na base, garanta conversão:
    const parsedId = Number(id);
    const idValue = Number.isFinite(parsedId) ? parsedId : id;

    // 🔧 Tabela/PK corretas
    const { error, count } = await supabase
      .from("condominio") // 🔧
      .delete({ count: "exact" })
      .eq("id_condominio", idValue); // 🔧

    if (error) {
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 500 }
      );
    }

    if (!count) {
      return NextResponse.json(
        { success: false, error: "Condomínio não encontrado." },
        { status: 404 }
      );
    }

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
