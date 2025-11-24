import Navbar from "../components/Navbar";
import { useState } from "react";

export default function Dashboards() {

    // Placeholders até conectar API
    const [orcamento] = useState(4000);
    const [gastos] = useState(1320);
    const [sobrou] = useState(2680);
    const [progressoMeta] = useState(45);

    // {setOrcamento setGastos setSobrou setProgressoMeta}

    const hasData = true; // função improvisada para testar a tela sem dados
    if (!hasData) {
        return (
        <div className="min-h-screen flex items-center justify-center">
            <h1 className="text-3xl font-bold text-white">
            Você não tem nenhum resultado disponível.
            </h1>
        </div>
        );
    }

    return (
    <>
        <Navbar/>
        <div className="min-h-screen bg-linear-to-br from-slate-950 via-slate-900 to-slate-950 text-white">
            

            <div className="p-8 max-w-6xl mx-auto space-y-10">

                {/* TÍTULO */}
                <h1 className="text-3xl font-bold text-blue-400 mb-4">
                    Dashboard Financeiro
                </h1>

                {/* CARDS RESUMO */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                    {/* ORÇAMENTO */}
                    <div className="bg-slate-900/60 border border-slate-800 p-6 rounded-xl shadow-lg">
                        <p className="text-slate-400">Orçamento Mensal</p>
                        <h2 className="text-3xl font-bold text-blue-400 mt-2">
                            R$ {orcamento.toLocaleString()}
                        </h2>
                    </div>

                    {/* DESPESAS */}
                    <div className="bg-slate-900/60 border border-slate-800 p-6 rounded-xl shadow-lg">
                        <p className="text-slate-400">Total de Gastos</p>
                        <h2 className="text-3xl font-bold text-red-400 mt-2">
                            R$ {gastos.toLocaleString()}
                        </h2>
                    </div>

                    {/* SOBROU */}
                    <div className="bg-slate-900/60 border border-slate-800 p-6 rounded-xl shadow-lg">
                        <p className="text-slate-400">Sobrando</p>
                        <h2 className="text-3xl font-bold text-green-400 mt-2">
                            R$ {sobrou.toLocaleString()}
                        </h2>
                    </div>

                </div>

                {/* PROGRESSO DAS METAS */}
                <div className="bg-slate-900/60 border border-slate-800 p-6 rounded-xl shadow-lg">
                    <p className="text-slate-400 mb-2">Progresso das Metas</p>

                    <div className="w-full bg-slate-800 h-4 rounded-lg overflow-hidden">
                        <div
                            className="bg-blue-500 h-full"
                            style={{ width: `${progressoMeta}%` }}
                        />
                    </div>

                    <p className="text-slate-300 mt-2">{progressoMeta}% concluído</p>
                </div>

                {/* GRÁFICOS (placeholders até integrar chart.js) */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                    <div className="bg-slate-900/60 border border-slate-800 p-6 rounded-xl shadow-lg h-80">
                        <p className="text-slate-300 mb-4">Gastos por Categoria</p>
                        <div className="flex items-center justify-center h-full text-slate-600">
                            (Gráfico de Pizza aqui)
                        </div>
                    </div>

                    <div className="bg-slate-900/60 border border-slate-800 p-6 rounded-xl shadow-lg h-80">
                        <p className="text-slate-300 mb-4">Gastos nos últimos 7 dias</p>
                        <div className="flex items-center justify-center h-full text-slate-600">
                            (Gráfico de Barras aqui)
                        </div>
                    </div>

                </div>

                {/* ÚLTIMAS DESPESAS */}
                <div className="bg-slate-900/60 border border-slate-800 p-6 rounded-xl shadow-lg">
                    <h2 className="text-xl font-semibold text-blue-400">
                        Últimas despesas
                    </h2>

                    <div className="mt-4 space-y-4">

                        {[
                            { nome: "Supermercado", valor: 230, data: "02/03" },
                            { nome: "Combustível", valor: 150, data: "01/03" },
                            { nome: "Netflix", valor: 55, data: "28/02" },
                        ].map((d, i) => (
                            <div
                                key={i}
                                className="flex items-center justify-between bg-slate-800/50 px-4 py-3 rounded-lg border border-slate-700"
                            >
                                <div>
                                    <p className="font-medium">{d.nome}</p>
                                    <span className="text-slate-400 text-sm">{d.data}</span>
                                </div>

                                <p className="font-bold text-red-400">- R$ {d.valor}</p>
                            </div>
                        ))}

                    </div>

                    <button className="mt-4 text-blue-400 hover:text-blue-300 transition">
                        Ver todas despesas →
                    </button>
                </div>

            </div>
        </div>
    </>
    );
}