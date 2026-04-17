"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import { clientAPI } from "@/service/client";

export default function SignUpPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    try {
      await clientAPI.post("/users", form);
      toast.success("Conta criada com sucesso!");
      router.push("/auth/sign-in");
    } catch {
      toast.error("Erro ao criar conta.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center px-6">
      <form
        onSubmit={submit}
        className="w-full max-w-md rounded-2xl border bg-white p-8 shadow-sm"
      >
        <h1 className="text-2xl font-semibold">Criar conta</h1>

        <div className="mt-6 space-y-3">
          <Input
            placeholder="Nome"
            onChange={(e) => setForm({ ...form, firstName: e.target.value })}
          />
          <Input
            placeholder="Sobrenome"
            onChange={(e) => setForm({ ...form, lastName: e.target.value })}
          />
          <Input
            placeholder="Usuário"
            onChange={(e) => setForm({ ...form, username: e.target.value })}
          />
          <Input
            placeholder="Email"
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          <Input
            type="password"
            placeholder="Senha"
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
        </div>

        <Button className="mt-6 w-full" disabled={loading}>
          {loading ? "Criando..." : "Criar conta"}
        </Button>
      </form>
    </main>
  );
}
