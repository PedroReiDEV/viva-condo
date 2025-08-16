"use client";

export default function Home() {

type Morador = {
  primeiroNome: string;
  sobrenome: string;
}

  function formatarNomeMorador(morador:Morador) {
    return morador.primeiroNome + ' ' + morador.sobrenome
  }
  const morador = {
    primeiroNome: 'I am',
    sobrenome: 'BATMAN'
  };

  function obterSaudacao(morador:null | Morador) {
    if (morador) {
      return <span>Olá, {formatarNomeMorador(morador)}!</span>
    }
    return <span>Olá, Estranho!!!</span>
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen">
    <h1 className="text-2x1 font-semibold">{obterSaudacao(null)}</h1>
    </div>
  )
}