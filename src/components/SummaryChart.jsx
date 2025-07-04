import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export function SummaryChart({ transactions }) {
  const entrada = transactions
    .filter((t) => t.type === "entrada")
    .reduce((acc, t) => acc + Number(t.amount), 0);

  const saida = transactions
    .filter((t) => t.type === "saida")
    .reduce((acc, t) => acc + Number(t.amount), 0);

  const data = [
    { name: "Entradas", valor: entrada },
    { name: "Saídas", valor: saida },
  ];

  return (
    <div className="bg-white p-4 rounded shadow-md mb-6">
      <h2 className="text-lg font-bold mb-4">Resumo Gráfico</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip formatter={(value) => `R$ ${value.toFixed(2)}`} />
          <Bar dataKey="valor" fill="#3b82f6" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
