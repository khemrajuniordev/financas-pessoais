// App.jsx
import { useState, useEffect } from "react";
import { Header } from "./components/header";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebaseConfig";
import { TransactionForm } from "./components/TransactionForm";
import { TransactionTable } from "./components/TransactionTable";
import { SummaryChart } from "./components/SummaryChart";
import { SummaryCard } from "./components/SummaryCard";
import { CategoryPieChart } from "./components/CategoryPieChart";
import { salvarTransacoes, carregarTransacoes } from "./services/firestoreService";

export default function App() {
  const [transactions, setTransactions] = useState([]);
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editingIndex, setEditingIndex] = useState(null);
  const [filter, setFilter] = useState("todas");
  const [selectedMonth, setSelectedMonth] = useState(() => {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid);
      }
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    async function buscar() {
      if (userId && selectedMonth) {
        setLoading(true);
        const dados = await carregarTransacoes(userId, selectedMonth);
        const formatados = dados.map((t) => ({
          ...t,
          amount: parseFloat(t.amount),
        }));
        setTransactions(formatados);
        setLoading(false);
      }
    }
    buscar();
  }, [userId, selectedMonth]);

  useEffect(() => {
    if (userId && selectedMonth) {
      salvarTransacoes(userId, transactions, selectedMonth);
    }
  }, [transactions, userId, selectedMonth]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600 text-xl">
        Carregando...
      </div>
    );
  }

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
    return filter === "todas" || t.type === filter;
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
