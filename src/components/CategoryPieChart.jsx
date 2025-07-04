import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend
} from "recharts";

const cores = [
  "#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#8dd1e1", "#d0ed57", "#a28be9"
];

export function CategoryPieChart({ transactions }) {
  // Filtra apenas transações de saída (gastos)
  const saidas = transactions.filter((t) => t.type === "saida");

  // Agrupa por categoria
  const data = saidas.reduce((acc, transacao) => {
    const existente = acc.find((d) => d.name === transacao.category);
    if (existente) {
      existente.value += transacao.amount;
    } else {
      acc.push({ name: transacao.category, value: transacao.amount });
    }
    return acc;
  }, []);

  return (
    <div className="bg-white p-4 rounded shadow-md mb-6">
      <h2 className="text-lg font-bold mb-4">Gastos por Categoria</h2>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            dataKey="value"
            isAnimationActive={true}
            data={data}
            cx="50%"
            cy="50%"
            outerRadius={100}
            fill="#8884d8"
            label
          >
            {data.map((_, index) => (
              <Cell key={index} fill={cores[index % cores.length]} />
            ))}
          </Pie>
          <Tooltip formatter={(value) => `R$ ${value.toFixed(2)}`} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
