// TransactionTable.jsx
import { Pencil, Copy, Trash } from "lucide-react";

export function TransactionTable({ transactions, onEdit, onDuplicate, onDelete }) {
  return (
    <div className="bg-white p-4 rounded shadow-md mt-4">
      <table className="min-w-full text-sm text-left table-auto border border-gray-200">
        <thead className="bg-gray-100 text-xs uppercase text-gray-600">
          <tr>
            <th className="px-4 py-2">Data</th>
            <th className="px-4 py-2">Descrição</th>
            <th className="px-4 py-2 text-right">Valor</th>
            <th className="px-4 py-2">Tipo</th>
            <th className="px-4 py-2">Categoria</th>
            <th className="px-4 py-2">Ações</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((item, index) => {
            const linhaCor =
              item.type === "entrada"
                ? "bg-green-100/50"
                : item.type === "saida"
                ? "bg-red-100/50"
                : "";

            return (
              <tr
                key={index}
                className={`border-t border-gray-200 hover:bg-gray-50 ${linhaCor}`}
              >
                <td className="px-4 py-2">{item.date}</td>
                <td className="px-4 py-2">{item.description}</td>
                <td
                  className={`px-4 py-2 text-right font-medium ${
                    item.type === "entrada" ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {item.type === "entrada" ? "+" : "-"} R$ {Number(item.amount).toFixed(2)}
                </td>
                <td className="px-4 py-2 capitalize">{item.type}</td>
                <td className="px-4 py-2">{item.category}</td>
                <td className="px-4 py-2 flex gap-2">
                  <button
                    onClick={() => onEdit(index)}
                    className="p-1 rounded-full hover:bg-gray-200 transition"
                    title="Editar"
                  >
                    <Pencil size={16} className="text-blue-600" />
                  </button>

                  <button
                    onClick={() => onDuplicate(index)}
                    className="p-1 rounded-full hover:bg-gray-200 transition"
                    title="Duplicar"
                  >
                    <Copy size={16} className="text-yellow-600" />
                  </button>

                  <button
                    onClick={() => onDelete(index)}
                    className="p-1 rounded-full hover:bg-gray-200 transition"
                    title="Excluir"
                  >
                    <Trash size={16} className="text-red-600" />
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
