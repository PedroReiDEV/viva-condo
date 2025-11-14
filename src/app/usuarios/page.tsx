"use client";

export default function ListaUsuarios() {
    return (
        <div id="p-6 max-w-full">
            <div className="mb-4 flex items-center justify-between gap-4">
                <h1 className="text-x1 font-semibold">Usuarios</h1>
            </div>

            <div className="bg-white rounded-md border border-gray-200 overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-4 pt-3 text-left text-xs font-medium text-gray-500 tracking-wider w-12">#</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 tracking-wider">Nome</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 tracking-wider">Email</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 tracking-wider">Contato</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 tracking-wider">Tipo</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 tracking-wider">Status</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 tracking-wider">Ação</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                        <tr>
                            <td className="px-4 py-3 text-em text-gray-700" colSpan={7}>
                                Nenhum usuário encontrado.
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}