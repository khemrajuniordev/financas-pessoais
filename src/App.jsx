// App.jsx
import { useState, useEffect } from "react";
import { Header } from "./components/header";
import { TransactionForm } from "./components/TransactionForm";
import { TransactionTable } from "./components/TransactionTable";
import { SummaryChart } from "./components/SummaryChart";
import { SummaryCard } from "./components/SummaryCard";
import { CategoryPieChart } from "./components/CategoryPieChart";

export default function App() {
  const [transactions, setTransactions] = useState(() => {
    const stored = localStorage.getItem("transactions");
    try {
      const parsed = stored ? JSON.parse(stored) : [];
      return parsed.map((t) => ({ ...t, amount: parseFloat(t.amount) }));
    } catch {
      return [];
    }
  });

  const [editingIndex, setEditingIndex] = useState(null);
  const [filter, setFilter] = useState("todas");
  const [selectedMonth, setSelectedMonth] = useState("");

  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(transactions));
  }, [transactions]);

  function addTransaction(newTransaction) {
    const formatted = {
      ...newTransaction,
      amount: parseFloat(newTransaction.amount),
    };

    if (editingIndex !== null) {
      const updated = [...transactions];
      updated[editingIndex] = formatted;
      setTransactions(updated);
      setEditingIndex(null);
    } else {
      setTransactions((prev) => [...prev, formatted]);
    }
  }

  function deleteTransaction(index) {
    setTransactions((prev) => prev.filter((_, i) => i !== index));
  }

  function editTransaction(index) {
    setEditingIndex(index);
  }

  function duplicateTransaction(index) {
    const item = transactions[index];
    const duplicated = { ...item };
    setTransactions((prev) => [...prev, duplicated]);
  }

  const filteredTransactions = transactions.filter((t) => {
    const matchesType = filter === "todas" || t.type === filter;
    const matchesMonth =
      !selectedMonth || (t.date && t.date.startsWith(selectedMonth));
    return matchesType && matchesMonth;
  });

  const totalEntrada = filteredTransactions
    .filter((t) => t.type === "entrada")
    .reduce((acc, t) => acc + Number(t.amount), 0);

  const totalSaida = filteredTransactions
    .filter((t) => t.type === "saida")
    .reduce((acc, t) => acc + Number(t.amount), 0);

  const saldo = totalEntrada - totalSaida;

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <main className="max-w-4xl mx-auto px-4 py-6 space-y-6">


<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <SummaryCard
            title="Entradas"
            amount={`R$ ${totalEntrada.toFixed(2)}`}
            color="bg-green-100"
            textColor="text-green-700"
          />
          <SummaryCard
            title="Saídas"
            amount={`R$ ${totalSaida.toFixed(2)}`}
            color="bg-red-100"
            textColor="text-red-700"
          />
          <SummaryCard
            title="Saldo"
            amount={`R$ ${saldo.toFixed(2)}`}
            color="bg-blue-100"
            textColor="text-blue-700"
          />
        </div>


        <TransactionForm
          onAdd={addTransaction}
          initialData={editingIndex !== null ? transactions[editingIndex] : null}
        />

        <TransactionTable
          transactions={filteredTransactions}
          onEdit={editTransaction}
          onDuplicate={duplicateTransaction}
          onDelete={deleteTransaction}
        />        

        {/* Filtros por tipo e mês */}
        <div className="bg-white p-4 rounded shadow-md space-y-4">
          <div className="flex gap-4 items-center">
            <label className="font-medium">Filtrar por tipo:</label>
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="border rounded px-2 py-1"
            >
              <option value="todas">Todas</option>
              <option value="entrada">Entradas</option>
              <option value="saida">Saídas</option>
            </select>
          </div>

          <div className="flex gap-4 items-center">
            <label className="font-medium">Filtrar por mês:</label>
            <input
              type="month"
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="border rounded px-2 py-1"
            />
          </div>
        </div>

        <SummaryChart transactions={filteredTransactions} />

        <CategoryPieChart transactions={filteredTransactions} />

        
      </main>
    </div>
  );
}