import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";


export async function middleware(req: NextRequest) {
  console.log("🔥 Middleware executado em:", req.nextUrl.pathname);

  let res = NextResponse.next();

  // cria o client do Supabase no middleware
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: () => {
          console.log("📍 Cookies lidos:", req.cookies.getAll());
          return req.cookies.getAll();
        },
        setAll: (cookiesToSet) => {
          console.log("📍 Cookies a serem setados:", cookiesToSet);
          // atualiza cookies no request
          cookiesToSet.forEach(({ name, value }) => req.cookies.set(name, value));
          // recria resposta com novos cookies
          res = NextResponse.next();
          cookiesToSet.forEach(({ name, value, options }) =>
            res.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  console.log("🔎 Checando usuário autenticado...");
  const { data: { user } } = await supabase.auth.getUser();

  console.log("🔵 Usuário no middleware:", user);
  console.log("🔵 Path acessado:", req.nextUrl.pathname);

  // se não logado, redireciona para /
  if (!user) {
    console.log("🚫 Usuário não autenticado, redirecionando...");
    const url = new URL("/", req.url);
    url.searchParams.set("from", req.nextUrl.pathname);
    return NextResponse.redirect(url);
  }

  console.log("✅ Usuário autenticado, acesso liberado!");
  return res;
}

// rotas protegidas
export const config = {
  matcher: [
    "/dashboard/:path*",
    "/condominios/:path*",
    "/usuarios/:path*",
    "/moradores/:path*",
    "/configuracoes/:path*"
  ],
};

// documentação: https://supabase.com/docs/guides/auth/server-side/creating-a-client?queryGroups=environment&environment=middleware