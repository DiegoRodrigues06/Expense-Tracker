export function ExpenseCards({ expense }) {
  return (
    <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 flex justify-between items-center hover:border-blue-500/50 transition-colors">
      <div>
        <p className="font-semibold text-lg">{expense.description}</p>
        <p className="text-sm text-slate-400">
          {new Date(expense.date).toLocaleDateString()}
        </p>
      </div>
      <div className="text-right">
        <p className="text-xl font-bold text-red-400">
          R$ {expense.value.toFixed(2)}
        </p>
        {/* Exemplo: se você quiser mostrar a categoria depois */}
        {expense.categoryName && (
           <span className="text-xs bg-slate-800 px-2 py-1 rounded text-slate-300">
             {expense.categoryName}
           </span>
        )}
      </div>
    </div>
  );
}

// components/SummaryCard.jsx
export function SummaryCard({ budget, expenses, goals, onEdit }) {
  const totalSpent = expenses.reduce((acc, curr) => acc + curr.value, 0);
  const remaining = budget - totalSpent;

  return (
    <div className="bg-slate-900 p-6 rounded-2xl border border-blue-500/30 mb-8 relative overflow-hidden">
      {/* Detalhe visual de fundo */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 blur-3xl -mr-16 -mt-16"></div>

      <div className="flex justify-between items-start mb-6">
        <div>
          <h2 className="text-slate-400 text-sm font-medium uppercase tracking-wider">Orçamento Mensal</h2>
          <p className="text-3xl font-bold text-white">R$ {budget.toFixed(2)}</p>
        </div>
        <button 
          onClick={onEdit}
          className="p-2 hover:bg-slate-800 rounded-lg transition-colors text-blue-400"
          title="Editar Orçamento"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/><path d="m15 5 4 4"/></svg>
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-slate-950/50 p-4 rounded-xl border border-slate-800">
          <p className="text-slate-500 text-xs mb-1">Total Gasto</p>
          <p className="text-xl font-semibold text-red-400">R$ {totalSpent.toFixed(2)}</p>
        </div>
        <div className="bg-slate-950/50 p-4 rounded-xl border border-slate-800">
          <p className="text-slate-500 text-xs mb-1">Disponível</p>
          <p className={`text-xl font-semibold ${remaining >= 0 ? 'text-emerald-400' : 'text-orange-500'}`}>
            R$ {remaining.toFixed(2)}
          </p>
        </div>
      </div>

      {goals?.length > 0 && (
        <div className="mt-6 pt-6 border-t border-slate-800">
          <p className="text-slate-400 text-xs uppercase mb-3">Metas Ativas</p>
          <div className="flex gap-2 flex-wrap">
            {goals.map((goal, idx) => (
              <span key={idx} className="bg-blue-500/10 text-blue-400 text-xs px-3 py-1 rounded-full border border-blue-500/20">
                🎯 {goal.description}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}