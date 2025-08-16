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
    primeiroNome: 'Sandro',
    sobrenome: 'pereira'
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
    <h1 className="text-4x1 font-bold">{formatarNomeMorador(morador)}</h1>
    </div>
  )
}