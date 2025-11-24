import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../service/apiConnection.js";

export default function RegisterPage() {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Atualiza estado do form
  function handleChange(e) {
    setForm({ ...form, [e.target.id]: e.target.value });
  }

  // Função de envio
  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (form.password !== form.confirmPassword) {
      return setError("As senhas não coincidem.");
    }

    try {
      setLoading(true);

      const response = await api.post("/api/users", {
        name: form.name,
        email: form.email,
        senha: form.password
      });

      console.log("Usuário criado:", response.data);

      navigate("/"); // redirecionar para login

    } catch (err) {
      if (err.response?.status === 409) {
        setError("Este e-mail já está em uso.");
      } else {
        setError("Erro ao registrar. Tente novamente.");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-slate-900/70 border border-slate-700/70 rounded-2xl shadow-2xl backdrop-blur-sm p-8">
        
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-semibold text-slate-50">Criar Conta</h1>
          <p className="mt-1 text-sm text-slate-400">
            Registre-se para começar a acompanhar seus gastos.
          </p>
        </div>

        {error && (
          <div className="mb-4 text-red-400 text-sm text-center">
            {error}
          </div>
        )}

        <form className="space-y-5" onSubmit={handleSubmit}>
          
          <div className="space-y-1">
            <label htmlFor="name" className="block text-sm font-medium text-slate-200">
              Nome
            </label>
            <input
              id="name"
              type="text"
              placeholder="Seu nome"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-slate-700 bg-slate-900/70 px-3 py-2 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div className="space-y-1">
            <label htmlFor="email" className="block text-sm font-medium text-slate-200">
              E-mail
            </label>
            <input
              id="email"
              type="email"
              placeholder="seuemail@exemplo.com"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-slate-700 bg-slate-900/70 px-3 py-2 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div className="space-y-1">
            <label htmlFor="password" className="block text-sm font-medium text-slate-200">
              Senha
            </label>
            <input
              id="password"
              type="password"
              placeholder="••••••••"
              value={form.password}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-slate-700 bg-slate-900/70 px-3 py-2 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div className="space-y-1">
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-slate-200">
              Confirmar senha
            </label>
            <input
              id="confirmPassword"
              type="password"
              placeholder="••••••••"
              value={form.confirmPassword}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-slate-700 bg-slate-900/70 px-3 py-2 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="mt-2 w-full rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white shadow-lg shadow-blue-900/40 transition hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-slate-900"
          >
            {loading ? "Registrando..." : "Registrar"}
          </button>
        </form>

        <p className="mt-6 text-center text-xs text-slate-500">
          Já tem uma conta?{" "}
          <Link
            to="/"
            className="font-medium text-blue-400 hover:text-blue-300"
          >
            Entrar
          </Link>
        </p>
      </div>
    </div>
  );
}
