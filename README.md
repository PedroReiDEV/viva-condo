# Viva Condo — Lista de Condomínios (Dropdown + Dialog + Toast + API DELETE)

Este documento explica:

- A **arquitetura de pastas** e responsabilidades;
- Os **componentes UI** (`Dropdown`, `ConfirmDialog`, `ToastProvider`);
- O **service** (`getCondominios`, `deleteCondominio`);
- A **rota API** (`GET` e `DELETE` em `/api/condominios`);
- A **página** (`app/condominios/page.tsx`) e o **fluxo completo de exclusão com refresh**;
- **Políticas RLS** no Supabase e dicas de diagnóstico;
- Trechos de código **numerados** 🔎 para mapear exatamente o que acontece.

> **Pré-requisitos**
> - Next.js 14+
> - Supabase configurado (variáveis `.env` corretas)
> - Tailwind CSS configurado
> - Tabela `condominio` com PK `id_condominio` (numérica)

---

## 1) Arquitetura de pastas

```
src/
├─ app/
│  ├─ layout.tsx                     # Layout global (ToastProvider + Menu)
│  ├─ condominios/
│  │  └─ page.tsx                    # Página com tabela, Dropdown e ConfirmDialog
│  └─ api/
│     └─ condominios/
│        └─ route.ts                 # GET (lista) e DELETE (exclusão)
│
├─ components/
│  ├─ dropdown.tsx                   # Botão de 3 pontinhos: Editar / Excluir
│  ├─ confirmDialog.tsx              # Modal de confirmação (com estado "Excluindo...")
│  └─ toastNotification.tsx          # Toast verde/vermelho com animação
│
└─ services/
   └─ condominio.service.ts          # getCondominios() e deleteCondominio()
```

---

(Conteúdo completo conforme resposta anterior)
