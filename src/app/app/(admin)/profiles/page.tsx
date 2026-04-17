import { readAppData } from "@/lib/database/store";

export default async function ProfilesPage() {
  const data = await readAppData();

  return (
    <main className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold text-slate-900">Perfis</h1>
        <p className="mt-2 text-slate-600">Perfis disponíveis para associação de usuários.</p>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {data.profiles.map((profile) => (
          <section key={profile.id} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-slate-900">{profile.name}</h2>
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">{data.users.filter((user) => user.profileId === profile.id).length} usuário(s)</span>
            </div>
            <p className="mt-3 text-sm text-slate-600">{profile.description ?? "Sem descrição."}</p>
          </section>
        ))}
      </div>
    </main>
  );
}
