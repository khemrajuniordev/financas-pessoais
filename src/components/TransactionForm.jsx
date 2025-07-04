import { useEffect, useState } from "react";

export function TransactionForm({ onAdd, initialData }) {
  const [formData, setFormData] = useState({
    date: "",
    description: "",
    amount: "",
    type: "entrada",
    category: "",

  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const transaction = {
      ...formData,
      amount: parseFloat(formData.amount),
    };
    onAdd(transaction);
    setFormData({ date: "", description: "", amount: "", type: "entrada" });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mt-6 bg-white p-4 shadow rounded">
      <div className="grid grid-cols-2 gap-4">
        <input
          name="date"
          type="date"
          value={formData.date}
          onChange={handleChange}
          className="border rounded p-2"
          required
        />
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="border rounded p-2 w-full"
          required
        >
          <option value="">Selecione a categoria</option>
          <option value="Salário">Salário</option>
          <option value="Alimentação">Alimentação</option>
          <option value="Transporte">Transporte</option>
          <option value="Lazer">Lazer</option>
          <option value="Saúde">Saúde</option>
          <option value="Educação">Educação</option>
          <option value="Internet">Internet</option>
          <option value="Água">Água</option>
          <option value="Energia">Energia</option>
          <option value="Outros">Outros</option>
        </select>

        
      </div>
      <input
        name="description"
        type="text"
        placeholder="Descrição"
        value={formData.description}
        onChange={handleChange}
        className="border w-full rounded p-2"
        required
      />
      <input
        name="amount"
        type="number"
        step="0.01"
        placeholder="Valor"
        value={formData.amount}
        onChange={handleChange}
        className="border w-full rounded p-2"
        required
      />
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
        {initialData ? "Atualizar" : "Adicionar"}
      </button>
    </form>
  );
}
