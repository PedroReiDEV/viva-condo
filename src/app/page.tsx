"use client";

export default function Home() {

  const element = <span>Olá mundo, tudo bem?</span>;
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold">{element}</h1>
    </div>
  );
}