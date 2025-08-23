"use client";

export default function Home() {
  type Morador = {
    primeiroNome: string;
    sobrenome: string;
  };

  function formatarNomeMorador(morador: Morador) {
    return morador.primeiroNome + " " + morador.sobrenome;
  }

  const morador: Morador = {
    primeiroNome: "Pedro",
    sobrenome: "Silva",
  };

  function obterSaudacao(morador: null | Morador) {
    if (morador) {
      return <span>Olá, {formatarNomeMorador(morador)}!</span>;
    }
    return <span>Olá, Estranho!!!</span>;
  }

  return (
    <div id="principal" className="min-h-screen flex items-center justify-center bg-black">
      <div id="componente-azul" className="card-azul"> {/* card-azul*/}
        <h1 id="name" className="text-2x1 font-bold text-center">
          {obterSaudacao(morador)}
        </h1>
      </div>
    </div>
  );
}
