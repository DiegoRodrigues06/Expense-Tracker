import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../components/styles/numberFix.css";
import Navbar from "../components/Navbar";
import api from "../service/apiConnection";


export default function Expenses() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchExpenses() {
      try {
        // 1. Pegar o usuário do localStorage
        const storedUser = JSON.parse(localStorage.getItem("user"));
        console.log(storedUser);
        
        if (storedUser && storedUser.id) {
          // 2. Chamar a API usando o ID dele
          const res = await api.get(`/api/users/${storedUser.id}`);
          setUserData(res.data);
        }
      } catch (err) {
        console.error("Erro ao carregar despesas", err);
      } finally {
        setLoading(false);
      }
    }

    fetchExpenses();
  }, []);

  if (loading) return <div className="text-white text-center mt-10">Carregando...</div>;

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-slate-950 p-8 text-white">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-blue-400 mb-6">Suas Despesas</h1>
          
          {userData?.expenses?.length > 0 ? (
            <div className="grid gap-4">
              {userData.expenses.map((exp) => (
                <div key={exp.id} className="bg-slate-900 p-4 rounded-xl border border-slate-800 flex justify-between items-center">
                  <div>
                    <p className="font-semibold text-lg">{exp.description}</p>
                    <p className="text-sm text-slate-400">{new Date(exp.date).toLocaleDateString()}</p>
                  </div>
                  <p className="text-xl font-bold text-red-400">R$ {exp.value.toFixed(2)}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-slate-900/50 rounded-2xl border border-dashed border-slate-700">
                <h1 className="text-xl text-slate-400">Você não tem nenhum gasto registrado.</h1>
            </div>
          )}
        </div>
      </div>
    </>
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

  async function handleSubmit(e) {
    e.preventDefault();
    
    // Recupera o usuário logado para pegar o ID
    const storedUser = JSON.parse(localStorage.getItem("user"));
    console.log(storedUser.id);
    if (!storedUser || !storedUser.id) {
        alert("Sessão expirada. Faça login novamente.");
        return;
    }

    try {
        // Criamos uma lista de promessas para enviar todas as despesas
        const promises = despesas.map(d => {
        return api.post("/api/expense", {
            Budget: parseFloat(orcamentoBruto),
            Description: d.descricao,
            Value: parseFloat(d.valor),
            Date: new Date().toISOString(),
            UsersID: storedUser.id, // ID do usuário logado
            CategoryID: 7  
        });
        });

        await Promise.all(promises);
        
        alert("Despesas salvas com sucesso!");
        navigate("/expenses");
    } catch (err) {
        console.error("Erro ao salvar despesas:", err.response?.data || err.message);
        alert("Erro ao salvar. Verifique se todos os campos estão preenchidos.");
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
