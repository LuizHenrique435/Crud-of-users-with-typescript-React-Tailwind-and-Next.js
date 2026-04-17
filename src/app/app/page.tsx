import { readAppData } from "@/lib/database/store";

export default async function AppPage() {
  const data = await readAppData();

  return (
    <main className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold text-slate-900">Dashboard</h1>
        <p className="mt-2 text-slate-600">Visão inicial do módulo reconstruído.</p>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm text-slate-500">Usuários</p>
          <p className="mt-3 text-4xl font-semibold text-slate-900">{data.users.length}</p>
        </section>
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm text-slate-500">Perfis</p>
          <p className="mt-3 text-4xl font-semibold text-slate-900">{data.profiles.length}</p>
        </section>
      </div>
    </main>
  );
}
