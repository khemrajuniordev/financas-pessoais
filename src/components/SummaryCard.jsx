export function SummaryCard({ title, amount, color = "bg-white", textColor = "text-gray-800" }) {
  return (
    <div className={`p-4 min-h-[120px] rounded-xl shadow-md ${color} flex flex-col justify-between`}>
      <h2 className={`text-lg font-semibold ${textColor}`}>{title}</h2>
      <p className={`text-2xl font-bold ${textColor}`}>{amount}</p>
    </div>
  );
}
