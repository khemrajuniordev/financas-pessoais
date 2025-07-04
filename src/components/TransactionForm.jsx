// src/components/TransactionForm.jsx
import { useState, useEffect } from "react";

export function TransactionForm({ onAdd, initialData }) {
  const [date, setDate] = useState("");
  const [type, setType] = useState("entrada");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");

  useEffect(() => {
    if (initialData) {
      setDate(initialData.date || "");
      setType(initialData.type || "entrada");
      setCategory(initialData.category || "");
      setDescription(initialData.description || "");
      setAmount(initialData.amount || "");
    }
  }, [initialData]);

  function handleSubmit(e) {
    e.preventDefault();
    if (!date || !type || !category || !description || !amount) return;

    onAdd({ date, type, category, description, amount });
    setDate("");
    setType("entrada");
    setCategory("");
    setDescription("");
    setAmount("");
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow-md space-y-3">
      <div className="flex gap-2">
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="flex-1 border px-2 py-1 rounded"
        />
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="flex-1 border px-2 py-1 rounded bg-gray-100"
        >
          <option value="entrada">Entrada</option>
          <option value="saida">Saída</option>
        </select>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="flex-1 border px-2 py-1 rounded bg-gray-100"
        >
          <option value="">Selecione uma categoria</option>
          <option value="Salário">Salário</option>
          <option value="Aluguel">Aluguel</option>
          <option value="Transporte">Transporte</option>
          <option value="Alimentação">Alimentação</option>
          <option value="Lazer">Lazer</option>
          <option value="Cartão">Cartão</option>
          <option value="Água">Água</option>
          <option value="Energia">Energia</option>
          <option value="Internet">Internet</option>
          <option value="Outros">Outros</option>
        </select>
      </div>

      <input
        type="text"
        placeholder="Descrição"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full border px-2 py-1 rounded"
      />

      <input
        type="number"
        placeholder="Valor"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="w-full border px-2 py-1 rounded"
      />

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Adicionar
      </button>
    </form>
  );
}
