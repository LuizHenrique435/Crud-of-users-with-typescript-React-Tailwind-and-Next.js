import { readAppData, withProfile } from "@/lib/database/store";

export default async function UsersPage() {
  const data = await readAppData();
  const users = data.users.map((user) => withProfile(user, data.profiles));

  return (
    <main className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold text-slate-900">Usuários</h1>
        <p className="mt-2 text-slate-600">Estrutura inicial do gerenciamento de usuários.</p>
      </div>
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <table className="min-w-full divide-y divide-slate-200 text-sm">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-4 py-3 text-left font-medium text-slate-500">Nome</th>
              <th className="px-4 py-3 text-left font-medium text-slate-500">Usuário</th>
              <th className="px-4 py-3 text-left font-medium text-slate-500">E-mail</th>
              <th className="px-4 py-3 text-left font-medium text-slate-500">Perfil</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 bg-white">
            {users.map((user) => (
              <tr key={user.id}>
                <td className="px-4 py-3">{user.firstName} {user.lastName}</td>
                <td className="px-4 py-3">{user.username ?? "-"}</td>
                <td className="px-4 py-3">{user.email ?? "-"}</td>
                <td className="px-4 py-3">{user.profile?.name ?? "-"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
