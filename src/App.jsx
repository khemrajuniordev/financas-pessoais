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

  // 🔐 Autenticação
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUserId(user.uid);
      }
    });
    return () => unsubscribe();
  }, []);

  // 🔄 Carrega transações do mês ao logar ou trocar mês
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

  // 💾 Salva ao mudar algo
  useEffect(() => {
    if (userId && selectedMonth) {
      salvarTransacoes(userId, transactions);
    }
  }, [transactions, userId, selectedMonth]);

  // ⏳ Carregando...
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600 text-xl">
        Carregando...
      </div>
    );
  }

  // ➕ Nova transação ou edição
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

  // ✏️ | 🗑️
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

  // 📅 Navegar entre meses
  function alterarMes(delta) {
    const [ano, mes] = selectedMonth.split("-").map(Number);
    const novaData = new Date(ano, mes - 1 + delta);
    const novoMes = `${novaData.getFullYear()}-${String(
      novaData.getMonth() + 1
    ).padStart(2, "0")}`;
    setSelectedMonth(novoMes);
  }

  // 🧮 Totais
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

  const nomeMes = new Date(selectedMonth + "-01").toLocaleString("pt-BR", {
    month: "long",
    year: "numeric",
  });

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <main className="max-w-4xl mx-auto px-4 py-6 space-y-6">
        {/* ▶️ Mês atual e controles */}
        <div className="bg-white p-4 rounded shadow text-center space-y-1 flex justify-between items-center">
          <button
            onClick={() => alterarMes(-1)}
            className="text-2xl px-4 hover:text-blue-500"
          >
            &lt;
          </button>
          <div className="flex-1 text-center">
            <p className="text-sm text-gray-600">Mês atual</p>
            <h2 className="text-lg font-bold capitalize">{nomeMes}</h2>
            <p className="text-sm text-gray-500">
              Você possui <strong>{transactions.length}</strong> lançamentos neste mês
            </p>
          </div>
          <button
            onClick={() => alterarMes(1)}
            className="text-2xl px-4 hover:text-blue-500"
          >
            &gt;
          </button>
        </div>

        {/* 💰 Resumo */}
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

        {/* 📝 Formulário */}
        <TransactionForm
          onAdd={addTransaction}
          initialData={editingIndex !== null ? transactions[editingIndex] : null}
        />

        {/* 📋 Tabela */}
        <TransactionTable
          transactions={filteredTransactions}
          onEdit={editTransaction}
          onDuplicate={duplicateTransaction}
          onDelete={deleteTransaction}
        />

        {/* 🔍 Filtros */}
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
        </div>

        {/* 📊 Gráficos */}
        <SummaryChart transactions={filteredTransactions} />
        <CategoryPieChart transactions={filteredTransactions} />
      </main>
    </div>
  );
}
