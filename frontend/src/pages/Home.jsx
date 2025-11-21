import Navbar from "../components/Navbar";

export default function Home() {

    const isLoggedIn = true; // por enquanto sempre true
    
    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-linear-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center px-6">
                <div className="max-w-3xl text-center">

                    {/* Título */}
                    <h1 className="text-4xl md:text-5xl font-extrabold text-white drop-shadow-lg">
                        Controle seus gastos e construa metas com facilidade.
                    </h1>

                    <p className="mt-4 text-lg text-slate-400">
                        Um painel simples e moderno para acompanhar seus gastos
                        e evolução financeira.
                    </p>

                    {/* Botões */}
                    <div className="mt-8 flex flex-col md:flex-row items-center justify-center gap-4">
                        <a
                            href="/dashboards"
                            className="px-6 py-3 rounded-lg text-white font-medium bg-blue-600 hover:bg-blue-500 transition shadow-lg shadow-blue-900/40"
                        >
                            Ir para Dashboard
                        </a>

                        <a
                            href="/expenses/budget-form"
                            className="px-6 py-3 rounded-lg text-blue-300 font-medium border border-blue-600 hover:border-blue-400 hover:text-blue-200 transition"
                        >
                            {isLoggedIn ? "Gerenciar Gastos" : "Começar Agora"}
                        </a>
                    </div>

                    {/* Cards de preview */}
                    <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-6">

                        <div className="bg-slate-900/60 border border-slate-700 rounded-xl p-6 shadow-xl backdrop-blur-sm">
                            <h3 className="text-lg font-semibold text-blue-400">Relatórios</h3>
                            <p className="text-slate-400 text-sm mt-1">
                                Veja gráficos detalhados dos seus gastos mensais.
                            </p>
                        </div>

                        <div className="bg-slate-900/60 border border-slate-700 rounded-xl p-6 shadow-xl backdrop-blur-sm">
                            <h3 className="text-lg font-semibold text-blue-400">Categorias</h3>
                            <p className="text-slate-400 text-sm mt-1">
                                Organize seus gastos por categoria e prioridade.
                            </p>
                        </div>

                    </div>

                </div>
            </div>
        </>
    );
};