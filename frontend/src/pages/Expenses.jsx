import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../components/styles/numberFix.css";
import Navbar from "../components/Navbar";


export default function Expenses() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-black/10">
            <h1 className="text-3xl font-bold">Você não tem nenhum resultado disponível.</h1>
        </div>
    );
}

// --- Formulário Inicial ---

export function BudgetForm() {
  
  const navigate = useNavigate();
  const [orcamentoBruto, setOrcamentoBruto] = useState("");
  const [despesas, setDespesas] = useState([
    { valor: "", descricao: "" }
  ]);
  const [objetivos, setObjetivos] = useState([]);

  // --- Funções 

  function addDespesa() {
    setDespesas([...despesas, { valor: "", descricao: "" }]);
  }

  function updateDespesa(index, field, value) {
    const clone = [...despesas];
    clone[index][field] = value;
    setDespesas(clone);
  }

  function addObjetivo() {
    setObjetivos([...objetivos, { valor: "", descricao: "" }]);
  }

  function updateObjetivo(index, field, value) {
    const clone = [...objetivos];
    clone[index][field] = value;
    setObjetivos(clone);
  }

  function handleSubmit(e) {
    try {
        e.preventDefault();
        console.log({
            orcamentoBruto,
            despesas,
            objetivos
        });
        alert("Formulário enviado!");

        setTimeout(() => {
            navigate("/expenses");
        }, 1000);

    } catch {
        console.error("Erro ao enviar formulário.");
        alert("Erro ao enviar formulário. Tente novamente.");
    }
    
  }

  return (
    <>
    <Navbar />
    <div className="min-h-screen bg-linear-to-br from-slate-950 via-slate-900 to-slate-950 p-10 text-white">
      <form
        onSubmit={handleSubmit}
        className="max-w-3xl mx-auto bg-slate-900/70 p-8 rounded-2xl border border-slate-800 shadow-xl space-y-8"
      >

        <h1 className="text-2xl font-semibold text-blue-400 mb-4">
          Planejamento Financeiro
        </h1>

        {/* ORÇAMENTO BRUTO */}
        <div>
          <label className="block mb-2 text-slate-300">Orçamento bruto (mensal)</label>
          <input
            type="number"
            value={orcamentoBruto}
            onChange={(e) => setOrcamentoBruto(e.target.value)}
            placeholder="Ex: 4000"
            className="w-full p-3 rounded-md bg-slate-800 border border-slate-700 focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* DESPESAS */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-blue-400">Despesas Obrigatórias</h2>

          {despesas.map((d, i) => (
            <div
              key={i}
              className="bg-slate-900/50 p-5 rounded-lg border border-slate-700 space-y-4"
            >
              <div>
                <label className="block text-slate-300 mb-1">Valor</label>
                <input
                  type="number"
                  value={d.valor}
                  onChange={(e) => updateDespesa(i, "valor", e.target.value)}
                  placeholder="Ex: 120"
                  className="w-full p-3 rounded-md bg-slate-800 border border-slate-700 focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 mb-1">Descrição</label>
                <input
                  type="text"
                  value={d.descricao}
                  onChange={(e) => updateDespesa(i, "descricao", e.target.value)}
                  placeholder="Ex: Conta de luz"
                  className="w-full p-3 rounded-md bg-slate-800 border border-slate-700 focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          ))}

          <button
            type="button"
            onClick={addDespesa}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-md"
          >
            + Adicionar despesa
          </button>
        </div>

        {/* OBJETIVOS */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-blue-400">Metas de Economia</h2>

          {objetivos.map((o, i) => (
            <div
              key={i}
              className="bg-slate-900/50 p-5 rounded-lg border border-slate-700 space-y-4"
            >
              <div>
                <label className="block text-slate-300 mb-1">Valor da meta (R$)</label>
                <input
                  type="number"
                  value={o.valor}
                  onChange={(e) => updateObjetivo(i, "valor", e.target.value)}
                  placeholder="Ex: 500"
                  className="w-full p-3 rounded-md bg-slate-800 border border-slate-700 focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 mb-1">Descrição</label>
                <input
                  type="text"
                  value={o.descricao}
                  onChange={(e) => updateObjetivo(i, "descricao", e.target.value)}
                  placeholder="Ex: Viagem com a família"
                  className="w-full p-3 rounded-md bg-slate-800 border border-slate-700 focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          ))}

          <button
            type="button"
            onClick={addObjetivo}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-md"
          >
            + Criar objetivo novo
          </button>
        </div>

        {/* SUBMIT */}
        <button
          type="submit"
          className="w-full py-3 bg-blue-600 hover:bg-blue-500 rounded-lg text-lg font-semibold"
        >
          Salvar orçamento
        </button>

      </form>
    </div>
    </>
  );
}
