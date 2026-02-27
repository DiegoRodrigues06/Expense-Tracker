import { useState, useEffect, useMemo } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../service/apiConnection";

import Navbar from "../components/Navbar";
import { ExpenseCards, SummaryCard } from "../components/Cards";

function getBudgetGroupKey(exp) {
  return (
    exp?.budgetId ??
    exp?.budget_id ??
    exp?.budget?.id ??
    exp?.budget?.budgetId ??
    exp?.budget?.budget_id ??
    // fallback: se não existir FK, agrupa pelo valor do budget + mês/ano
    `${exp?.budget ?? "no-budget"}-${new Date(exp?.date ?? Date.now()).getMonth()}-${new Date(
      exp?.date ?? Date.now()
    ).getFullYear()}`
  );
}

function getBudgetAmount(exp) {
  return (
    exp?.budgetAmount ?? // caso exista
    exp?.budget_value ??
    exp?.budget ?? // seu modelo atual parece ter "budget" em expense
    exp?.budget?.amount ??
    0
  );
}

function isGoal(exp) {
  // Ajuste aqui conforme seu backend:
  // se meta for campo "goal" string, ok.
  return Boolean(exp?.goal && String(exp.goal).trim().length > 0);
}

export default function Expenses() {
  const navigate = useNavigate();

  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    let isMounted = true;

    async function fetchData() {
      try {
        setErrorMsg("");

        const raw = localStorage.getItem("user");
        const storedUser = raw ? JSON.parse(raw) : null;

        if (!storedUser?.id) {
          navigate("/login", { replace: true });
          return;
        }

        const res = await api.get(`/api/users/${storedUser.id}`);
        if (isMounted) setUserData(res.data);
      } catch (err) {
        console.error(err);

        const status = err?.response?.status;
        if (status === 401 || status === 403) {
          localStorage.removeItem("user");
          navigate("/login", { replace: true });
          return;
        }

        if (isMounted) setErrorMsg("Não foi possível carregar seus dados agora.");
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    fetchData();
    return () => {
      isMounted = false;
    };
  }, [navigate]);

  // 🔥 1) ordena e agrupa
  const budgetGroups = useMemo(() => {
    const expenses = userData?.expenses ?? [];

    // ordena por data desc (mais recente primeiro)
    const sorted = [...expenses].sort((a, b) => new Date(b.date) - new Date(a.date));

    // agrupa por orçamento (FK)
    const map = new Map();

    for (const exp of sorted) {
      const key = getBudgetGroupKey(exp);

      if (!map.has(key)) {
        map.set(key, {
          key,
          budget: getBudgetAmount(exp),
          expenses: [],
          goals: [],
        });
      }

      const group = map.get(key);

      // garante que o orçamento do grupo fique definido (caso o primeiro venha 0)
      if (!group.budget) {
        group.budget = getBudgetAmount(exp);
      }

      if (isGoal(exp)) group.goals.push(exp);
      else group.expenses.push(exp);
    }

    // transforma em array
    return Array.from(map.values());
  }, [userData]);

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-slate-950 p-8 text-white">
        <div className="max-w-4xl mx-auto">
          {/* Cabeçalho sempre visível */}
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-blue-400">Dashboard Financeiro</h1>

            <Link to="/expenses/budget-form">
              <button className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-lg font-medium transition-all shadow-lg shadow-blue-900/20">
                + Novo Gasto
              </button>
            </Link>
          </div>

          {/* Loading sem tela branca */}
          {loading && (
            <div className="space-y-4">
              <div className="animate-pulse rounded-2xl bg-slate-900/40 h-32" />
              <div className="animate-pulse rounded-2xl bg-slate-900/40 h-20" />
              <div className="animate-pulse rounded-2xl bg-slate-900/40 h-20" />
            </div>
          )}

          {!loading && errorMsg && (
            <div className="text-center py-6 bg-slate-900/30 rounded-2xl border border-slate-800 text-slate-300">
              {errorMsg}
            </div>
          )}

          {!loading && !errorMsg && (
            <>
              {budgetGroups.length === 0 ? (
                <div className="text-center py-12 bg-slate-900/30 rounded-2xl border-2 border-dashed border-slate-800 text-slate-500">
                  Nenhum dado encontrado.
                </div>
              ) : (
                budgetGroups.map((group) => (
                  <div key={group.key} className="mb-10">
                    {/* ✅ 1 Summary por orçamento */}
                    <SummaryCard
                      budget={Number(group.budget) || 0}
                      expenses={group.expenses}
                      // goals aqui precisa bater com o seu SummaryCard atual (ele usa goal.description)
                      goals={group.goals.map((g) => ({ description: g.goal }))}
                      onEdit={() => navigate("/expenses/budget-form")}
                    />

                    <h3 className="text-lg font-semibold text-slate-300 mb-4">
                      Histórico de Movimentações
                    </h3>

                    {group.expenses.length > 0 ? (
                      <div className="grid gap-3">
                        {group.expenses.map((exp) => (
                          <ExpenseCards key={exp.id} expense={exp} />
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8 bg-slate-900/30 rounded-2xl border-2 border-dashed border-slate-800 text-slate-500">
                        Nenhuma despesa neste orçamento.
                      </div>
                    )}

                    {/* ✅ metas abaixo (se quiser mostrar também fora do SummaryCard) */}
                    {/* Se preferir só no SummaryCard, pode remover esse bloco */}
                    {group.goals.length > 0 && (
                      <div className="mt-6 pt-6 border-t border-slate-800">
                        <p className="text-slate-400 text-xs uppercase mb-3">Metas</p>
                        <div className="flex gap-2 flex-wrap">
                          {group.goals.map((g) => (
                            <span
                              key={g.id}
                              className="bg-blue-500/10 text-blue-400 text-xs px-3 py-1 rounded-full border border-blue-500/20"
                            >
                              🎯 {g.goal}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))
              )}
            </>
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
