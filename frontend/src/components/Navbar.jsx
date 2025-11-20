import { Link } from "react-router-dom";

export default function Navbar({ userName = "Usuário" }) {
  return (
    <header className="w-full bg-slate-900/80 backdrop-blur-sm border-b border-slate-800 px-6 py-3 flex items-center justify-between">
      
      {/* Logo */}
      <div className="flex items-center gap-2">
        <div className="h-8 w-8 flex items-center justify-center rounded-lg bg-blue-500/20 border border-blue-400/40">
          <span className="text-blue-400 font-bold text-xl">ₑ</span>
        </div>
        <h1 className="text-slate-100 font-semibold text-lg">
          Expense Tracker
        </h1>
      </div>

      {/* Navegação */}
      <nav className="hidden md:flex items-center gap-6">
        <Link className="text-slate-300 hover:text-blue-400 transition" to="/dashboard">
          Dashboard
        </Link>
        <Link className="text-slate-300 hover:text-blue-400 transition" to="/expenses">
          Gastos
        </Link>
        <Link className="text-slate-300 hover:text-blue-400 transition" to="/categories">
          Categorias
        </Link>
      </nav>

      {/* Usuário */}
      <div className="flex items-center gap-3">
        <span className="text-slate-300 text-sm">Olá, <strong className="text-blue-400">{userName}</strong></span>

        <div className="h-9 w-9 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-blue-400 font-semibold">
          {userName.charAt(0).toUpperCase()}
        </div>
      </div>
    </header>
  );
}