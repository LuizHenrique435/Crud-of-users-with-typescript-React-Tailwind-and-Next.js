import Link from "next/link";

export default function HomePage() {
  return (
    <main className="flex min-h-screen items-center justify-center px-6">
      <div className="w-full max-w-xl rounded-2xl border border-slate-200 bg-white p-10 shadow-sm">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-blue-700">User Manager</p>
        <h1 className="mt-4 text-4xl font-semibold text-slate-900">Reconstrução fiel, mais limpa e organizada.</h1>
        <p className="mt-4 text-base leading-7 text-slate-600">
          Base inicial do projeto anterior com foco em usuários, perfis e autoatendimento do usuário autenticado.
        </p>
        <div className="mt-8 flex gap-3">
          <Link href="/auth/sign-in" className="rounded-md bg-blue-700 px-4 py-2 text-sm font-medium text-white">Entrar</Link>
          <Link href="/app" className="rounded-md border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700">Abrir painel</Link>
        </div>
      </div>
    </main>
  );
}
