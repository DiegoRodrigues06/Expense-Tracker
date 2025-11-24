import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../service/apiConnection.js";

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/api/users/login", {
        email: email,
        senha: senha,
      });

      // salva o user no localStorage depois do login
      localStorage.setItem("user", JSON.stringify(res.data));

      setTimeout(() => {
            navigate("/home");
        }, 1000);

    } catch (err) {
      alert("Email ou senha incorretos.");
      console.error(err);
    }
  };

  return (
    <>
      <div className="min-h-screen bg-linear-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center px-4">
        <div className="w-full max-w-md bg-slate-900/70 border border-slate-700/70 rounded-2xl shadow-2xl backdrop-blur-sm p-8">
          
          {/* Logo / título */}
          <div className="mb-8 text-center">
            <h1 className="text-2xl font-semibold text-slate-50">
              Expense Tracker
            </h1>
            <p className="mt-1 text-sm text-slate-400">
              Entre para visualizar e gerenciar seus gastos.
            </p>
          </div>

          {/* Formulário */}
          <form className="space-y-5" onSubmit={handleLogin}>
            <div className="space-y-1">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-slate-200"
              >
                E-mail
              </label>
              <input
                id="email"
                type="email"
                placeholder="seuemail@exemplo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-lg border border-slate-700 bg-slate-900/70 px-3 py-2 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-slate-200"
                >
                  Senha
                </label>
                <button
                  type="button"
                  className="text-xs text-blue-400 hover:text-blue-300"
                >
                  Esqueceu a senha?
                </button>
              </div>
              <input
                id="password"
                type="password"
                placeholder="••••••••"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                className="w-full rounded-lg border border-slate-700 bg-slate-900/70 px-3 py-2 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div className="flex items-center justify-between text-xs text-slate-400 mb-3">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-slate-600 bg-slate-900 text-blue-500 focus:ring-blue-500"
                />
                <span>Lembrar de mim</span>
              </label>
            </div>

            <button
              type="submit"
              className="mt-2 w-full rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white shadow-lg shadow-blue-900/40 transition hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-slate-900"
            >
              Entrar
            </button>
          </form>

          {/* Rodapé */}
          <p className="mt-6 text-center text-xs text-slate-500 place-content-center">
            Novo aqui?{" "}
            <Link
              to="/register"
              className="font-medium text-blue-400 hover:text-blue-300"
            >
              Criar conta
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
