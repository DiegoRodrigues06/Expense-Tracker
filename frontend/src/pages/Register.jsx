import { Link } from "react-router-dom";

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-linear-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-slate-900/70 border border-slate-700/70 rounded-2xl shadow-2xl backdrop-blur-sm p-8">
        
        {/* Logo / título */}
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-semibold text-slate-50">
            Criar Conta
          </h1>
          <p className="mt-1 text-sm text-slate-400">
            Registre-se para começar a acompanhar seus gastos.
          </p>
        </div>

        {/* Formulário */}
        <form className="space-y-5">
          
          <div className="space-y-1">
            <label htmlFor="name" className="block text-sm font-medium text-slate-200">
              Nome
            </label>
            <input
              id="name"
              type="text"
              placeholder="Seu nome"
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
              className="w-full rounded-lg border border-slate-700 bg-slate-900/70 px-3 py-2 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <button
            type="submit"
            className="mt-2 w-full rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white shadow-lg shadow-blue-900/40 transition hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-slate-900"
          >
            Registrar
          </button>
        </form>

        {/* Rodapé */}
        <p className="mt-6 text-center text-xs text-slate-500">
          Já tem uma conta?{" "}
          <Link to="/"
            className="font-medium text-blue-400 hover:text-blue-300"
          >
            Entrar
          </Link>
        </p>
      </div>
    </div>
  );
}
