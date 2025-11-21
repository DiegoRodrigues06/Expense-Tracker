import { Link } from "react-router-dom";

export default function Navbar({ userName = "Usuário" }) {
  return (
    <header className="w-full bg-slate-900/80 backdrop-blur-sm border-b border-slate-800 px-6 py-3 flex items-center justify-between">
      
      {/* Logo */}
      <div className="flex items-center gap-2">
        <h1 className="text-slate-100 font-semibold text-lg">
          Expense Tracker
        </h1>
      </div>

      {/* Navegação */}
      <nav className="hidden md:flex items-center gap-6">
        <Link className="text-slate-300 hover:text-blue-400 transition" to="/dashboards">
          Dashboard
        </Link>
        <Link className="text-slate-300 hover:text-blue-400 transition" to="/expenses">
          Gastos
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