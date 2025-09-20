import { NextResponse } from "next/server";
import { getCondominio } from "@/services/api-condominios";
import { error } from "console";


export async function GET() {
    try {
        const data = await getCondominio();

        return NextResponse.json({
            sucess: true,
            count: data.length,
            data,
        }, { status: 200 });
    } catch (e: any) {
        return NextResponse.json({
            sucess: false,
            error: e.message ?? "Erro inesperado",
        }, { status: 400});
    }
}