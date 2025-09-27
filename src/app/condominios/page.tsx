"use client";

import { useEffect, useState } from "react";

import { getCondominio, ICondominio } from "@/services/api-condominios";
import { error } from "console";
export default function ListaCondominios() { 
    const [condominio, setCondominios] = useState<ICondominio[]>([])
const [loading, setLoading] = useState(true)
const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const buscarCondominios = async () => {
            try{
                const data = await getCondominio()
                if((data as any)?.error){
                    setError((data as any).error)
                    return
                }
                setCondominios(data);
            } catch(err:any){
                setError(err.message || String(err))
            }finally{
                setLoading(false);
            }
        }

        buscarCondominios()
    }, [])

    return (
        <div id="p-6 max-w-full">
            <div className="mb-4 flex items-center justify-between gap-4">
                <h1 className="text-x1 font-semibold">Condominios</h1>
            </div>

            <div className="bg-white rounded-md border border-gray-200 overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-4 pt-3 whitespace-nowrap text-sm text-gray-500 w-12">#</th>
                            <th className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">Nome</th>
                            <th className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">Endereço</th>
                            <th className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">Cidade</th>
                            <th className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">UF</th>
                            <th className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">Tipo</th>
                            <th className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">Ação</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                        {loading ? (
                            <tr>
                                <td className="px-a py-3 text-center text-gray-500" colSpan={7}>Carregando Condomínios...</td>
                            </tr>
                        ):error?(
                            <tr>
                                <td className="px-4 py-3 text-center text-red-500" colSpan={7}>Erro:{error}</td>
                            </tr>
                        ) : condominio.length === 0 ? (
                            <tr>
                            <td className="px-4 py-3 text-em text-gray-700" colSpan={7}>Nenhum condominio encontrado.</td>
                            </tr>
                    ) : (      
                        condominio.map((condominio, index) => (
                            <tr key={condominio.id_condominio} className="hover:bg-gray-50">
                            <td className="px-4 pt-3 whitespace-nowrap text-sm text-gray-500">{String(index + 1)}</td>
                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{condominio.nome_condominio}</td>
                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{condominio.endereco_condominio}</td>
                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{condominio.cidade_condominio}</td>
                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{condominio.uf_condominio}</td>
                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{condominio.tipo_condominio}</td>
                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500"></td>
                        </tr>
                        )) 
                    )}          
                    </tbody>
                </table>
            </div>
        </div>
    );
}